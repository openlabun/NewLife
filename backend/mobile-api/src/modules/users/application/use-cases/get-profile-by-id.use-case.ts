import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetProfileByIdUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(robleId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    const user = await this.dbService.findById('usuarios', robleId, masterToken);
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    const [infoRes, membershipsRes] = await Promise.all([
      this.dbService.find('informacion_personal', { usuario_id: user.usuario_id }, masterToken),
      this.dbService.find('comunidad_usuarios', { usuario_id: robleId }, masterToken),
    ]);

    const infoRows = Array.isArray(infoRes) ? infoRes : (infoRes?.rows ?? []);
    const info = infoRows[0] || null;

    const membershipsRaw = Array.isArray(membershipsRes)
      ? membershipsRes
      : (membershipsRes?.rows ?? []);
    const total_comunidades = membershipsRaw.filter((m: any) => m && !m.eliminado).length;

    return {
      nombre: user.nombre || '',
      apodo: info?.apodo || '',
      descripcion: user.descripcion || '',
      motivo_sobrio: info?.motivo_sobrio || '',
      total_comunidades,
    };
  }
}
