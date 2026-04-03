import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetCommentsUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(comunidadId: string, postId: string, usuarioId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 1. Verificar membresía
    const membRes = await this.dbService.find(
      'comunidad_usuarios',
      { comunidad_id: comunidadId, usuario_id: usuarioId },
      masterToken,
    );
    const membRows = Array.isArray(membRes) ? membRes : (membRes.rows || []);
    if (membRows.length === 0) {
      throw new ForbiddenException('No eres miembro de esta comunidad.');
    }

    // 2. Verificar que el post existe
    const postRes = await this.dbService.find('posts', { _id: postId }, masterToken);
    const postRows = Array.isArray(postRes) ? postRes : (postRes.rows || []);
    const post = postRows[0];

    if (!post || post.eliminado) {
      throw new NotFoundException('Post no encontrado.');
    }

    // 3. Obtener comentarios activos
    const commRes = await this.dbService.find('comentarios', { post_id: postId }, masterToken);
    const allComments = Array.isArray(commRes) ? commRes : (commRes.rows || []);
    const comments = allComments.filter((c: any) => !c.eliminado);

    // 4. Enriquecer con autor
    const enriched = await Promise.all(
      comments.map(async (comment: any) => {
        const autorRes = await this.dbService.find(
          'usuarios',
          { _id: comment.autor_id },
          masterToken,
        );
        const autor = Array.isArray(autorRes) ? autorRes[0] : autorRes.rows?.[0];

        return {
          id:         comment._id,
          contenido:  comment.contenido,
          created_at: comment.created_at,
          es_mio:     comment.autor_id === usuarioId,
          autor: {
            id:     comment.autor_id,
            nombre: autor?.nombre || 'Usuario',
          },
        };
      })
    );

    return enriched.sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }
}