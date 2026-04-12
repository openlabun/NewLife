import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { FraseDia } from '../../domain/entities/frase-dia.entity';
import { FRASE_DIA_REPOSITORY, UpdateFraseDiaInput } from '../../domain/ports/frase-dia.repository.port';
import type { IFraseDiaRepository } from '../../domain/ports/frase-dia.repository.port';

@Injectable()
export class UpdateFraseDiaUseCase {
  constructor(
    @Inject(FRASE_DIA_REPOSITORY)
    private readonly fraseDiaRepo: IFraseDiaRepository,
  ) {}

  async execute(id: string, input: UpdateFraseDiaInput): Promise<FraseDia> {
    const existing = await this.fraseDiaRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Frase del día con ID ${id} no encontrada`);
    }

    if (input.dia && input.dia !== existing.dia) {
      const existingForDate = await this.fraseDiaRepo.findByDate(input.dia);
      if (existingForDate) {
        throw new ConflictException(`Ya existe una frase del día para la fecha ${input.dia}`);
      }
    }

    return this.fraseDiaRepo.update(id, input);
  }
}