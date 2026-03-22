import { Community, ComunidadUsuario, TipoAcceso } from '../entities/community.entity';

export interface CreateCommunityInput {
  nombre: string;
  descripcion?: string;
  creado_por: string;
}

export interface UpdateCommunityInput {
  nombre?: string;
  descripcion?: string;
  activa?: boolean;
}

export interface AddMemberInput {
  comunidad_id: string;
  usuario_id: string;
  tipo_acceso: TipoAcceso;
  es_moderador: boolean;
}

export interface UpdateMemberInput {
  tipo_acceso?: TipoAcceso;
  es_moderador?: boolean;
}

export const COMMUNITY_REPOSITORY = 'COMMUNITY_REPOSITORY';

export interface ICommunityRepository {
  // Comunidades
  findAll(): Promise<Community[]>;
  findById(id: string): Promise<Community | null>;
  create(data: CreateCommunityInput): Promise<Community>;
  update(id: string, data: UpdateCommunityInput): Promise<Community>;
  delete(id: string): Promise<void>;

  // Miembros
  findMembers(comunidadId: string): Promise<ComunidadUsuario[]>;
  findMember(comunidadId: string, usuarioId: string): Promise<ComunidadUsuario | null>;
  addMember(data: AddMemberInput): Promise<ComunidadUsuario>;
  updateMember(memberId: string, data: UpdateMemberInput): Promise<ComunidadUsuario>;
  removeMember(memberId: string): Promise<void>;
}