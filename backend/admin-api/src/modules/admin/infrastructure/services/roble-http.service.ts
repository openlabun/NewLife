import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosError } from 'axios';

@Injectable()
export class RobleHttpService implements OnModuleInit {
  private readonly logger = new Logger(RobleHttpService.name);

  private readonly baseUrl: string;
  private readonly projectToken: string;
  private readonly dbName: string;
  private readonly systemEmail: string;
  private readonly systemPassword: string;

  private authClient: AxiosInstance;
  private dbClient: AxiosInstance;

  // Token del usuario de sistema — se obtiene al iniciar el módulo
  // y se renueva automáticamente cuando expira
  private systemToken: string | null = null;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.get<string>('ROBLE_BASE_URL') ?? '';
    this.projectToken = this.config.get<string>('ROBLE_PROJECT_TOKEN') ?? '';
    this.dbName = this.config.get<string>('ROBLE_DB_NAME') ?? '';
    this.systemEmail = this.config.get<string>('ROBLE_SYSTEM_EMAIL') ?? '';
    this.systemPassword = this.config.get<string>('ROBLE_SYSTEM_PASSWORD') ?? '';

    this.authClient = axios.create({
      baseURL: `${this.baseUrl}/auth/${this.projectToken}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    this.dbClient = axios.create({
      baseURL: `${this.baseUrl}/database/${this.projectToken}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });
  }

  // Al arrancar el módulo, el sistema se loguea con sus propias credenciales
  async onModuleInit(): Promise<void> {
    await this.loginAsSystem();
  }

  private async loginAsSystem(): Promise<void> {
    try {
      const res = await this.authClient.post<{ accessToken: string }>('/login', {
        email: this.systemEmail,
        password: this.systemPassword,
      });
      this.systemToken = res.data.accessToken;
      this.logger.log('Sistema autenticado en Roble correctamente');
    } catch (err) {
      this.logger.error('Error al autenticar sistema en Roble', err);
      throw new InternalServerErrorException('No se pudo conectar con Roble');
    }
  }

  // Si una llamada falla por token expirado, renueva y reintenta una vez
  private async ensureSystemToken(): Promise<string> {
    if (!this.systemToken) {
      await this.loginAsSystem();
    }
    return this.systemToken!;
  }

  // ── Auth endpoints ────────────────────────────────────────────────────────

  async authPost<T>(path: string, body: unknown, token?: string): Promise<T> {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await this.authClient.post<T>(path, body, { headers });
      return res.data;
    } catch (err) {
      // Si el token del sistema expiró, renovamos y reintentamos
      if (this.isUnauthorized(err) && !token) {
        await this.loginAsSystem();
        const res = await this.authClient.post<T>(path, body, {
          headers: { Authorization: `Bearer ${this.systemToken}` },
        });
        return res.data;
      }
      this.handleError(err, `AUTH POST ${path}`);
    }
  }

  async authGet<T>(path: string, token: string): Promise<T> {
    try {
      const res = await this.authClient.get<T>(path, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      this.handleError(err, `AUTH GET ${path}`);
    }
  }

  // ── Database endpoints ────────────────────────────────────────────────────

  async dbInsert<T>(tableName: string, records: unknown[]): Promise<T> {
    const token = await this.ensureSystemToken();
    try {
      const res = await this.dbClient.post<T>(
        '/insert',
        { tableName, records },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    } catch (err) {
      if (this.isUnauthorized(err)) {
        await this.loginAsSystem();
        const res = await this.dbClient.post<T>(
          '/insert',
          { tableName, records },
          { headers: { Authorization: `Bearer ${this.systemToken}` } },
        );
        return res.data;
      }
      this.handleError(err, `DB INSERT ${tableName}`);
    }
  }

  async dbRead<T>(tableName: string, filters: Record<string, unknown> = {}): Promise<T> {
    const token = await this.ensureSystemToken();
    try {
      const res = await this.dbClient.get<T>('/read', {
        headers: { Authorization: `Bearer ${token}` },
        params: { tableName, ...filters },
      });
      return res.data;
    } catch (err) {
      if (this.isUnauthorized(err)) {
        await this.loginAsSystem();
        const res = await this.dbClient.get<T>('/read', {
          headers: { Authorization: `Bearer ${this.systemToken}` },
          params: { tableName, ...filters },
        });
        return res.data;
      }
      this.handleError(err, `DB READ ${tableName}`);
    }
  }

  async dbUpdate<T>(
    tableName: string,
    idColumn: string,
    idValue: string,
    updates: Record<string, unknown>,
  ): Promise<T> {
    const token = await this.ensureSystemToken();
    try {
      const res = await this.dbClient.put<T>(
        '/update',
        { tableName, idColumn, idValue, updates },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data;
    } catch (err) {
      if (this.isUnauthorized(err)) {
        await this.loginAsSystem();
        const res = await this.dbClient.put<T>(
          '/update',
          { tableName, idColumn, idValue, updates },
          { headers: { Authorization: `Bearer ${this.systemToken}` } },
        );
        return res.data;
      }
      this.handleError(err, `DB UPDATE ${tableName}`);
    }
  }

  async dbDelete<T>(tableName: string, idColumn: string, idValue: string): Promise<T> {
    const token = await this.ensureSystemToken();
    try {
      const res = await this.dbClient.delete<T>('/delete', {
        headers: { Authorization: `Bearer ${token}` },
        data: { tableName, idColumn, idValue },
      });
      return res.data;
    } catch (err) {
      if (this.isUnauthorized(err)) {
        await this.loginAsSystem();
        const res = await this.dbClient.delete<T>('/delete', {
          headers: { Authorization: `Bearer ${this.systemToken}` },
          data: { tableName, idColumn, idValue },
        });
        return res.data;
      }
      this.handleError(err, `DB DELETE ${tableName}`);
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private isUnauthorized(err: unknown): boolean {
    return err instanceof AxiosError && err.response?.status === 401;
  }

  private handleError(err: unknown, context: string): never {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message;
      this.logger.error(`[${context}] ${status} - ${message}`);
      throw new InternalServerErrorException(`Error en ${context}: ${message}`);
    }
    this.logger.error(`[${context}] Error inesperado`, err);
    throw new InternalServerErrorException(`Error inesperado en ${context}`);
  }
}