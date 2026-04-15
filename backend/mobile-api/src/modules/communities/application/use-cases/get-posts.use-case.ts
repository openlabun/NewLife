import { Injectable, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { ResolveUserIdHelper } from '../helpers/resolve-user-id.helper';

@Injectable()
export class GetPostsUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
    private readonly resolveUserId: ResolveUserIdHelper,
  ) { }

  async execute(comunidadId: string, usuarioUuid: string) {
    const masterToken = await this.systemAuth.getMasterToken();
    const robleId = await this.resolveUserId.getRobleId(usuarioUuid);

    const membRes = await this.dbService.find(
      'comunidad_usuarios',
      { comunidad_id: comunidadId, usuario_id: robleId },
      masterToken,
    );
    const membRows = Array.isArray(membRes) ? membRes : (membRes.rows || []);
    if (membRows.length === 0) throw new ForbiddenException('No eres miembro de esta comunidad.');

    const postsRes = await this.dbService.find('posts', { comunidad_id: comunidadId }, masterToken);
    const allPosts = Array.isArray(postsRes) ? postsRes : (postsRes.rows || []);
    const posts = allPosts.filter((p: any) => !p.eliminado);

    const enriched = await Promise.all(
      posts.map(async (post: any) => {
        const [autorRes, commentsRes, reactionsRes] = await Promise.all([
          this.dbService.find('usuarios', { _id: post.autor_id }, masterToken),
          this.dbService.find('comentarios', { post_id: post._id }, masterToken),
          this.dbService.find('reacciones', { post_id: post._id }, masterToken),
        ]);

        const autor = Array.isArray(autorRes) ? autorRes[0] : autorRes.rows?.[0];
        const comments = Array.isArray(commentsRes) ? commentsRes : (commentsRes.rows || []);
        const reactions = Array.isArray(reactionsRes) ? reactionsRes : (reactionsRes.rows || []);
        const activeComments = comments.filter((c: any) => !c.eliminado);

        return {
          id: post._id,
          titulo: post.titulo || null,
          contenido: post.contenido,
          created_at: post.created_at,
          edited_at: post.edited_at,
          es_mio: post.autor_id === robleId,
          autor: {
            id: post.autor_id,
            nombre: autor?.nombre || 'Usuario',
          },
          total_comentarios: activeComments.length,
          total_reacciones: reactions.length,
          mis_reacciones: reactions
            .filter((r: any) => r.usuario_id === robleId)
            .map((r: any) => r.tipo),
        };
      })
    );

    return enriched.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}