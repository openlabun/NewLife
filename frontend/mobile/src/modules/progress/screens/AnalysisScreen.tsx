import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { useAnalysisData } from './analysis/hooks/useAnalysisData';
import { EmotionBarChart } from './analysis/charts/EmotionBarChart';
import { HorizontalBarChart } from './analysis/charts/HorizontalBarChart';
import { PieChart, PieLegend } from './analysis/charts/PieChart';
import { getColorByIndex, getColorByZone } from './analysis/utils/colorHelpers';
import { styles } from './analysis/styles/analysisStyles';
import { shortenVinculoLabel, shortenZonaLabel } from './analysis/utils/labelMappers';
import { useEmotionStats } from './analysis/hooks/useEmotionStats';

export default function AnalysisScreen({ navigation }: any) {
  const { summary, riskCharts, loading, error } = useAnalysisData();
  const { emotionStats, loading: emotionLoading } = useEmotionStats();

  if (loading || emotionLoading) {    
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={colors.text} />
          <Text style={styles.errorText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Preparar datos para vínculos de riesgo
  const risksLinksData =
    riskCharts?.vinculos_riesgo?.data?.map((p: any, idx: number) => ({
      label: shortenVinculoLabel(p.label),
      value: p.porcentaje || p.value,
      color: getColorByIndex(idx),
    })) || [];

  // Preparar datos para zonas de riesgo (pastel)
  const pieData =
    riskCharts?.zonas_riesgo?.data?.map((z: any) => ({
      label: shortenZonaLabel(z.label),
      value: z.value,
      color: getColorByZone(z.label),
      porcentaje: z.porcentaje,
    })) || [];

  // Encontrar la zona más peligrosa para el tooltip
  const largestZone = pieData.reduce(
    (prev, current) => (prev.value > current.value ? prev : current),
    { label: '', value: 0, porcentaje: 0 }
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Mi análisis</Text>
          <Text style={styles.headerSubtitle}>Análisis y gráficos</Text>
        </View>
      </View>

      {/* Resumen Final - PRIMERO */}
      {summary && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen de tu progreso</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryIconText}>💪</Text>
            <Text style={styles.summaryText}>{summary.animo}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryIconText}>🌿</Text>
            <Text style={styles.summaryText}>{summary.sobriedad}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryIconText}>🔎</Text>
            <Text style={styles.summaryText}>{summary.detonantes}</Text>
          </View>
        </View>
      )}

      {/* Tus Emociones Generales */}
      {emotionStats.length > 0 && !emotionLoading && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="bar-chart-2" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Tus emociones generales</Text>
          </View>
          <Text style={styles.cardDescription}>
            Distribución de emociones en todos tus registros diarios.
          </Text>
          <EmotionBarChart data={emotionStats} />
        </View>
      )}

      {/* Vínculos de Riesgo */}
      {risksLinksData.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="users" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Vínculos de riesgo</Text>
          </View>
          <Text style={styles.cardDescription}>
            Según tus registros, estas son las personas que más te detonan.
          </Text>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Lista de personas</Text>
            <Text style={styles.listHeaderCount}>
              {risksLinksData.length} personas registradas
            </Text>
          </View>
          <HorizontalBarChart data={risksLinksData} />
        </View>
      )}

      {/* Zonas de Mayor Riesgo */}
      {pieData.length > 0 && (
        <View style={[styles.card, styles.lastCard]}>
          <View style={styles.cardHeader}>
            <Feather name="map-pin" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Zonas de mayor riesgo</Text>
          </View>
          <Text style={styles.cardDescription}>
            Puntos sensibles en espacios sociales.
          </Text>
          <View style={styles.pieWrapper}>
            <PieChart
              data={pieData}
              tooltipLabel={largestZone.label}
              tooltipValue={String(largestZone.porcentaje)}
            />
          </View>
          <PieLegend data={pieData} />
        </View>
      )}
    </ScrollView>
  );
}