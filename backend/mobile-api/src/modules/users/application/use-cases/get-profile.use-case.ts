import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetProfileUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(userId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // Primero resolvemos usuario e info personal en paralelo
    const [userRes, infoRes] = await Promise.all([
      this.dbService.find('usuarios', { usuario_id: userId }, masterToken),
      this.dbService.find('informacion_personal', { usuario_id: userId }, masterToken),
    ]);

    const userRows = Array.isArray(userRes) ? userRes : (userRes?.rows ?? []);
    const user = userRows[0] || null;

    const infoRows = Array.isArray(infoRes) ? infoRes : (infoRes?.rows ?? []);
    const info = infoRows[0] || null;

    // comunidad_usuarios almacena el _id de Roble, no el UUID de auth
    let total_comunidades = 0;
    if (user?._id) {
      const membershipsRes = await this.dbService.find(
        'comunidad_usuarios',
        { usuario_id: user._id },
        masterToken,
      );
      const membershipsRaw = Array.isArray(membershipsRes)
        ? membershipsRes
        : (membershipsRes?.rows ?? []);
      total_comunidades = membershipsRaw.filter((m: any) => m && !m.eliminado).length;
    }

    return {
      nombre: user?.nombre || '',
      apodo: info?.apodo || '',
      pronombre: info?.pronombre || '',
      motivo_sobrio: info?.motivo_sobrio || '',
      gasto_semanal: info?.gasto_semanal || 0,
      descripcion: user?.descripcion || '',
      total_comunidades,
    };
  }
}