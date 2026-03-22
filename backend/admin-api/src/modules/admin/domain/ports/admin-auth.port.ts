export interface RobleLoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface RobleUserInfo {
  id: string;
  email: string;
  name: string;
}

export const ADMIN_AUTH_PORT = 'ADMIN_AUTH_PORT';

export interface RobleSignupResult {
  id: string;
  email: string;
}

export interface IAdminAuthPort {
  loginWithRoble(email: string, password: string): Promise<RobleLoginResult>;
  verifyRobleToken(accessToken: string): Promise<RobleUserInfo>;
  refreshRobleToken(refreshToken: string): Promise<{ accessToken: string }>;
  logoutFromRoble(accessToken: string): Promise<void>;
  signupDirect(email: string, password: string, nombre: string): Promise<RobleSignupResult>; // ← nuevo
}

export interface IAdminAuthPort {
  loginWithRoble(email: string, password: string): Promise<RobleLoginResult>;
  verifyRobleToken(accessToken: string): Promise<RobleUserInfo>;
  refreshRobleToken(refreshToken: string): Promise<{ accessToken: string }>;
  logoutFromRoble(accessToken: string): Promise<void>;
}