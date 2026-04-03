import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class DeleteAccountUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(userId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // Buscar el registro en tabla usuarios por usuario_id
    const res = await this.dbService.find('usuarios', { usuario_id: userId }, masterToken);
    const rows = Array.isArray(res) ? res : (res.rows || []);

    if (rows.length === 0) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const user = rows[0];

    // Cambiar estado a ELIMINADO
    await this.dbService.update(
      'usuarios',
      '_id',
      user._id,
      { estado: 'ELIMINADO' },
      masterToken,
    );

    // Remover de todas las comunidades
    const memberships = await this.dbService.find(
      'comunidad_usuarios',
      { usuario_id: user._id },
      masterToken,
    );
    const memberRows = Array.isArray(memberships) ? memberships : (memberships.rows || []);

    await Promise.all(
      memberRows.map((m: any) =>
        this.dbService.delete('comunidad_usuarios', '_id', m._id, masterToken)
      )
    );

    return { message: 'Cuenta eliminada exitosamente.' };
  }
}