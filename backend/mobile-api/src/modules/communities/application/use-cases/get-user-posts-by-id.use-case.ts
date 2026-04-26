import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetUserPostsByIdUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(robleId: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    // 1. Buscar posts directamente con el _id (robleId)
    const postsRes = await this.dbService.find('posts', { autor_id: robleId }, masterToken);
    const allPosts = Array.isArray(postsRes) ? postsRes : (postsRes.rows || []);
    const posts = allPosts.filter((p: any) => !p.eliminado);

    // 2. Enriquecer con comunidad y conteos
    const enriched = await Promise.all(
      posts.map(async (post: any) => {
        const [community, commentsRes, reactionsRes] = await Promise.all([
          this.dbService.findById('comunidades', post.comunidad_id, masterToken),
          this.dbService.find('comentarios', { post_id: post._id }, masterToken),
          this.dbService.find('reacciones', { post_id: post._id }, masterToken),
        ]);

        const comments  = Array.isArray(commentsRes) ? commentsRes : (commentsRes.rows || []);
        const reactions = Array.isArray(reactionsRes) ? reactionsRes : (reactionsRes.rows || []);
        const activeComments = comments.filter((c: any) => !c.eliminado);

        return {
          id:                post._id,
          titulo:            post.titulo || null,
          contenido:         post.contenido,
          created_at:        post.created_at,
          comunidad_id:      post.comunidad_id,
          comunidad_nombre:  community?.nombre || '',
          total_comentarios: activeComments.length,
          total_reacciones:  reactions.length,
        };
      })
    );

    // 3. Ordenar por fecha descendente
    return enriched.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}