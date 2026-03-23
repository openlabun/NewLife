import { Inject, Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';

@Injectable()
export class GetTodayCheckinUseCase {
    constructor(
        @Inject('IProgressProviderPort')
        private readonly progressProvider: IProgressProviderPort,
    ) { }

    async execute(uid: string, userToken: string) {
        const checkin = await this.progressProvider.getTodayCheckin(uid, userToken);
        return checkin ?? null;
    }
}