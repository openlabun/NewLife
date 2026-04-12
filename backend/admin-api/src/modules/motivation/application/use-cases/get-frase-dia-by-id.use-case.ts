import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FraseDia } from '../../domain/entities/frase-dia.entity';
import { FRASE_DIA_REPOSITORY } from '../../domain/ports/frase-dia.repository.port';
import type { IFraseDiaRepository } from '../../domain/ports/frase-dia.repository.port';

@Injectable()
export class GetFraseDiaByIdUseCase {
  constructor(
    @Inject(FRASE_DIA_REPOSITORY)
    private readonly fraseDiaRepo: IFraseDiaRepository,
  ) {}

  async execute(id: string): Promise<FraseDia> {
    const frase = await this.fraseDiaRepo.findById(id);
    if (!frase) {
      throw new NotFoundException(`Frase del día con ID ${id} no encontrada`);
    }
    return frase;
  }
}