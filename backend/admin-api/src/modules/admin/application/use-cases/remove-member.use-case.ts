import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { UserRole } from '../../domain/entities/admin-user.entity';

@Injectable()
export class RemoveMemberUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
  ) {}

  async execute(comunidadId: string, usuarioId: string): Promise<void> {
    // 1. Verificar que la comunidad existe
    const community = await this.communityRepo.findById(comunidadId);
    if (!community) {
      throw new NotFoundException(`Comunidad ${comunidadId} no encontrada.`);
    }

    // 2. Verificar que el usuario es miembro y obtener su membresía
    const member = await this.communityRepo.findMember(comunidadId, usuarioId);
    if (!member) {
      throw new NotFoundException(`El usuario no es miembro de esta comunidad.`);
    }

    // 3. Eliminar el miembro
    await this.communityRepo.removeMember(member._id);

    // 4. Si era moderador, verificar si sigue siendo moderador en otra comunidad
    if (member.es_moderador) {
      const otrasMembresias = await this.communityRepo.findAllMembershipsByUsuarioId(usuarioId);
      const esModeEnOtra = otrasMembresias.some(m => m.es_moderador);

      // Si ya no es moderador en ninguna → bajar a USUARIO
      if (!esModeEnOtra) {
        await this.userRepo.update(usuarioId, { rol: UserRole.USUARIO });
      }
    }
  }
}