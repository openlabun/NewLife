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

  // Verificar membresía
  const membRes = await this.dbService.find(
    'comunidad_usuarios',
    { comunidad_id: comunidadId, usuario_id: robleId },
    masterToken,
  );
  const membRows = Array.isArray(membRes) ? membRes : (membRes.rows || []);
  if (membRows.length === 0) throw new ForbiddenException('No eres miembro de esta comunidad.');

  // Traer posts
  const postsRes = await this.dbService.find('posts', { comunidad_id: comunidadId }, masterToken);
  const allPosts = Array.isArray(postsRes) ? postsRes : (postsRes.rows || []);
  const posts = allPosts.filter((p: any) => !p.eliminado);

  if (posts.length === 0) return [];

  // Traer TODO en paralelo — una sola ronda de llamadas
  const postIds    = posts.map((p: any) => p._id);
  const autorIds   = [...new Set(posts.map((p: any) => p.autor_id))] as string[];

  const [allComments, allReactions, ...autores] = await Promise.all([
    this.dbService.find('comentarios', { comunidad_id: comunidadId }, masterToken)
      .then((r: any) => Array.isArray(r) ? r : (r.rows || [])),
    this.dbService.find('reacciones', { comunidad_id: comunidadId }, masterToken)
      .then((r: any) => Array.isArray(r) ? r : (r.rows || [])),
    ...autorIds.map(id =>
      this.dbService.findById('usuarios', id, masterToken)
    ),
  ]);

  // Mapas para cruce en memoria
  const autorMap = Object.fromEntries(
    autorIds.map((id, i) => [id, autores[i]])
  );

  return posts
    .map((post: any) => {
      const comments  = allComments.filter((c: any) => c.post_id === post._id && !c.eliminado);
      const reactions = allReactions.filter((r: any) => r.post_id === post._id);
      const autor     = autorMap[post.autor_id];

      return {
        id:                post._id,
        titulo:            post.titulo || null,
        contenido:         post.contenido,
        created_at:        post.created_at,
        edited_at:         post.edited_at,
        es_mio:            post.autor_id === robleId,
        autor: {
          id:     post.autor_id,
          nombre: autor?.nombre || 'Usuario',
        },
        total_comentarios: comments.length,
        total_reacciones:  reactions.length,
        mis_reacciones:    reactions
          .filter((r: any) => r.usuario_id === robleId)
          .map((r: any) => r.tipo),
      };
    })
    .sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}
}