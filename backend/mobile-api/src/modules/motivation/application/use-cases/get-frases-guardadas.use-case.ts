import { Injectable, Inject } from '@nestjs/common';
import { FraseGuardada } from '../../domain/entities/frase-dia.entity';
import { IFRASE_GUARDADA_PROVIDER_PORT } from '../../domain/ports/frase-dia.port';
import type { IFraseGuardadaProviderPort } from '../../domain/ports/frase-dia.port';

@Injectable()
export class GetFrasesGuardadasUseCase {
  constructor(
    @Inject(IFRASE_GUARDADA_PROVIDER_PORT)
    private readonly fraseGuardadaProvider: IFraseGuardadaProviderPort,
  ) {}

  async execute(usuarioId: string): Promise<FraseGuardada[]> {
    return this.fraseGuardadaProvider.getFrasesGuardadas(usuarioId);
  }
}