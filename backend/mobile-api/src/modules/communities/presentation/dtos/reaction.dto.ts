import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReactDto {
  @ApiProperty({ enum: ['LIKE', 'LOVE', 'APOYO', 'FUERTE'], example: 'APOYO' })
  @IsString()
  @IsIn(['LIKE', 'LOVE', 'APOYO', 'FUERTE'])
  tipo: string;
}