import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RobleHttpService } from '../services/roble-http.service';
import {
  IAdminAuthPort,
  RobleLoginResult,
  RobleSignupResult,
  RobleUserInfo,
} from '../../domain/ports/admin-auth.port';

interface RobleLoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RobleVerifyResponse {
  id: string;
  email: string;
  name: string;
}

interface RobleRefreshResponse {
  accessToken: string;
}

@Injectable()
export class RobleAdminAuthAdapter implements IAdminAuthPort {
  constructor(private readonly roble: RobleHttpService) { }

  async loginWithRoble(email: string, password: string): Promise<RobleLoginResult> {
    try {
      const res = await this.roble.authPost<RobleLoginResponse>('/login', {
        email,
        password,
      });
      return {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      };
    } catch {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async verifyRobleToken(accessToken: string): Promise<RobleUserInfo> {
    try {
      const res = await this.roble.authGet<any>('/verify-token', accessToken);

      return {
        id: res.user?.sub ?? '',
        email: res.user?.email ?? '',
        name: res.user?.name ?? res.user?.nombre ?? '',
      };
    } catch (err) {
      throw new UnauthorizedException('Token de Roble inválido o expirado');
    }
  }

  async refreshRobleToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const res = await this.roble.authPost<RobleRefreshResponse>('/refresh-token', {
        refreshToken,
      });
      return { accessToken: res.accessToken };
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async logoutFromRoble(accessToken: string): Promise<void> {
    await this.roble.authPost<void>('/logout', {}, accessToken);
  }

  async signupDirect(
    email: string,
    password: string,
    nombre: string,
  ): Promise<RobleSignupResult> {
    try {
      // 1. Crear la cuenta en Roble
      await this.roble.authPost<any>(
        '/signup-direct',
        { email, password, name: nombre },
      );

      // 2. Hacer login para obtener el token
      const loginRes = await this.roble.authPost<{ accessToken: string }>(
        '/login',
        { email, password },
      );

      // 3. Verificar el token para obtener el ID
      const verifyRes = await this.roble.authGet<any>(
        '/verify-token',
        loginRes.accessToken,
      );

      console.log('=== verify después de signup ===', JSON.stringify(verifyRes));

      return {
        id: verifyRes.user?.sub ?? '',
        email: verifyRes.user?.email ?? email,
      };
    } catch (err) {
      throw new ConflictException(
        'No se pudo crear la cuenta en Roble. El correo puede estar en uso.',
      );
    }
  }
}