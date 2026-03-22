import { Injectable, Inject } from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';

export interface CreateCommunityInput {
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
}

@Injectable()
export class CreateCommunityUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) {}

  async execute(input: CreateCommunityInput) {
    return this.communityRepo.create({
      nombre:      input.nombre,
      descripcion: input.descripcion,
      creado_por:  input.creadoPorId,
    });
  }
}