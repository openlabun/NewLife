import { Inject, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { IAuthProviderPort } from '../../domain/ports/auth-provider.port';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../infrastructure/services/system-auth.service';
import { LoginDto } from '../../presentation/dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthProviderPort')
    private readonly authProvider: IAuthProviderPort,
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(dto: LoginDto, allowedRoles?: string[]) {
    const now = new Date().toISOString();
    let masterToken = await this.systemAuth.getMasterToken();

    let searchResponse;
    try {
      searchResponse = await this.dbService.find('usuarios', { email: dto.email }, masterToken);
    } catch (error: any) {
      if (error.response?.status === 401) {
        masterToken = await this.systemAuth.refreshMasterToken();
        searchResponse = await this.dbService.find('usuarios', { email: dto.email }, masterToken);
      } else {
        throw error;
      }
    }

    const userInDb = Array.isArray(searchResponse) ? searchResponse[0] : (searchResponse.rows?.[0]);

    if (allowedRoles && userInDb) {
      if (!allowedRoles.includes(userInDb.rol)) {
        throw new ForbiddenException(`Acceso denegado: Tu rol de ${userInDb.rol} no tiene permiso aquí.`);
      }
    }

    const authUser = await this.authProvider.login(dto.email, dto.password);

    let finalUserData;

    if (!userInDb) {
      const newRecord = {
        usuario_id: authUser.uid,
        email: authUser.email,
        created_at: now,
        last_login: now,
        rol: 'paciente',
        nombre: authUser.email.split('@')[0]
      };
      
      await this.dbService.insert('usuarios', [newRecord], masterToken);
      finalUserData = newRecord;
    } else {
      const updates: any = { last_login: now };
      if (!userInDb.usuario_id) updates.usuario_id = authUser.uid;

      await this.dbService.update(
        'usuarios',
        'email', 
        userInDb.email,
        updates,
        masterToken
      );
      finalUserData = { ...userInDb, ...updates };
    }

    return {
      accessToken: authUser.accessToken,
      refreshToken: authUser.refreshToken,
      user: {
        uid: authUser.uid,
        email: authUser.email,
        nombre: finalUserData.nombre,
        role: finalUserData.rol,
        last_login: finalUserData.last_login
      }
    };
  }
}