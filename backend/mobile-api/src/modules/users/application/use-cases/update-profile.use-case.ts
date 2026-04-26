import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

export interface UpdateProfileDto {
  apodo?: string;
  pronombre?: string;
  motivo_sobrio?: string;
  gasto_semanal?: number;
  descripcion?: string;
}

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(userId: string, updates: UpdateProfileDto) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 1. Verificar perfil (informacion_personal)
    const res = await this.dbService.find(
      'informacion_personal',
      { usuario_id: userId },
      masterToken
    );
    const rows = Array.isArray(res) ? res : (res.rows || []);

    if (rows.length === 0) {
      throw new NotFoundException('Perfil no encontrado. Completa el onboarding primero.');
    }

    const record = rows[0];

    // 2. Campos para informacion_personal
    const personalFieldsToUpdate: Record<string, any> = {};

    if (updates.apodo !== undefined)         personalFieldsToUpdate.apodo = updates.apodo;
    if (updates.pronombre !== undefined)     personalFieldsToUpdate.pronombre = updates.pronombre;
    if (updates.motivo_sobrio !== undefined) personalFieldsToUpdate.motivo_sobrio = updates.motivo_sobrio;
    if (updates.gasto_semanal !== undefined) personalFieldsToUpdate.gasto_semanal = Number(updates.gasto_semanal);

    // 3. Campos para usuarios
    const userFieldsToUpdate: Record<string, any> = {};

    if (updates.descripcion !== undefined) {
      userFieldsToUpdate.descripcion = updates.descripcion;
    }

    // 4. Validación: que haya algo que actualizar
    if (
      Object.keys(personalFieldsToUpdate).length === 0 &&
      Object.keys(userFieldsToUpdate).length === 0
    ) {
      return { message: 'No hay campos para actualizar.' };
    }

    // 5. Actualizar informacion_personal (si aplica)
    if (Object.keys(personalFieldsToUpdate).length > 0) {
      await this.dbService.update(
        'informacion_personal',
        '_id',
        record._id,
        personalFieldsToUpdate,
        masterToken,
      );
    }

    // 6. Actualizar usuarios (si aplica)
    if (Object.keys(userFieldsToUpdate).length > 0) {
      await this.dbService.update(
        'usuarios',
        'usuario_id', 
        userId,
        userFieldsToUpdate,
        masterToken,
      );
    }

    return { message: 'Perfil actualizado exitosamente.' };
  }
}