import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class DeleteCommentUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(comunidadId: string, postId: string, commentId: string, usuarioId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 1. Verificar membresía
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

    // 2. Verificar que el comentario existe
    const commRes = await this.dbService.find('comentarios', { _id: commentId }, masterToken);
    const commRows = Array.isArray(commRes) ? commRes : (commRes.rows || []);
    const comment = commRows[0];

    if (!comment || comment.eliminado) {
      throw new NotFoundException('Comentario no encontrado.');
    }
    if (comment.post_id !== postId) {
      throw new NotFoundException('Comentario no encontrado en este post.');
    }

    // 3. Verificar que es el autor o es moderador
    const esModerador = membresia.es_moderador === true;
    const esAutor = comment.autor_id === usuarioId;

    if (!esAutor && !esModerador) {
      throw new ForbiddenException('Solo puedes eliminar tus propios comentarios.');
    }

    // 4. Soft delete
    await this.dbService.update('comentarios', '_id', commentId, { eliminado: true }, masterToken);

    return { message: 'Comentario eliminado exitosamente.' };
  }
}