import {
  Injectable,
  Inject,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { FraseGuardada } from '../../domain/entities/frase-dia.entity';
import {
  IFRASE_GUARDADA_PROVIDER_PORT,
  IFRASE_DIA_PROVIDER_PORT,
} from '../../domain/ports/frase-dia.port';
import type {
  IFraseGuardadaProviderPort,
  IFraseDiaProviderPort,
} from '../../domain/ports/frase-dia.port';

@Injectable()
export class GuardarFraseUseCase {
  constructor(
    @Inject(IFRASE_GUARDADA_PROVIDER_PORT)
    private readonly fraseGuardadaProvider: IFraseGuardadaProviderPort,
    @Inject(IFRASE_DIA_PROVIDER_PORT)
    private readonly fraseDiaProvider: IFraseDiaProviderPort,
  ) {}

  async execute(usuarioId: string, fraseId: string): Promise<FraseGuardada> {
    // Verificar si ya está guardada
    const alreadyGuarded = await this.fraseGuardadaProvider.isFraseGuardada(
      usuarioId,
      fraseId,
    );

    if (alreadyGuarded) {
      throw new ConflictException('Esta frase ya está guardada por el usuario');
    }

    // Obtener la frase para validar que existe
    const frase = await this.fraseDiaProvider.getFraseById(fraseId);
    if (!frase) {
      throw new ForbiddenException('La frase especificada no existe');
    }

    return this.fraseGuardadaProvider.guardarFrase(usuarioId, fraseId);
  }
}