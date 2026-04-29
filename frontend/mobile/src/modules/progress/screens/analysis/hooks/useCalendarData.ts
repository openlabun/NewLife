import { useState, useCallback, useEffect } from 'react';
import { getCalendar, getAllRegistros } from '../../../../../services/progressService';

export interface ProcessedDay {
  day: number;
  tipo: 'limpio' | 'dificil';
  resumen: {
    emocion: string;
    ubicacion?: string;
    social?: string;
  };
}

export const useCalendarData = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [processedDays, setProcessedDays] = useState<ProcessedDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track min/max para bloqueo de botones
  const [minMonth, setMinMonth] = useState<number | null>(null);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxMonth, setMaxMonth] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);

    // Calcular min/max desde todos los registros
    const calculateMinMaxFromAllRegistros = useCallback(async () => {
    try {
        const response = await getAllRegistros();
        console.log('📋 Response de getAllRegistros:', response);

        // ✅ FIX: destructurar 'registros' del response
        const allRegistros = response?.registros || [];
        
        console.log('📋 Registros extraídos:', allRegistros);

        if (!allRegistros || allRegistros.length === 0) {
        console.log('⚠️  Sin registros, usando mes actual');
        const today = new Date();
        setMinMonth(today.getMonth() + 1);
        setMinYear(today.getFullYear());
        setMaxMonth(today.getMonth() + 1);
        setMaxYear(today.getFullYear());
        return;
        }

        // Extraer fechas más antigua y más reciente
        const fechas = allRegistros.map((r: any) => new Date(r.fecha));
        const minFecha = new Date(Math.min(...fechas.map((f: any) => f.getTime())));
        const maxFecha = new Date(Math.max(...fechas.map((f: any) => f.getTime())));

        console.log('📅 Fecha mínima:', minFecha);
        console.log('📅 Fecha máxima:', maxFecha);

        // Calcular mes/año mín y máx
        const minMes = minFecha.getMonth() + 1;
        const minAnio = minFecha.getFullYear();
        const maxMes = maxFecha.getMonth() + 1;
        const maxAnio = maxFecha.getFullYear();

        setMinMonth(minMes);
        setMinYear(minAnio);
        setMaxMonth(maxMes);
        setMaxYear(maxAnio);

        console.log(`✅ Rango calculado: ${minMes}/${minAnio} → ${maxMes}/${maxAnio}`);
    } catch (err) {
        console.error('❌ Error calculando min/max:', err);
        // Default al mes actual si falla
        const today = new Date();
        setMinMonth(today.getMonth() + 1);
        setMinYear(today.getFullYear());
        setMaxMonth(today.getMonth() + 1);
        setMaxYear(today.getFullYear());
    }
    }, []);

  // Procesar días: comprimir múltiples registros por día
  const processDays = useCallback((rawDays: any[]) => {
    const dayMap = new Map<number, any>();

    // Agrupar por día - el último sobrescribe (es el más reciente)
    rawDays.forEach((registro) => {
      dayMap.set(registro.day, registro);
    });

    // Convertir a array procesado
    const processed: ProcessedDay[] = Array.from(dayMap.values()).map((reg) => ({
      day: reg.day,
      tipo: reg.tipo,
      resumen: {
        emocion: reg.resumen?.emocion || 'Sin emoción',
        ...(reg.tipo === 'dificil' && {
          ubicacion: reg.resumen?.ubicacion,
          social: reg.resumen?.social,
        }),
      },
    }));

    return processed.sort((a, b) => a.day - b.day);
  }, []);

  // Fetch datos del mes
  const fetchCalendar = useCallback(
    async (month: number, year: number) => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCalendar(month, year);
        console.log('📅 Datos del calendario:', data);

        const processed = processDays(data.days || []);
        setProcessedDays(processed);
      } catch (err: any) {
        console.error('❌ Error en fetchCalendar:', err);
        setError(err.message || 'Error cargando calendario');
        setProcessedDays([]);
      } finally {
        setLoading(false);
      }
    },
    [processDays]
  );

  // Navigate a mes anterior
  const goToPreviousMonth = useCallback(() => {
    if (loading) return;

    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    // Bloquear si estamos en el mínimo
    if (
      minYear &&
      minMonth &&
      (newYear < minYear || (newYear === minYear && newMonth < minMonth))
    ) {
      console.log('⛔ No puedes ir más atrás');
      return;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    fetchCalendar(newMonth, newYear);
  }, [currentMonth, currentYear, loading, minMonth, minYear, fetchCalendar]);

  // Navigate a mes siguiente
  const goToNextMonth = useCallback(() => {
    if (loading) return;

    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    // Bloquear si estamos en el máximo
    if (
      maxYear &&
      maxMonth &&
      (newYear > maxYear || (newYear === maxYear && newMonth > maxMonth))
    ) {
      console.log('⛔ No puedes ir más adelante');
      return;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    fetchCalendar(newMonth, newYear);
  }, [currentMonth, currentYear, loading, maxMonth, maxYear, fetchCalendar]);

  // Cargar datos iniciales (hoy)
  const loadInitial = useCallback(async () => {
    // Primero calcular min/max desde TODOS los registros
    await calculateMinMaxFromAllRegistros();

    // Luego cargar el mes actual
    const today = new Date();
    fetchCalendar(today.getMonth() + 1, today.getFullYear());
  }, [calculateMinMaxFromAllRegistros, fetchCalendar]);

  // Verificar si botones están bloqueados
  const isPrevDisabled = useCallback((): boolean => {
    if (!minMonth || !minYear) return false;
    return (
      currentYear < minYear || (currentYear === minYear && currentMonth <= minMonth)
    );
  }, [currentMonth, currentYear, minMonth, minYear]);

  const isNextDisabled = useCallback((): boolean => {
    if (!maxMonth || !maxYear) return false;
    return (
      currentYear > maxYear || (currentYear === maxYear && currentMonth >= maxMonth)
    );
  }, [currentMonth, currentYear, maxMonth, maxYear]);

  return {
    currentMonth,
    currentYear,
    processedDays,
    loading,
    error,
    goToPreviousMonth,
    goToNextMonth,
    loadInitial,
    isPrevDisabled,
    isNextDisabled,
  };
};