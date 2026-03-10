import { Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../infrastructure/services/system-auth.service';
import { InitialRegisterDto } from '../../presentation/dtos/initial-register.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CompleteProfileUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(userId: string, dto: InitialRegisterDto) {
    const masterToken = await this.systemAuth.getMasterToken();

    const existing = await this.dbService.find('informacion_personal', { usuario_id: userId }, masterToken);
    const rows = Array.isArray(existing) ? existing : (existing.rows || []);
    if (rows.length > 0) {
      throw new ConflictException('El perfil de este usuario ya ha sido completado.');
    }

    const generateId = () => Math.random().toString(36).substring(2, 14).padEnd(12, '0');
    const now = new Date().toISOString();

    const infoPersonalRecord = {
      _id: generateId(),
      usuario_id: userId,
      apodo: dto.apodo,
      pronombre: dto.pronombre,
      motivo_sobrio: dto.motivo_sobrio,
      gasto_semanal: Number(dto.gasto_semana),
      created_at: now
    };

    const contactoRecord = {
      _id: generateId(),
      usuario_id: userId,
      contacto_id: randomUUID(),
      nombre: dto.apodo,
      telefono: dto.telefono.toString(),
      created_at: now,
      updated_at: now
    };

    const userUpdate = {
      nombre: dto.apodo
    };

    const configRecord = {
      _id: generateId(),
      usuario_id: userId,
      reg_lugar_riesgo: Boolean(dto.reg_lugar_riesgo),
      comp_logros_comunid: Boolean(dto.comp_logros_comunid),
      moment_motiv: dto.moment_motiv
    };

    const sobriedadRecord = {
      _id: generateId(),
      usuario_id: userId,
      fecha_ultimo_consumo: dto.ult_fecha_consumo,
      updated_at: now
    };

    const [resInfo, resCont, resConf, resSobr, resUser] = await Promise.all([
      this.dbService.insert('informacion_personal', [infoPersonalRecord], masterToken),
      this.dbService.insert('contactos', [contactoRecord], masterToken),
      this.dbService.insert('config_usuarios', [configRecord], masterToken),
      this.dbService.insert('sobriedad', [sobriedadRecord], masterToken),
      this.dbService.update('usuarios', 'usuario_id', userId, userUpdate, masterToken)
    ]);
    
    return {
      message: 'Onboarding realizado con éxito',
      results: {
        informacion_personal: resInfo,
        contactos: resCont,
        configuracion: resConf,
        sobriedad: resSobr,
        usuario_nombre_actualizado: resUser
      }
    };
  }

  async checkStatus(userId: string) {
    const masterToken = await this.systemAuth.getMasterToken();
    const res = await this.dbService.find('informacion_personal', { usuario_id: userId }, masterToken);
    const rows = Array.isArray(res) ? res : (res.rows || []);
    return { completed: rows.length > 0 };
  }
}