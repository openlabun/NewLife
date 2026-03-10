import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { CompleteProfileUseCase } from '../../application/use-cases/complete-profile.use-case';
import { InitialRegisterDto } from '../dtos/initial-register.dto';

@ApiTags('Perfil de Usuario')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly completeProfileUseCase: CompleteProfileUseCase
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

}