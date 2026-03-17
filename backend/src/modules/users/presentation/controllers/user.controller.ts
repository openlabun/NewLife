import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { CompleteProfileUseCase } from '../../application/use-cases/complete-profile.use-case';
import { GetProfileUseCase } from '../../application/use-cases/get-profile.use-case';
import { InitialRegisterDto } from '../dtos/initial-register.dto';

@ApiTags('Perfil de Usuario')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly completeProfileUseCase: CompleteProfileUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('complete-profile')
  @ApiOperation({ summary: 'Primer registro de datos del paciente (Onboarding)' })
  async completeProfile(@Request() req: any, @Body() dto: InitialRegisterDto) {
    return await this.completeProfileUseCase.execute(req.user.uid, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('onboarding-status')
  @ApiOperation({ summary: 'Verifica si el usuario ya completó el registro inicial' })
  async getStatus(@Request() req: any) {
    return await this.completeProfileUseCase.checkStatus(req.user.uid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  async getProfile(@Request() req: any) {
    return await this.getProfileUseCase.execute(req.user.uid);
  }
}