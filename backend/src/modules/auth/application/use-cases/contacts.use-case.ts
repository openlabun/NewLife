import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../../database/infrastructure/database.service';
import { SystemAuthService } from '../../infrastructure/services/system-auth.service';
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
    const now = new Date().toISOString();
    
    const newContact = {
      _id: this.generateId(),
      contacto_id: randomUUID(),
      usuario_id: userId,
      nombre: dto.nombre,
      telefono: dto.telefono.toString(),
      foto_url: dto.foto_url || '',
      created_at: now,
      updated_at: now
    };

    return await this.dbService.insert('contactos', [newContact], token);
  }

  async update(uuid: string, userId: string, dto: UpdateContactDto) {
    const token = await this.systemAuth.getMasterToken();
    
    const existing = await this.dbService.find('contactos', { contacto_id: uuid, usuario_id: userId }, token);
    const rows = Array.isArray(existing) ? existing : (existing.rows || []);
    if (rows.length === 0) throw new NotFoundException('Contacto no encontrado');

    const updateData = {
      ...dto,
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