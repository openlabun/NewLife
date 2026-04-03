import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Difficulty = 'Suave' | 'Moderada' | 'Intensa';
type ChallengeStatus = 'active' | 'completed';

type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  progress: number;
  total: number;
  unit: string;
  status: ChallengeStatus;
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Suave: '#4CAF50',
  Moderada: '#FFC107',
  Intensa: '#FF6B6B',
};

const CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: '30 días de claridad',
    description: 'Haz tu registro por 30 días seguidos.',
    difficulty: 'Intensa',
    progress: 0,
    total: 30,
    unit: 'registros completados',
    status: 'active',
  },
  {
    id: '2',
    title: 'Día Limpio',
    description: 'Evita el alcohol por 24 horas.',
    difficulty: 'Suave',
    progress: 0,
    total: 1,
    unit: 'día completado',
    status: 'active',
  },
  {
    id: '3',
    title: 'No a la Autoexigencia',
    description: 'Identifica y suelta un pensamiento duro contigo.',
    difficulty: 'Moderada',
    progress: 0,
    total: 1,
    unit: 'completado',
    status: 'active',
  },
  {
    id: '4',
    title: '3 salidas sin alcohol',
    description: 'Aprende a disfrutar salidas, fiestas o reuniones sin beber. Reencuéntrate contigo y tus amigos reales.',
    difficulty: 'Intensa',
    progress: 0,
    total: 3,
    unit: 'salidas completadas',
    status: 'active',
  },
  {
    id: '5',
    title: '1ra semana sin alcohol',
    description: 'Completa 7 días seguidos sin consumir alcohol y registra tu progreso.',
    difficulty: 'Intensa',
    progress: 7,
    total: 7,
    unit: 'días cumplidos',
    status: 'completed',
  },
];

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <View style={styles.difficultyRow}>
      <View style={[styles.difficultyDot, { backgroundColor: DIFFICULTY_COLORS[difficulty] }]} />
      <Text style={styles.difficultyText}>Dificultad: {difficulty}</Text>
    </View>
  );
}

function ChallengeCard({ challenge, onPress }: { challenge: Challenge; onPress: () => void }) {
  const percent = Math.round((challenge.progress / challenge.total) * 100);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{challenge.title}</Text>
      <Text style={styles.cardDescription}>{challenge.description}</Text>
      <DifficultyBadge difficulty={challenge.difficulty} />
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.progressLabel}>
        {percent}% completado
        {challenge.total > 1 ? ` — ${challenge.progress}/${challenge.total} ${challenge.unit}` : ''}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Ver mas...</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ChallengesScreen({ navigation }: any) {
  const [tab, setTab] = useState<ChallengeStatus>('active');

  const filtered = CHALLENGES.filter((c) => c.status === tab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Retos</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'completed' && styles.tabButtonActive]}
          onPress={() => setTab('completed')}
        >
          <Text style={[styles.tabText, tab === 'completed' && styles.tabTextActive]}>
            Terminados
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'active' && styles.tabButtonActive]}
          onPress={() => setTab('active')}
        >
          <Text style={[styles.tabText, tab === 'active' && styles.tabTextActive]}>
            Activos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onPress={() => navigation.navigate('ChallengeDetail', { challenge })}
          />
        ))}
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
  tabsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  tabButton: {
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.white,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    gap: spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '800',
    color: colors.text,
  },
  cardDescription: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 20,
  },
  difficultyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
});