import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EvaluateChallengesUseCase } from '../use-cases/evaluate-challenges.use-case';

@Injectable()
export class ProgressEventsListener {
  constructor(private readonly evaluateChallengesUseCase: EvaluateChallengesUseCase) {}

  // Escucha el evento 'progress.checkin.created' emitido desde otro módulo
  @OnEvent('progress.checkin.created', { async: true })
  async handleCheckinCreatedEvent(payload: { usuarioId: string; userToken: string }) {
    console.log(`[Challenges] Evaluando retos para el usuario ${payload.usuarioId}...`);
    try {
      await this.evaluateChallengesUseCase.execute(payload.usuarioId, payload.userToken);
    } catch (error) {
      console.error('[Challenges] Error al evaluar retos en segundo plano:', error);
    }
  }
}