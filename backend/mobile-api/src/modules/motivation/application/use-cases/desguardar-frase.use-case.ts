import {
  Injectable,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { IFRASE_GUARDADA_PROVIDER_PORT } from '../../domain/ports/frase-dia.port';
import type { IFraseGuardadaProviderPort } from '../../domain/ports/frase-dia.port';

@Injectable()
export class DesguardarFraseUseCase {
  constructor(
    @Inject(IFRASE_GUARDADA_PROVIDER_PORT)
    private readonly fraseGuardadaProvider: IFraseGuardadaProviderPort,
  ) {}

  async execute(usuarioId: string, fraseId: string): Promise<void> {
    // Verificar si la frase está guardada
    const isGuardada = await this.fraseGuardadaProvider.isFraseGuardada(
      usuarioId,
      fraseId,
    );

    if (!isGuardada) {
      throw new NotFoundException('La frase no está guardada por el usuario');
    }

    await this.fraseGuardadaProvider.desguardarFrase(usuarioId, fraseId);
  }
}