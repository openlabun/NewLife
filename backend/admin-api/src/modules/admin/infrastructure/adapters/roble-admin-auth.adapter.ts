import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RobleHttpService } from '../services/roble-http.service';
import {
  IAdminAuthPort,
  RobleLoginResult,
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
  constructor(private readonly roble: RobleHttpService) {}

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
      const res = await this.roble.authGet<RobleVerifyResponse>(
        '/verify-token',
        accessToken,
      );
      return {
        id: res.id,
        email: res.email,
        name: res.name,
      };
    } catch {
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
    await this.roble.authPost<void>('/logout', null, accessToken);
  }
}