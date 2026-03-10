import { Injectable, Inject, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { IAuthProviderPort } from '../../domain/ports/auth-provider.port';

@Injectable()
export class SystemAuthService implements OnModuleInit {
  private masterToken: string | null = null;

  constructor(
    @Inject('IAuthProviderPort')
    private readonly authProvider: IAuthProviderPort,
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
      const auth = await this.authProvider.login(
        process.env.ROBLE_SYSTEM_EMAIL,
        process.env.ROBLE_SYSTEM_PASSWORD
      );
      this.masterToken = auth.accessToken;
      return this.masterToken;
    } catch (error) {
      throw new UnauthorizedException('Error autenticando la cuenta maestra del sistema');
    }
  }

  async getMasterToken(): Promise<string> {
    if (!this.masterToken) {
      return await this.refreshMasterToken();
    }
    return this.masterToken;
  }
}