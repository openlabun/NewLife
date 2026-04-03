import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';
import { TipoAcceso } from '../../domain/entities/community.entity';

@Injectable()
export class ChangeMemberAccessUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) {}

  async execute(comunidadId: string, usuarioId: string, tipoAcceso: TipoAcceso) {
    // 1. Verificar que el miembro existe
    const member = await this.communityRepo.findMember(comunidadId, usuarioId);
    if (!member) {
      throw new NotFoundException(
        `El usuario no es miembro de esta comunidad.`,
      );
    }

    // 2. Verificar que el tipo de acceso es diferente
    if (member.tipo_acceso === tipoAcceso) {
      throw new BadRequestException(
        `El usuario ya tiene el tipo de acceso ${tipoAcceso}.`,
      );
    }

    // 3. Actualizar
    const updated = await this.communityRepo.updateMember(member._id, {
      tipo_acceso: tipoAcceso,
    });

    return {
      id:           updated._id,
      usuario_id:   updated.usuario_id,
      tipo_acceso:  updated.tipo_acceso,
      es_moderador: updated.es_moderador,
    };
  }
}