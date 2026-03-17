import { Injectable, Inject, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthProviderPort } from '../../domain/ports/auth-provider.port';

@Injectable()
export class SystemAuthService implements OnModuleInit {
  private masterToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(
    @Inject('IAuthProviderPort')
    private readonly authProvider: IAuthProviderPort,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    try {
      await this.refreshMasterToken();
    } catch (error) {
      console.error('No se pudo obtener el Master Token inicial. Revisa el .env');
    }
  }

  async refreshMasterToken(): Promise<string> {
    try {
      const email = this.configService.get<string>('ROBLE_SYSTEM_EMAIL');
      const password = this.configService.get<string>('ROBLE_SYSTEM_PASSWORD');
      if (!email || !password) {
        throw new Error('Credenciales del sistema no encontradas en el entorno');
      }
      const auth = await this.authProvider.login(email, password);
      this.masterToken = auth.accessToken;
      this.tokenExpiresAt = Date.now() + (14 * 60 * 1000);
      return this.masterToken;
    } catch (error) {
      throw new UnauthorizedException('Error autenticando la cuenta maestra del sistema');
    }
  }

  async getMasterToken(): Promise<string> {
    if (!this.masterToken || Date.now() >= this.tokenExpiresAt) {
      return await this.refreshMasterToken();
    }
    return this.masterToken;
  }
}