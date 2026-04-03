import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';

@Injectable()
export class GetCommunitiesUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) {}

  async executeAll() {
    const communities = await this.communityRepo.findAll();

    // Para cada comunidad traemos el conteo de miembros
    const result = await Promise.all(
      communities.map(async (c) => {
        const members = await this.communityRepo.findMembers(c._id);
        return {
          id:           c._id,
          nombre:       c.nombre,
          descripcion:  c.descripcion ?? null,
          activa:       c.activa,
          created_at:   c.created_at,
          creado_por:   c.creado_por,
          total_miembros:    members.length,
          total_moderadores: members.filter((m) => m.es_moderador).length,
        };
      }),
    );

    return result;
  }

  async executeOne(id: string) {
    const community = await this.communityRepo.findById(id);
    if (!community) {
      throw new NotFoundException(`Comunidad ${id} no encontrada.`);
    }

    const members = await this.communityRepo.findMembers(id);

    return {
      id:           community._id,
      nombre:       community.nombre,
      descripcion:  community.descripcion ?? null,
      activa:       community.activa,
      created_at:   community.created_at,
      creado_por:   community.creado_por,
      miembros:     members.map((m) => ({
        id:           m._id,
        usuario_id:   m.usuario_id,
        tipo_acceso:  m.tipo_acceso,
        es_moderador: m.es_moderador,
        joined_at:    m.joined_at,
      })),
    };
  }
}