import { Injectable, Inject } from '@nestjs/common';
import {
  BAN_REQUEST_REPOSITORY,
} from '../../domain/ports/ban-request.repository.port';
import type {
  IBanRequestRepository,
} from '../../domain/ports/ban-request.repository.port';
import { BanRequestStatus } from '../../domain/entities/ban-request.entity';

@Injectable()
export class GetBanRequestsUseCase {
  constructor(
    @Inject(BAN_REQUEST_REPOSITORY)
    private readonly repo: IBanRequestRepository,
  ) {}

  async execute(soloPendientes = true) {
    const filters = soloPendientes
      ? { estado: BanRequestStatus.PENDIENTE }
      : undefined;
    return this.repo.findAll(filters);
  }
}