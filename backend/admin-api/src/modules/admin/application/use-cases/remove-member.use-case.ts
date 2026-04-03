import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';

@Injectable()
export class RemoveMemberUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) {}

  async execute(comunidadId: string, usuarioId: string): Promise<void> {
    // 1. Verificar que la comunidad existe
    const community = await this.communityRepo.findById(comunidadId);
    if (!community) {
      throw new NotFoundException(`Comunidad ${comunidadId} no encontrada.`);
    }

    // 2. Verificar que el usuario es miembro
    const member = await this.communityRepo.findMember(comunidadId, usuarioId);
    if (!member) {
      throw new NotFoundException(
        `El usuario no es miembro de esta comunidad.`,
      );
    }

    // 3. Eliminar
    await this.communityRepo.removeMember(member._id);
  }
}