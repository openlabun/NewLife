import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const DAILY_PHRASE = {
  text: 'No necesitas alcohol para calmarte, tu fuerza está contigo.',
  image: require('../../../assets/images/phrase1.png'),
};

const CURRENT_CHALLENGE_FULL = {
  id: '1',
  title: 'Primera semana sin alcohol',
  description: 'Completa 7 días seguidos sin consumir alcohol y registra tu progreso.',
  difficulty: 'Intensa',
  progress: 2,
  total: 7,
  unit: 'días cumplidos',
  status: 'active',
};

export default function MotivationScreen({ navigation }: any) {
  const handleShare = async () => {
    await Share.share({ message: DAILY_PHRASE.text });
  };

  const percent = Math.round((CURRENT_CHALLENGE_FULL.progress / CURRENT_CHALLENGE_FULL.total) * 100);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Motivación</Text>
            <Text style={styles.subtitle}>Tu impulso diario para seguir adelante.</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Medals')}>
            <Text style={styles.medalIcon}>🏅</Text>
          </TouchableOpacity>
        </View>

        {/* Frase del día */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => navigation.navigate('DailyPhrase')}
        >
          <Text style={styles.sectionTitle}>Frase del día</Text>
          <Feather name="chevron-right" size={18} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.phraseCard}
          onPress={() => navigation.navigate('DailyPhrase')}
          activeOpacity={0.9}
        >
          <Image source={DAILY_PHRASE.image} style={styles.phraseImage} resizeMode="cover" />
          <View style={styles.phraseOverlay}>
            <Text style={styles.phraseText}>{DAILY_PHRASE.text}</Text>
            <View style={styles.phraseActions}>
              <TouchableOpacity onPress={handleShare}>
                <Feather name="share" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="heart" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Retos */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => navigation.navigate('Challenges')}
        >
          <Text style={styles.sectionTitle}>Retos</Text>
          <Feather name="chevron-right" size={18} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.challengeCard}
          onPress={() => navigation.navigate('ChallengeDetail', { challenge: CURRENT_CHALLENGE_FULL })}
          activeOpacity={0.9}
        >
          <Text style={styles.challengeTitle}>{CURRENT_CHALLENGE_FULL.title}</Text>
          <Text style={styles.challengeDescription}>{CURRENT_CHALLENGE_FULL.description}</Text>
          <View style={styles.difficultyRow}>
            <View style={styles.difficultyDot} />
            <Text style={styles.difficultyText}>Dificultad: {CURRENT_CHALLENGE_FULL.difficulty}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {percent}% completado — {CURRENT_CHALLENGE_FULL.progress}/{CURRENT_CHALLENGE_FULL.total} {CURRENT_CHALLENGE_FULL.unit}
          </Text>
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => navigation.navigate('ChallengeDetail', { challenge: CURRENT_CHALLENGE_FULL })}
          >
            <Text style={styles.challengeButtonText}>Ver mas...</Text>
          </TouchableOpacity>
        </TouchableOpacity>

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
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  medalIcon: {
    fontSize: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  phraseCard: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  phraseImage: {
    width: '100%',
    height: 180,
  },
  phraseOverlay: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    gap: spacing.sm,
  },
  phraseText: {
    fontSize: fontSizes.sm,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  phraseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeCard: {
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
  challengeTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '800',
    color: colors.text,
  },
  challengeDescription: {
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
    backgroundColor: '#FF6B6B',
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
  challengeButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  challengeButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
});