import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class AdvanceCaminoUseCase {
    constructor(
        @Inject('IProgressProviderPort')
        private readonly progressProvider: IProgressProviderPort,
        private readonly systemAuth: SystemAuthService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(uid: string, userToken: string) { 
        const masterToken = await this.systemAuth.getMasterToken();
        const camino = await this.progressProvider.getCamino(uid, masterToken);

        if (!camino || camino.nivel === null) {
            await this.progressProvider.upsertCamino(
                { _id: camino?._id, usuario_id: uid, nivel: 1, subnivel: 1 },
                masterToken,
            );
            this.eventEmitter.emit('progress.checkin.created', { usuarioId: uid, userToken });
            return { nivel: 1, subnivel: 1 };
        }

        if (camino.nivel === 12 && camino.subnivel === 3) {
            return { nivel: 12, subnivel: 3 };
        }

        let nuevoNivel = camino.nivel;
        let nuevoSubnivel = camino.subnivel;

        if (camino.subnivel < 3) {
            nuevoSubnivel += 1;
        } else {
            nuevoNivel += 1;
            nuevoSubnivel = 1;
        }

        await this.progressProvider.upsertCamino(
            { _id: camino._id, usuario_id: uid, nivel: nuevoNivel, subnivel: nuevoSubnivel },
            masterToken,
        );

        this.eventEmitter.emit('progress.checkin.created', { usuarioId: uid, userToken });

        return { nivel: nuevoNivel, subnivel: nuevoSubnivel };
    }
}