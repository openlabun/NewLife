import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum BanDecision {
  APROBADA  = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
}

export class ResolveBanRequestDto {
  @ApiProperty({
    enum: BanDecision,
    example: BanDecision.APROBADA,
    description: 'Decisión sobre la solicitud de baneo',
  })
  @IsEnum(BanDecision, { message: 'La decisión debe ser APROBADA o RECHAZADA' })
  estado: BanDecision;
}

export class GetBanRequestsQueryDto {
  @ApiPropertyOptional({
    description: 'Si es true devuelve solo las pendientes (default: true)',
    example: true,
  })
  @IsOptional()
  soloPendientes?: boolean;
}