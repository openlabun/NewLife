import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const DIFFICULTY_COLORS: Record<string, string> = {
  SUAVE: '#4CAF50',
  MODERADA: '#FFC107',
  INTENSA: '#FF6B6B',
};

export default function ChallengeDetailScreen({ navigation, route }: any) {
  const { challenge } = route.params;

  const isCompleted = challenge.estado === 'COMPLETED';
  const percent = challenge.target > 0
    ? Math.round(((challenge.progreso_actual || 0) / challenge.target) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{challenge.titulo}</Text>
          <Text style={styles.headerSubtitle}>
            {isCompleted ? 'Reto completado' : 'Reto activo'}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>{challenge.descripcion}</Text>

        {/* Progreso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressNumber}>{challenge.progreso_actual || 0}</Text>
            <Text style={styles.progressText}> de </Text>
            <Text style={styles.progressNumber}>{challenge.target}</Text>
            <Text style={styles.progressText}> cumplidos</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percent}%` },
              ]}
            />
          </View>

          <Text style={styles.progressLabel}>
            {percent}% completado
          </Text>
        </View>

        {/* Medalla */}
        <View style={[styles.medalCard, isCompleted && styles.medalCardCompleted]}>
          <Text style={[styles.medalEmoji, !isCompleted && styles.medalEmojiGray]}>
            🏅
          </Text>
          <Text style={[styles.medalTitle, !isCompleted && styles.medalTitleGray]}>
            {challenge.titulo}
          </Text>
        </View>

        {/* Dificultad */}
        <View style={styles.difficultyRow}>
          <View
            style={[
              styles.difficultyDot,
              { backgroundColor: DIFFICULTY_COLORS[challenge.dificultad] || '#999' },
            ]}
          />
          <Text style={styles.difficultyText}>Dificultad: {challenge.dificultad}</Text>
        </View>

        {/* Tipo de reto */}
        <View style={styles.typeRow}>
          <Text style={styles.typeLabel}>Tipo de reto:</Text>
          <Text style={styles.typeValue}>{challenge.tipo}</Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  description: {
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  progressNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  medalCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  medalCardCompleted: {
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  medalEmoji: {
    fontSize: 56,
  },
  medalEmojiGray: {
    opacity: 0.3,
  },
  medalTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  medalTitleGray: {
    color: colors.textMuted,
  },
  difficultyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  difficultyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  difficultyText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeLabel: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '600',
  },
  typeValue: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '700',
  },
});