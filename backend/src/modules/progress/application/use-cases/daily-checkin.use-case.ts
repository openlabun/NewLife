import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { DailyCheckinDto } from '../../presentation/dtos/daily-checkin.dto';

@Injectable()
export class DailyCheckinUseCase {
  constructor(
    @Inject('IProgressProviderPort')
    private readonly progressProvider: IProgressProviderPort,
    private readonly systemAuth: SystemAuthService,
  ) { }

  async execute(uid: string, dto: DailyCheckinDto, userToken: string) {
    if (dto.consumo) {
      if (!dto.ubicacion || !dto.social || !dto.reflexion) {
        throw new BadRequestException(
          'Si hubo consumo, ubicacion, social y reflexion son obligatorios',
        );
      }
    }

    const data = {
      usuario_id: uid,
      emocion: dto.emocion,
      consumo: dto.consumo,
      gratitud: dto.gratitud,
      ubicacion: dto.consumo ? dto.ubicacion : null,
      social: dto.consumo ? dto.social : null,
      reflexion: dto.consumo ? dto.reflexion : null,
    };

    const existing = await this.progressProvider.getTodayCheckin(uid, userToken);

    let checkin: any;
    let isUpdate = false;

    if (existing) {
      checkin = await this.progressProvider.updateTodayCheckin(existing._id, data, userToken);
      isUpdate = true;
    } else {
      checkin = await this.progressProvider.createDailyCheckin(data, userToken);
    }

    if (dto.consumo) {
      const masterToken = await this.systemAuth.getMasterToken();
      await this.progressProvider.updateSobrietyDate(uid, masterToken);
    }

    return {
      message: isUpdate
        ? 'Registro diario actualizado exitosamente.'
        : 'Registro diario guardado exitosamente.',
      data: checkin,
    };
  }
}