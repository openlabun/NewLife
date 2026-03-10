import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { GetSobrietyTimeUseCase } from '../../application/use-cases/get-sobriety-time.use-case';

@ApiTags('Home')
@ApiBearerAuth()
@Controller('home')
export class HomeController {
  constructor(private readonly getSobrietyTimeUseCase: GetSobrietyTimeUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('sobriety-time')
  @ApiOperation({ summary: 'Obtener el contador de tiempo sobrio' })
  async getSobriety(@Request() req: any) {
    return await this.getSobrietyTimeUseCase.execute(req.user.uid);
  }
}