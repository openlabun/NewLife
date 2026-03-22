import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import type { ICommunityRepository } from '../../domain/ports/community.repository.port';
import { COMMUNITY_REPOSITORY } from '../../domain/ports/community.repository.port';
import type { IAdminUserRepository } from '../../domain/ports/admin-user.repository.port';
import { ADMIN_USER_REPOSITORY } from '../../domain/ports/admin-user.repository.port';
import { TipoAcceso } from '../../domain/entities/community.entity';

export interface AddMemberInput {
  comunidadId: string;
  email: string;
  tipoAcceso: TipoAcceso;
  esModerador: boolean;
}

@Injectable()
export class AddMemberUseCase {
  constructor(
    @Inject(COMMUNITY_REPOSITORY)
    private readonly communityRepo: ICommunityRepository,
    @Inject(ADMIN_USER_REPOSITORY)
    private readonly userRepo: IAdminUserRepository,
  ) {}

  async execute(input: AddMemberInput) {
    // 1. Verificar que la comunidad existe
    const community = await this.communityRepo.findById(input.comunidadId);
    if (!community) {
      throw new NotFoundException(`Comunidad ${input.comunidadId} no encontrada.`);
    }

    // 2. Buscar el usuario por email
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw new NotFoundException(
        `No existe un usuario con el correo ${input.email}.`,
      );
    }

    // 3. Verificar que no es ya miembro
    const existing = await this.communityRepo.findMember(
      input.comunidadId,
      user._id,
    );
    if (existing) {
      throw new ConflictException(
        `El usuario ${input.email} ya es miembro de esta comunidad.`,
      );
    }

    // 4. Agregar
    const member = await this.communityRepo.addMember({
      comunidad_id: input.comunidadId,
      usuario_id:   user._id,
      tipo_acceso:  input.tipoAcceso,
      es_moderador: input.esModerador,
    });

    return {
      id:           member._id,
      usuario_id:   member.usuario_id,
      email:        user.email,
      nombre:       user.nombre,
      tipo_acceso:  member.tipo_acceso,
      es_moderador: member.es_moderador,
      joined_at:    member.joined_at,
    };
  }
}