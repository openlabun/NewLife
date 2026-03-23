import { Inject, Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GratitudeHistoryUseCase {
  constructor(
    @Inject('IProgressProviderPort')
    private readonly progressProvider: IProgressProviderPort,
    private readonly systemAuth: SystemAuthService,
  ) { }

  async execute(uid: string, userToken: string) {
    const records = await this.progressProvider.getGratitudeHistory(uid, userToken);
    return {
      message: 'Historial de gratitud obtenido exitosamente.',
      data: records,
    };
  }
}