import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { BadRequestException } from '@nestjs/common';
import { ResolveUserIdHelper } from '../helpers/resolve-user-id.helper';
 
@Injectable()
export class ReplyForumUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
    private readonly resolveUserId: ResolveUserIdHelper,
  ) {}
 
  async execute(comunidadId: string, foroId: string, usuarioUuid: string, contenido: string) {
    const masterToken = await this.systemAuth.getMasterToken();
    const robleId = await this.resolveUserId.getRobleId(usuarioUuid);
 
    const membRes = await this.dbService.find(
      'comunidad_usuarios',
      { comunidad_id: comunidadId, usuario_id: robleId },
      masterToken,
    );
    const membRows = Array.isArray(membRes) ? membRes : (membRes.rows || []);
    const membresia = membRows[0];
 
    if (!membresia) throw new ForbiddenException('No eres miembro de esta comunidad.');
    if (membresia.tipo_acceso === 'SOLO_VER') throw new ForbiddenException('Tu tipo de acceso no permite responder foros.');
 
    const foroRes = await this.dbService.find('foros', { _id: foroId }, masterToken);
    const foroRows = Array.isArray(foroRes) ? foroRes : (foroRes.rows || []);
    const foro = foroRows[0];
 
    if (!foro || foro.comunidad_id !== comunidadId) throw new NotFoundException('Foro no encontrado.');
    if (foro.activo === false) throw new ForbiddenException('Este foro ya no está activo.');
 
    const now = new Date().toISOString();
    const result = await this.dbService.insert('foros_respuestas', [{
      foro_id:    foroId,
      autor_id:   robleId,
      contenido,
      created_at: now,
      eliminado:  false,
    }], masterToken);
 
    const inserted = result?.inserted?.[0] || result?.[0] || {};
    return { id: inserted._id, contenido: inserted.contenido, created_at: inserted.created_at };
  }
}