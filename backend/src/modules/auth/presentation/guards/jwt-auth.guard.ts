import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { IAuthProviderPort } from '../../domain/ports/auth-provider.port';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../infrastructure/services/system-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('IAuthProviderPort')
    private readonly authProvider: IAuthProviderPort,
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('No se proporcionó un token');

    const token = authHeader.split(' ')[1];
    
    const robleResponse = await this.authProvider.verifyToken(token);
    
    const robleUser = robleResponse?.user;

    if (!robleResponse?.valid || !robleUser?.email) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    const masterToken = await this.systemAuth.getMasterToken();

    const searchResponse = await this.dbService.find(
      'usuarios', 
      { email: robleUser.email }, 
      masterToken
    );

    const rows = Array.isArray(searchResponse) ? searchResponse : (searchResponse.rows || []);

    const userInDb = rows.find((u: any) => u.email.toLowerCase() === robleUser.email.toLowerCase());

    if (!userInDb) {
      throw new UnauthorizedException(`El usuario ${robleUser.email} no existe en la base de datos local`);
    }

    request.user = {
      uid: userInDb.usuario_id,
      email: userInDb.email,
      role: userInDb.rol 
    };

    return true;
  }
}