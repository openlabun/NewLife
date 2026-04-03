import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';

@Injectable()
export class DeleteCommunityUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const community = await this.communityRepo.findById(id);
    if (!community) {
      throw new NotFoundException(`Comunidad ${id} no encontrada.`);
    }

    // El repositorio ya elimina los miembros antes de eliminar la comunidad
    await this.communityRepo.delete(id);
  }
}