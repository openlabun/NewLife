import { Injectable, Inject } from '@nestjs/common';
import { IMotivationProviderPort } from '../../domain/ports/motivation-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetMyChallengesUseCase {
  constructor(
    @Inject('IMotivationProviderPort')
    private readonly motivationProvider: IMotivationProviderPort,
    private readonly systemAuth: SystemAuthService,
  ) {}

  async execute(usuarioId: string, userToken: string) {
    const masterToken = await this.systemAuth.getMasterToken();
    const myChallenges = await this.motivationProvider.getUserChallenges(usuarioId, userToken);
    const allPublished = await this.motivationProvider.getPublishedChallenges(masterToken);

    // Listas donde agruparemos todo
    const activos = [];
    const terminados = [];
    const disponibles = [];

    for (const catalogo of allPublished) {
      // Buscamos si el usuario tiene este reto
      const userChallenge = myChallenges.find(mc => mc.reto_id === catalogo.reto_id);

      if (!userChallenge) {
        // NUNCA SE HA INSCRITO -> Va a DISPONIBLES
        disponibles.push({
          reto_id: catalogo.reto_id,
          titulo: catalogo.titulo,
          descripcion: catalogo.descripcion,
          dificultad: catalogo.dificultad,
          tipo: catalogo.tipo,
          target: catalogo.target,
          texto_progreso: `0% completado — Únete para comenzar`,
        });
      } else {
        // YA ESTÁ INSCRITO -> Calculamos su data
        const progreso = userChallenge.progreso_actual;
        const target = catalogo.target;
        const porcentaje = Math.min(Math.floor((progreso / target) * 100), 100);
        
        let textoProgreso = '';
        if (userChallenge.estado === 'COMPLETED') {
          textoProgreso = `${target} de ${target} cumplidos`;
        } else if (userChallenge.estado === 'FAILED') {
          textoProgreso = `Reto interrumpido - Llegaste a ${progreso}/${target}`;
        } else {
          switch (catalogo.tipo) {
            case 'SOBRIETY_DAYS': textoProgreso = `${porcentaje}% completado — ${progreso}/${target} días sin consumir`; break;
            case 'CHECKIN_STREAK': textoProgreso = `${porcentaje}% completado — Racha de ${progreso}/${target} días`; break;
            case 'CHECKIN_TOTAL': textoProgreso = `${porcentaje}% completado — ${progreso}/${target} registros totales`; break;
            case 'PATH_LEVEL': textoProgreso = `${porcentaje}% completado — Nivel ${progreso} alcanzado`; break;
            default: textoProgreso = `${porcentaje}% completado`;
          }
        }

        const retoFormateado = {
          user_reto_id: userChallenge.user_reto_id,
          reto_id: catalogo.reto_id,
          titulo: catalogo.titulo,
          descripcion: catalogo.descripcion,
          dificultad: catalogo.dificultad,
          target: target,
          estado: userChallenge.estado,
          progreso_actual: progreso,
          porcentaje: porcentaje,
          texto_progreso: textoProgreso,
        };

        // Lo empujamos a la lista correcta
        if (userChallenge.estado === 'ACTIVE') {
          activos.push(retoFormateado);
        } else {
          terminados.push(retoFormateado); // Aquí caen los COMPLETED y los FAILED
        }
      }
    }

    return {
      data: {
        activos,
        terminados,
        disponibles,
      }
    };
  }
}