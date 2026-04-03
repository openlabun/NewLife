import { Inject, Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';

@Injectable()
export class GetCalendarUseCase {
    constructor(
        @Inject('IProgressProviderPort')
        private readonly progressProvider: IProgressProviderPort,
    ) { }

    async execute(uid: string, month: number, year: number, userToken: string) {
        const records = await this.progressProvider.getMonthCheckins(uid, month, year, userToken);

        const days = records.map((r: any) => {
            const fecha = new Date(r.fecha);
            const consumo = r.consumo === true;

            const resumen: any = { emocion: r.emocion };

            if (consumo) {
                resumen.ubicacion = r.ubicacion;
                resumen.social = r.social;
            }

            return {
                day: fecha.getDate(),
                tipo: consumo ? 'dificil' : 'limpio',
                resumen,
            };
        });

        days.sort((a, b) => a.day - b.day);

        return { month, year, days };
    }
}