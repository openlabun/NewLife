import { Inject, Injectable } from '@nestjs/common';
import { IProgressProviderPort } from '../../domain/ports/progress-provider.port';

@Injectable()
export class GetRiskChartsUseCase {
    constructor(
        @Inject('IProgressProviderPort')
        private readonly progressProvider: IProgressProviderPort,
    ) { }

    async execute(uid: string, userToken: string) {
        const allRecords = await this.progressProvider.getAllCheckins(uid, userToken);
        const rows: any[] = Array.isArray(allRecords) ? allRecords : ((allRecords as any)?.rows ?? []);

        const conConsumo = rows.filter((r: any) => r.consumo === true);

        return {
            vinculos_riesgo: this.buildVinculos(conConsumo),
            zonas_riesgo: this.buildZonas(conConsumo),
            emociones_detonantes: this.buildEmociones(conConsumo),
        };
    }

    private buildVinculos(rows: any[]) {
        const count: Record<string, number> = {};

        for (const r of rows) {
            if (r.social) count[r.social] = (count[r.social] ?? 0) + 1;
        }

        const total = Object.values(count).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

        return {
            total_personas: sorted.length,
            data: sorted.map(([label, value]) => ({
                label,
                value,
                porcentaje: total > 0 ? Math.round((value / total) * 100) : 0,
            })),
        };
    }

    private buildZonas(rows: any[]) {
        const count: Record<string, number> = {};

        for (const r of rows) {
            if (r.ubicacion) count[r.ubicacion] = (count[r.ubicacion] ?? 0) + 1;
        }

        const total = Object.values(count).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

        return {
            data: sorted.map(([label, value]) => ({
                label,
                value,
                porcentaje: total > 0 ? Math.round((value / total) * 100) : 0,
            })),
        };
    }

    private buildEmociones(rows: any[]) {
        const count: Record<string, number> = {};

        for (const r of rows) {
            if (r.emocion) {
                const emocion = r.emocion.toLowerCase();
                count[emocion] = (count[emocion] ?? 0) + 1;
            }
        }

        const total = Object.values(count).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

        return {
            data: sorted.map(([label, value]) => ({
                label,
                value,
                porcentaje: total > 0 ? Math.round((value / total) * 100) : 0,
            })),
        };
    }
}