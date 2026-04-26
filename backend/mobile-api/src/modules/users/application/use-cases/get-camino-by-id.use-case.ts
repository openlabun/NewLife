import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProgressProviderPort } from '../../../progress/domain/ports/progress-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { DatabaseService } from '../../../database/infrastructure/database.service';

@Injectable()
export class GetCaminoByIdUseCase {
  constructor(
    @Inject('IProgressProviderPort')
    private readonly progressProvider: IProgressProviderPort,
    private readonly systemAuth: SystemAuthService,
    private readonly dbService: DatabaseService,
  ) {}

  async execute(robleId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 🔹 1. Resolver UUID desde _id
    const userRes = await this.dbService.find(
      'usuarios',
      { _id: robleId },
      masterToken
    );

    const userRows = Array.isArray(userRes) ? userRes : (userRes?.rows ?? []);
    const user = userRows[0];

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const usuarioUuid = user.usuario_id;

    // 🔹 2. Usar el provider con UUID (igual que el use case original)
    const camino = await this.progressProvider.getCamino(
      usuarioUuid,
      masterToken
    );

    if (!camino || camino.nivel === null) {
      return { nivel: null, subnivel: null };
    }

    return {
      nivel: camino.nivel,
      subnivel: camino.subnivel,
    };
  }
}