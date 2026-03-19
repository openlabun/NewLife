import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class MigrateGuestUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(userId: string, guestData: any) {
    const masterToken = await this.systemAuth.getMasterToken();
    const generateId = () => Math.random().toString(36).substring(2, 14).padEnd(12, '0');
    const now = new Date().toISOString();

    const { profile, contacts } = guestData;

    // Verificar si ya tiene perfil
    const existing = await this.dbService.find(
      'informacion_personal',
      { usuario_id: userId },
      masterToken
    );
    const rows = Array.isArray(existing) ? existing : (existing.rows || []);
    if (rows.length > 0) {
      throw new ConflictException('Este usuario ya tiene perfil completado.');
    }

    // informacion_personal
    const infoPersonalRecord = {
      _id: generateId(),
      usuario_id: userId,
      apodo: profile.apodo || '',
      pronombre: profile.pronombre || '',
      motivo_sobrio: profile.motivo_sobrio || '',
      gasto_semanal: Number(profile.gasto_semana) || 0,
      created_at: now,
    };

    // config_usuarios
    const configRecord = {
      _id: generateId(),
      usuario_id: userId,
      reg_lugar_riesgo: Boolean(profile.reg_lugar_riesgo),
      comp_logros_comunid: Boolean(profile.comp_logros_comunid),
      moment_motiv: profile.moment_motiv || '08:00:00',
    };

    // sobriedad
    const sobriedadRecord = {
      _id: generateId(),
      usuario_id: userId,
      fecha_ultimo_consumo: profile.ult_fecha_consumo || now,
      updated_at: now,
    };

    await Promise.all([
      this.dbService.insert('informacion_personal', [infoPersonalRecord], masterToken),
      this.dbService.insert('config_usuarios', [configRecord], masterToken),
      this.dbService.insert('sobriedad', [sobriedadRecord], masterToken),
    ]);

    // contactos
    if (contacts && contacts.length > 0) {
      const contactRecords = contacts.map((c: any) => ({
        _id: generateId(),
        contacto_id: randomUUID(),
        usuario_id: userId,
        nombre: c.nombre,
        telefono: c.telefono.toString().trim(),
        foto_url: '',
        created_at: now,
        updated_at: now,
      }));
      await this.dbService.insert('contactos', contactRecords, masterToken);
    }

    return {
      message: 'Migración de invitado exitosa',
      registros: {
        perfil: true,
        contactos: contacts?.length || 0,
      },
    };
  }
}