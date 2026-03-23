import { Inject, Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';
import { SystemAuthService } from '../../../auth/infrastructure/services/system-auth.service';

@Injectable()
export class GetCaminoUseCase {
    constructor(
        @Inject('IProgressProviderPort')
        private readonly progressProvider: IProgressProviderPort,
        private readonly systemAuth: SystemAuthService,
    ) { }

    async execute(uid: string) {
        const masterToken = await this.systemAuth.getMasterToken();
        const camino = await this.progressProvider.getCamino(uid, masterToken);

        if (!camino || camino.nivel === null) {
            return { nivel: null, subnivel: null };
        }

        return { nivel: camino.nivel, subnivel: camino.subnivel };
    }
}