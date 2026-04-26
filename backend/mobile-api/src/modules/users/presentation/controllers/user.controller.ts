import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { CompleteProfileUseCase } from '../../application/use-cases/complete-profile.use-case';
import { GetProfileUseCase } from '../../application/use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from '../../application/use-cases/update-profile.use-case';
import { DeleteAccountUseCase } from '../../application/use-cases/delete-account.use-case';
import { InitialRegisterDto } from '../dtos/initial-register.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { GetUserPostsUseCase } from '../../../communities/application/use-cases/get-user-posts.use-case';
import { GetUserPostsByIdUseCase } from '../../../communities/application/use-cases/get-user-posts-by-id.use-case';
import { GetProfileByIdUseCase } from '../../application/use-cases/get-profile-by-id.use-case';
import { GetSobrietyTimeByIdUseCase } from '../../application/use-cases/get-sobriety-time-by-id.use-case';
import { GetCaminoByIdUseCase } from '../../application/use-cases/get-camino-by-id.use-case';

@ApiTags('Perfil de Usuario')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly completeProfileUseCase: CompleteProfileUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly deleteAccountUseCase: DeleteAccountUseCase,
    private readonly getUserPostsUseCase: GetUserPostsUseCase,
    private readonly getUserPostsByIdUseCase: GetUserPostsByIdUseCase,
    private readonly getProfileByIdUseCase: GetProfileByIdUseCase,
    private readonly getSobrietyTimeByIdUseCase: GetSobrietyTimeByIdUseCase,
    private readonly getCaminoByIdUseCase: GetCaminoByIdUseCase,
  ) { }

  @Post('complete-profile')
  @ApiOperation({ summary: 'Primer registro de datos del paciente (Onboarding)' })
  async completeProfile(@Request() req: any, @Body() dto: InitialRegisterDto) {
    return this.completeProfileUseCase.execute(req.user.uid, dto);
  }

  @Get('onboarding-status')
  @ApiOperation({ summary: 'Verifica si el usuario ya completó el registro inicial' })
  async getStatus(@Request() req: any) {
    return this.completeProfileUseCase.checkStatus(req.user.uid);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiOkResponse({ description: 'Perfil del usuario.' })
  async getProfile(@Request() req: any) {
    return this.getProfileUseCase.execute(req.user.uid);
  }

  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar perfil del usuario (apodo, pronombre, motivo, gasto)' })
  @ApiOkResponse({ description: 'Perfil actualizado.' })
  @ApiNotFoundResponse({ description: 'Perfil no encontrado.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.updateProfileUseCase.execute(req.user.uid, dto);
  }

  @Delete('account')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar cuenta del usuario autenticado' })
  @ApiOkResponse({ description: 'Cuenta eliminada.' })
  async deleteAccount(@Request() req: any) {
    return this.deleteAccountUseCase.execute(req.user.uid);
  }

  @Get('posts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener posts del usuario autenticado' })
  async getUserPosts(@Request() req: any) {
    return this.getUserPostsUseCase.execute(req.user.uid);
  }

  @Get(':id/posts')
    @ApiOperation({ summary: 'Obtener posts de cualquier usuario por su _id de Roble' })
  async getUserPostsById(@Param('id') id: string, @Request() req: any) {
    return this.getUserPostsByIdUseCase.execute(id, req.user.uid);
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Obtener perfil público de cualquier usuario por su _id de Roble' })
  @ApiOkResponse({ description: 'Perfil del usuario.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  async getProfileById(@Param('id') id: string) {
    return this.getProfileByIdUseCase.execute(id);
  }

  @Get(':id/sobriety-time-by-id')
  @ApiOperation({ summary: 'Obtener tiempo de sobriedad de cualquier usuario por su _id de Roble' })
  async getSobrietyById(@Param('id') robleId: string) {
    return this.getSobrietyTimeByIdUseCase.execute(robleId);
  }

  @Get('by-id/:id/camino')
  @ApiOperation({ summary: 'Obtener el camino de cualquier usuario por su _id de Roble' })
  async getCaminoById(@Param('id') robleId: string) {
    return this.getCaminoByIdUseCase.execute(robleId);
  }
}