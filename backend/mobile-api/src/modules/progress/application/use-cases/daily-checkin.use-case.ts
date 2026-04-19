import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
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
  ) { }

  async execute(uid: string, dto: DailyCheckinDto, userToken: string) {
    this.logger.log(`📝 Iniciando registro diario para usuario: ${uid}`);

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

    this.logger.log(`📤 Creando nuevo registro diario (permite múltiples por día)`);

    const checkin = await this.progressProvider.createDailyCheckin(data, userToken);

    this.logger.log(`✅ Registro diario creado exitosamente`);

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
        // No es crítico si falla, continuamos
      }
    }

    return {
      message: 'Registro diario guardado exitosamente.',
      data: checkin,
    };
  }
}