import { Inject, Injectable } from '@nestjs/common';
import { IAuthProviderPort } from '../../domain/ports/auth-provider.port';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../infrastructure/services/system-auth.service';
import { RegisterDto } from '../../presentation/dtos/register.dto';

@Injectable()
export class RegisterStaffUseCase {
  constructor(
    @Inject('IAuthProviderPort')
    private readonly authProvider: IAuthProviderPort,
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(dto: RegisterDto, role: string) {
    const now = new Date().toISOString();
    
    await this.authProvider.register({
      email: dto.email,
      password: dto.password,
      name: dto.nombre 
    });

    const authUser = await this.authProvider.login(dto.email, dto.password);

    const masterToken = await this.systemAuth.getMasterToken();

    const newRecord = {
      usuario_id: authUser.uid,
      email: dto.email,
      rol: role,
      nombre: dto.nombre,
      created_at: now,
      last_login: now
    };

    await this.dbService.insert('usuarios', [newRecord], masterToken);

    return { message: `Cuenta de ${role} creada exitosamente para ${dto.nombre}.` };
  }
}