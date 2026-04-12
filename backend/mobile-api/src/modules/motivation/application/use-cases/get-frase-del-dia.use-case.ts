import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FraseDia } from '../../domain/entities/frase-dia.entity';
import { 
  IFRASE_DIA_PROVIDER_PORT, 
  IFRASE_GUARDADA_PROVIDER_PORT 
} from '../../domain/ports/frase-dia.port';
import type { 
  IFraseDiaProviderPort, 
  IFraseGuardadaProviderPort 
} from '../../domain/ports/frase-dia.port';

@Injectable()
export class GetFraseDelDiaUseCase {
  constructor(
    @Inject(IFRASE_DIA_PROVIDER_PORT)
    private readonly fraseDiaProvider: IFraseDiaProviderPort,
    @Inject(IFRASE_GUARDADA_PROVIDER_PORT)
    private readonly fraseGuardadaProvider: IFraseGuardadaProviderPort,
  ) {}

  async execute(usuarioId: string, fecha?: string): Promise<{ frase: FraseDia; isGuardada: boolean }> {
    const targetDate = fecha ?? new Date().toISOString().split('T')[0];
    const frase = await this.fraseDiaProvider.getFraseDelDia(targetDate);

    if (!frase) {
      throw new NotFoundException('No hay una frase del día registrada para esta fecha');
    }

    // Verificamos si el usuario actual ya la guardó
    const isGuardada = await this.fraseGuardadaProvider.isFraseGuardada(usuarioId, frase.frase_id);

    return { frase, isGuardada };
  }
}