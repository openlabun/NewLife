import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class DeletePostUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(comunidadId: string, postId: string, usuarioId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 1. Verificar que el post existe y pertenece a la comunidad
    const postRes = await this.dbService.find('posts', { _id: postId }, masterToken);
    const postRows = Array.isArray(postRes) ? postRes : (postRes.rows || []);
    const post = postRows[0];

    if (!post || post.eliminado) {
      throw new NotFoundException('Post no encontrado.');
    }
    if (post.comunidad_id !== comunidadId) {
      throw new NotFoundException('Post no encontrado en esta comunidad.');
    }

    // 2. Verificar que es el autor o es moderador de la comunidad
    const membRes = await this.dbService.find(
      'comunidad_usuarios',
      { comunidad_id: comunidadId, usuario_id: usuarioId },
      masterToken,
    );
    const membRows = Array.isArray(membRes) ? membRes : (membRes.rows || []);
    const membresia = membRows[0];

    if (!membresia) {
      throw new ForbiddenException('No eres miembro de esta comunidad.');
    }

    const esModerador = membresia.es_moderador === true;
    const esAutor = post.autor_id === usuarioId;

    if (!esAutor && !esModerador) {
      throw new ForbiddenException('Solo puedes eliminar tus propios posts.');
    }

    // 3. Soft delete
    await this.dbService.update('posts', '_id', postId, { eliminado: true }, masterToken);

    return { message: 'Post eliminado exitosamente.' };
  }
}