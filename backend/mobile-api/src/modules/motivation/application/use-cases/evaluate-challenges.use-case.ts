import { Injectable, Inject } from '@nestjs/common';
import { IMotivationProviderPort } from '../../domain/ports/motivation-provider.port';
import { ChallengeEvaluatorFactory } from '../strategies/challenge-evaluator.factory';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class EvaluateChallengesUseCase {
  constructor(
    @Inject('IMotivationProviderPort')
    private readonly motivationProvider: IMotivationProviderPort,
    private readonly evaluatorFactory: ChallengeEvaluatorFactory,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(usuarioId: string, userToken: string) {
    const masterToken = await this.systemAuth.getMasterToken();
    const activeChallenges = await this.motivationProvider.getActiveUserChallenges(usuarioId, userToken);
    
    for (const userChallenge of activeChallenges) {
      const retoCatalogo = await this.motivationProvider.getChallengeById(userChallenge.reto_id, masterToken);
      if (!retoCatalogo) continue;

      const evaluator = this.evaluatorFactory.getEvaluator(retoCatalogo.tipo);
      const nuevoProgreso = await evaluator.evaluate(usuarioId, retoCatalogo.target, userToken, masterToken);

      if (nuevoProgreso !== userChallenge.progreso_actual) {
        let estadoFinal = 'ACTIVE';

        if (nuevoProgreso >= retoCatalogo.target) {
          estadoFinal = 'COMPLETED';
        } 
        // Si el progreso de hoy es menor que el que tenía (ej. llevaba 5 días y ahora tiene 0), recayó.
        else if (nuevoProgreso < userChallenge.progreso_actual && 
                (retoCatalogo.tipo === 'SOBRIETY_DAYS' || retoCatalogo.tipo === 'CHECKIN_STREAK')) {
          estadoFinal = 'FAILED';
        }

        await this.motivationProvider.updateChallengeProgress(
          userChallenge.user_reto_id, 
          nuevoProgreso, 
          estadoFinal, 
          userToken
        );
      }
    }
  }
}