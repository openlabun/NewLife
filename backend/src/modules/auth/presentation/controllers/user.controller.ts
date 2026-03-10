import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CompleteProfileUseCase } from '../../application/use-cases/complete-profile.use-case';
import { InitialRegisterDto } from '../dtos/initial-register.dto';
import { GetSobrietyTimeUseCase } from '../../application/use-cases/get-sobriety-time.use-case';

@ApiTags('Perfil de Usuario')
@Controller('user')
export class UserController {
  constructor(
    private readonly completeProfileUseCase: CompleteProfileUseCase,
    private readonly getSobrietyTimeUseCase: GetSobrietyTimeUseCase
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('complete-profile')
  @ApiOperation({ summary: 'Primer registro de datos del paciente (Onboarding)' })
  async completeProfile(@Request() req: any, @Body() dto: InitialRegisterDto) {
    return await this.completeProfileUseCase.execute(req.user.uid, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('onboarding-status')
  @ApiOperation({ summary: 'Verifica si el usuario ya completó el registro inicial' })
  async getStatus(@Request() req: any) {
    return await this.completeProfileUseCase.checkStatus(req.user.uid);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('sobriety-counter')
  @ApiOperation({ summary: 'Obtener tiempo de sobriedad en días, horas y minutos' })
  async getSobrietyCounter(@Request() req: any) {
    return await this.getSobrietyTimeUseCase.execute(req.user.uid);
  }
}