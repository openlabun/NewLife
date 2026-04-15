import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { ResolveUserIdHelper } from '../helpers/resolve-user-id.helper';

@Injectable()
export class GetForumDetailUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
    private readonly resolveUserId: ResolveUserIdHelper,
  ) {}
 
  async execute(comunidadId: string, foroId: string, usuarioUuid: string) {
    const masterToken = await this.systemAuth.getMasterToken();
    const robleId = await this.resolveUserId.getRobleId(usuarioUuid);
 
    const membRes = await this.dbService.find(
      'comunidad_usuarios',
      { comunidad_id: comunidadId, usuario_id: robleId },
      masterToken,
    );
    const membRows = Array.isArray(membRes) ? membRes : (membRes.rows || []);
    if (membRows.length === 0) throw new ForbiddenException('No eres miembro de esta comunidad.');
 
    const foroRes = await this.dbService.find('foros', { _id: foroId }, masterToken);
    const foroRows = Array.isArray(foroRes) ? foroRes : (foroRes.rows || []);
    const foro = foroRows[0];
 
    if (!foro || foro.comunidad_id !== comunidadId) throw new NotFoundException('Foro no encontrado.');
 
    const repRes = await this.dbService.find('foros_respuestas', { foro_id: foroId }, masterToken);
    const allReplies = Array.isArray(repRes) ? repRes : (repRes.rows || []);
    const replies = allReplies.filter((r: any) => !r.eliminado);
 
    const enrichedReplies = await Promise.all(
      replies.map(async (reply: any) => {
        const autorRes = await this.dbService.find('usuarios', { _id: reply.autor_id }, masterToken);
        const autor = Array.isArray(autorRes) ? autorRes[0] : autorRes.rows?.[0];
        return {
          id:         reply._id,
          contenido:  reply.contenido,
          created_at: reply.created_at,
          es_mio:     reply.autor_id === robleId,
          autor: { id: reply.autor_id, nombre: autor?.nombre || 'Usuario' },
        };
      })
    );
 
    return {
      id:          foro._id,
      pregunta:    foro.pregunta,
      descripcion: foro.descripcion,
      fecha:       foro.fecha,
      created_at:  foro.created_at,
      respuestas:  enrichedReplies.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    };
  }
}