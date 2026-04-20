import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetCategoriasUseCase {
  constructor(private readonly db: DatabaseService, private readonly systemAuth: SystemAuthService) {}

  async execute() {
    const token = await this.systemAuth.getMasterToken();
    const result = await this.db.find('categorias_contenido', {}, token);
    return { data: Array.isArray(result) ? result : (result?.rows ?? []) };
  }
}