import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const DIFFICULTY_COLORS: Record<string, string> = {
  SUAVE: '#4CAF50',
  MODERADA: '#FFC107',
  INTENSA: '#FF6B6B',
};

// ── CheckIcon ────
const CheckIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24">
    <Path
      d="M5 12L10 17L19 7"
      stroke="#FFF"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

// ── ProgressDot ───
const ProgressDot = ({
  isActive,
  isCompleted,
  index,
}: {
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 80),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const dotStyle = isActive || isCompleted ? styles.dotFilled : styles.dotEmpty;

  return (
    <Animated.View
      style={[
        styles.dotWrapper,
        { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={[styles.dot, dotStyle]}>
        {(isActive || isCompleted) && <CheckIcon />}
      </View>
      {(isActive || isCompleted) && <View style={styles.dotGlow} />}
    </Animated.View>
  );
};

// ── ChallengeDetailScreen ───
export default function ChallengeDetailScreen({ navigation, route }: any) {
  const { challenge } = route.params;

  const isCompleted = challenge.estado === 'COMPLETED';
  const percent = challenge.target > 0
    ? Math.round(((challenge.progreso_actual || 0) / challenge.target) * 100)
    : 0;

  const displayDifficulty = challenge.dificultad.charAt(0).toUpperCase()
    + challenge.dificultad.slice(1).toLowerCase();

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

        {/* ── Progreso ── */}
        <View style={styles.progressContainer}>
          {/* Texto */}
          <View style={styles.progressHeader}>
            <Text style={styles.progressNumber}>{challenge.progreso_actual || 0}</Text>
            <Text style={styles.progressText}> de </Text>
            <Text style={styles.progressNumber}>{challenge.target}</Text>
            <Text style={styles.progressText}> cumplidos</Text>
          </View>

          {/* Barra */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percent}%` },
              ]}
            />
          </View>

          {/* Dots animados */}
          {challenge.target <= 30 && (
            <View style={styles.dotsRow}>
              {Array.from({ length: challenge.target }).map((_, i) => (
                <ProgressDot
                  key={i}
                  index={i}
                  isActive={i < (challenge.progreso_actual || 0)}
                  isCompleted={isCompleted && i < (challenge.progreso_actual || 0)}
                />
              ))}
            </View>
          )}
        </View>

        {/* ── Medalla ── */}
        <View style={[styles.medalCard, isCompleted && styles.medalCardCompleted]}>
          <Text style={[styles.medalEmoji, !isCompleted && styles.medalEmojiGray]}>
            🏅
          </Text>
          <Text style={[styles.medalTitle, !isCompleted && styles.medalTitleGray]}>
            {challenge.titulo}
          </Text>
        </View>

        {/* ── Dificultad ── */}
        <View style={styles.difficultyRow}>
          <View
            style={[
              styles.difficultyDot,
              { backgroundColor: DIFFICULTY_COLORS[challenge.dificultad] || '#999' },
            ]}
          />
          <Text style={styles.difficultyText}>Dificultad: {displayDifficulty}</Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

// ── Styles ───
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
    color: colors.textLight || colors.text,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },

  // ── Progreso
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
    color: '#406ADF',
  },
  progressText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(173, 206, 245, 0.52)',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#406ADF',
    borderRadius: 3,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  // ── Dots
  dotWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dotFilled: {
    backgroundColor: '#406ADF',
    shadowColor: '#406ADF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  dotEmpty: {
    backgroundColor: '#cbe2fc',
    borderWidth: 2,
    borderColor: 'rgba(90, 116, 230, 0.39)',
    borderStyle: 'dashed',
  },
  dotGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 116, 230, 0.39)',
    zIndex: 1,
  },

  // ── Medalla
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

  // ── Dificultad
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
});