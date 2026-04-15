import { Injectable, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { ResolveUserIdHelper } from '../helpers/resolve-user-id.helper';

@Injectable()
export class GetForumsUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
    private readonly resolveUserId: ResolveUserIdHelper,
  ) {}
 
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
 
    const forosRes = await this.dbService.find('foros', { comunidad_id: comunidadId }, masterToken);
    const allForos = Array.isArray(forosRes) ? forosRes : (forosRes.rows || []);
    const foros = allForos.filter((f: any) => f.activo !== false);
 
    const enriched = await Promise.all(
      foros.map(async (foro: any) => {
        const repRes = await this.dbService.find('foros_respuestas', { foro_id: foro._id }, masterToken);
        const replies = Array.isArray(repRes) ? repRes : (repRes.rows || []);
        const activeReplies = replies.filter((r: any) => !r.eliminado);
        return {
          id:               foro._id,
          pregunta:         foro.pregunta,
          descripcion:      foro.descripcion,
          fecha:            foro.fecha,
          created_at:       foro.created_at,
          total_respuestas: activeReplies.length,
        };
      })
    );
 
    return enriched.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}