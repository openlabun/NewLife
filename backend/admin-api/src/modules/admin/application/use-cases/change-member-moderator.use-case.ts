import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';
import { TipoAcceso } from '../../domain/entities/community.entity';
import { UserRole } from '../../domain/entities/admin-user.entity';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';;

@Injectable()
export class ChangeMemberModeratorUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
    @Inject(ADMIN_USER_REPOSITORY) 
    private readonly userRepo: IAdminUserRepository,
  ) { }

  async execute(comunidadId: string, usuarioId: string, esModerador: boolean) {
    const member = await this.communityRepo.findMember(comunidadId, usuarioId);
    if (!member) throw new NotFoundException(`El usuario no es miembro de esta comunidad.`);

    if (member.es_moderador === esModerador) {
      throw new BadRequestException(`El usuario ya ${esModerador ? 'es' : 'no es'} moderador.`);
    }

    const updates: { es_moderador: boolean; tipo_acceso?: TipoAcceso } = { es_moderador: esModerador };
    if (esModerador) updates.tipo_acceso = TipoAcceso.CHAT_COMPLETO;

    const updated = await this.communityRepo.updateMember(member._id, updates);

    // ← NUEVO: sincronizar rol en tabla usuarios
    const user = await this.userRepo.findById(usuarioId);
    if (user) {
      if (esModerador && user.rol === UserRole.USUARIO) {
        await this.userRepo.update(usuarioId, { rol: UserRole.MODERADOR });
      }
      if (!esModerador && user.rol === UserRole.MODERADOR) {
        // Solo baja a USUARIO si no es moderador en ninguna otra comunidad
        const todasLasComunidades = await this.communityRepo.findAllMembershipsByUsuarioId(usuarioId);
        const esModeEnOtra = todasLasComunidades.some(m => m.es_moderador && m._id !== member._id);
        if (!esModeEnOtra) {
          await this.userRepo.update(usuarioId, { rol: UserRole.USUARIO });
        }
      }
    }

    return updated;
  }
}