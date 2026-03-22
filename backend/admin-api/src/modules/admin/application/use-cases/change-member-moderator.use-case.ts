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
export class ChangeMemberModeratorUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
  ) { }

  async execute(comunidadId: string, usuarioId: string, esModerador: boolean) {
    const member = await this.communityRepo.findMember(comunidadId, usuarioId);
    if (!member) {
      throw new NotFoundException(
        `El usuario no es miembro de esta comunidad.`,
      );
    }

    if (member.es_moderador === esModerador) {
      throw new BadRequestException(
        `El usuario ya ${esModerador ? 'es' : 'no es'} moderador.`,
      );
    }

    // Si se asigna moderador → CHAT_COMPLETO automático
    // Si se quita moderador → se mantiene el tipo_acceso actual
    const updates: { es_moderador: boolean; tipo_acceso?: TipoAcceso } = {
      es_moderador: esModerador,
    };

    if (esModerador) {
      updates.tipo_acceso = TipoAcceso.CHAT_COMPLETO;
    }

    const updated = await this.communityRepo.updateMember(member._id, updates);

    return {
      id: updated._id,
      usuario_id: updated.usuario_id,
      tipo_acceso: updated.tipo_acceso,
      es_moderador: updated.es_moderador,
    };
  }
}