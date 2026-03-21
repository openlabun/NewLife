import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';
import { CreateContactDto, UpdateContactDto } from '../../presentation/dtos/contact.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ContactsUseCase {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly systemAuth: SystemAuthService,
  ) {}

  private generateId = () => Math.random().toString(36).substring(2, 14).padEnd(12, '0');

  async findAll(userId: string) {
    const token = await this.systemAuth.getMasterToken();
    const res = await this.dbService.find('contactos', { usuario_id: userId }, token);
    return Array.isArray(res) ? res : (res.rows || []);
  }

  async create(userId: string, dto: CreateContactDto) {
    const token = await this.systemAuth.getMasterToken();

    // 🔹 Convertir a string y eliminar espacios
    const phone = dto.telefono.toString().trim();

    // 🔹 Verificar que largo numero
    if (phone.length !== 10) {
      throw new BadRequestException('Número inválido. Debe tener 10 dígitos.');
    }

    // 🔹 Validación de duplicados
    const existing = await this.dbService.find('contactos', { usuario_id: userId, telefono: phone }, token);
    const rows = Array.isArray(existing) ? existing : (existing.rows || []);
    if (rows.length > 0) {
      throw new BadRequestException('Este número ya está registrado');
    }

    const now = new Date().toISOString();
    const newContact = {
      _id: this.generateId(),
      contacto_id: randomUUID(),
      usuario_id: userId,
      nombre: dto.nombre,
      telefono: phone,
      foto_url: dto.foto_url || '',
      created_at: now,
      updated_at: now
    };

    return await this.dbService.insert('contactos', [newContact], token);
  }

  async update(uuid: string, userId: string, dto: UpdateContactDto) {
    const token = await this.systemAuth.getMasterToken();

    // 🔹 Convertir a string y eliminar espacios
    const phone = dto.telefono.toString().trim();

    // 🔹 Validar largo del teléfono
    if (phone.length !== 10) {
      throw new BadRequestException('Número inválido. Debe tener 10 dígitos.');
    }

    // 🔹 Verificar que el contacto exista
    const existing = await this.dbService.find('contactos', { contacto_id: uuid, usuario_id: userId }, token);
    const rows = Array.isArray(existing) ? existing : (existing.rows || []);
    if (rows.length === 0) throw new NotFoundException('Contacto no encontrado');

    // 🔹 Verificar duplicado en otros contactos
    const duplicateCheck = await this.dbService.find('contactos', { usuario_id: userId, telefono: phone }, token);
    const duplicates = Array.isArray(duplicateCheck) ? duplicateCheck : (duplicateCheck.rows || []);
    if (duplicates.some(c => c.contacto_id !== uuid)) {
      throw new BadRequestException('Este número ya está registrado en otro contacto');
    }

    const updateData = {
      ...dto,
      telefono: phone,
      updated_at: new Date().toISOString()
    };

    return await this.dbService.update('contactos', 'contacto_id', uuid, updateData, token);
  }

  async remove(uuid: string, userId: string) {
    const token = await this.systemAuth.getMasterToken();
    
    const existing = await this.dbService.find('contactos', { contacto_id: uuid, usuario_id: userId }, token);
    const rows = Array.isArray(existing) ? existing : (existing.rows || []);
    if (rows.length === 0) throw new NotFoundException('Contacto no encontrado');

    return await this.dbService.delete('contactos', 'contacto_id', uuid, token);
  }
}