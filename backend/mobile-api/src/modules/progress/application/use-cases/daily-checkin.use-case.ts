import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { DailyCheckinDto } from '../../presentation/dtos/daily-checkin.dto';

@Injectable()
export class DailyCheckinUseCase {
  private logger = new Logger(DailyCheckinUseCase.name);

  constructor(
    @Inject('IProgressProviderPort')
    private readonly progressProvider: IProgressProviderPort,
    private readonly systemAuth: SystemAuthService,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async execute(uid: string, dto: DailyCheckinDto, userToken: string) {
    this.logger.log(`📝 Iniciando registro diario para usuario: ${uid}`);

    if (dto.consumo) {
      if (!dto.ubicacion || !dto.social || !dto.reflexion) {
        throw new BadRequestException('Si hubo consumo, ubicacion, social y reflexion son obligatorios');
      }
    }

    // ✨ GENERAR FECHA EN UTC-5
    const ahora = new Date();
    const fechaUTC5 = new Date(ahora.getTime() - (5 * 60 * 60 * 1000));
    const fechaFormato = fechaUTC5.toISOString().slice(0, 19) + '-05:00';

    const data = {
      usuario_id: uid,
      emocion: dto.emocion,
      consumo: dto.consumo,
      gratitud: dto.gratitud,
      fecha: fechaFormato, // ✨ AGREGAR FECHA
      ubicacion: dto.consumo ? dto.ubicacion : null,
      social: dto.consumo ? dto.social : null,
      reflexion: dto.consumo ? dto.reflexion : null,
    };

    const existing = await this.progressProvider.getTodayCheckin(uid, userToken);
    let checkin: any;
    let isUpdate = !!existing;

    this.logger.log(`📤 Procesando registro diario (${isUpdate ? 'Actualización' : 'Nuevo'})`);

    checkin = await this.progressProvider.createDailyCheckin(data, userToken);

    this.logger.log(`✅ Registro diario procesado exitosamente`);

    // ✅ Si hay consumo, actualizar sobriedad a AHORA
    if (dto.consumo) {
      try {
        this.logger.log(`🔄 Actualizando fecha de sobriedad a: ${new Date().toISOString()}`);
        const masterToken = await this.systemAuth.getMasterToken();

        // ✅ PASAR LA FECHA ACTUAL EN UTC
        await this.progressProvider.updateSobrietyDate(
          uid,
          new Date().toISOString(),  // ← FECHA AHORA en UTC
          masterToken,
        );

        this.logger.log(`✅ Sobriedad actualizada`);
      } catch (error: any) {
        this.logger.error(`⚠️  Error actualizando sobriedad:`, error.message);
      }
    }

    this.eventEmitter.emit('progress.checkin.created', { usuarioId: uid, userToken });

    return {
      message: isUpdate ? 'Registro diario actualizado exitosamente.' : 'Registro diario guardado exitosamente.',
      data: checkin,
    };
  }
}