import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { ContactsUseCase } from '../../application/use-cases/contacts.use-case';
import { CreateContactDto, UpdateContactDto } from '../dtos/contact.dto';

@ApiTags('Contactos de Emergencia')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsUseCase: ContactsUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de contactos del usuario' })
  findAll(@Request() req) {
    return this.contactsUseCase.findAll(req.user.uid);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo contacto' })
  create(@Request() req, @Body() dto: CreateContactDto) {
    return this.contactsUseCase.create(req.user.uid, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos de un contacto' })
  update(@Param('id') id: string, @Request() req, @Body() dto: UpdateContactDto) {
    return this.contactsUseCase.update(id, req.user.uid, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contacto' })
  remove(@Param('id') id: string, @Request() req) {
    return this.contactsUseCase.remove(id, req.user.uid);
  }
}