import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';

export interface UpdateCommunityInput {
  id: string;
  nombre?: string;
  descripcion?: string;
  activa?: boolean;
}

@Injectable()
export class UpdateCommunityUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) {}

  async execute(input: UpdateCommunityInput) {
    const community = await this.communityRepo.findById(input.id);
    if (!community) {
      throw new NotFoundException(`Comunidad ${input.id} no encontrada.`);
    }

    if (!input.nombre && input.descripcion === undefined && input.activa === undefined) {
      throw new BadRequestException('Debes enviar al menos un campo para actualizar.');
    }

    return this.communityRepo.update(input.id, {
      nombre:      input.nombre,
      descripcion: input.descripcion,
      activa:      input.activa,
    });
  }
}