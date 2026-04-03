import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

const VALID_REACTIONS = ['LIKE', 'LOVE', 'APOYO', 'FUERTE'];

@Injectable()
export class ReactToPostUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(comunidadId: string, postId: string, usuarioId: string, tipo: string) {
    const masterToken = await this.systemAuth.getMasterToken();

    if (!VALID_REACTIONS.includes(tipo)) {
      throw new ForbiddenException(`Reacción inválida. Opciones: ${VALID_REACTIONS.join(', ')}`);
    }

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

    // 3. Verificar si ya reaccionó con el mismo tipo — si sí, quitar (toggle)
    const reactRes = await this.dbService.find(
      'reacciones',
      { post_id: postId, usuario_id: usuarioId },
      masterToken,
    );
    const allReactions = Array.isArray(reactRes) ? reactRes : (reactRes.rows || []);
    const existing = allReactions.find((r: any) => r.tipo === tipo);

    if (existing) {
      await this.dbService.delete('reacciones', '_id', existing._id, masterToken);
      return { message: 'Reacción eliminada.', accion: 'removed', tipo };
    }

    // 4. Crear reacción
    await this.dbService.insert('reacciones', [{
      post_id:    postId,
      usuario_id: usuarioId,
      tipo,
      created_at: new Date().toISOString(),
    }], masterToken);

    return { message: 'Reacción agregada.', accion: 'added', tipo };
  }
}