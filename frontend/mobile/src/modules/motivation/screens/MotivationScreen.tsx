import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { useMotivation } from '../hooks/useMotivation';
import { PhraseCard } from '../components/PhraseCard';
import { ChallengeCard } from '../components/ChallengeCard';

export default function MotivationScreen({ navigation }: any) {
  const {
    fraseDia,
    misChallenges,
    loading,
    fetchFraseDia,
    fetchMisChallenges,
  } = useMotivation();

  useEffect(() => {
    // ✅ Cargar inmediatamente al montar
    fetchFraseDia();
    fetchMisChallenges();

    // ✅ Refetch cuando vuelves a la pantalla (desde otra pantalla)
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFraseDia();
      fetchMisChallenges();
    });

    return unsubscribe;
  }, [navigation, fetchFraseDia, fetchMisChallenges]);

  const handleFavoriteChange = () => {
    fetchFraseDia();
  };

  // ✅ Obtener último reto activo
  const ultimoRetoActivo = misChallenges.activos && misChallenges.activos.length > 0
    ? misChallenges.activos[misChallenges.activos.length - 1]
    : null;

  // ✅ Verificar si tiene retos activos
  const tieneRetosActivos = misChallenges.activos && misChallenges.activos.length > 0;

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

        {/* Frase del Día */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => navigation.navigate('DailyPhrase')}
        >
          <Text style={styles.sectionTitle}>Frase del Día</Text>
          <Feather name="chevron-right" size={18} color={colors.text} />
        </TouchableOpacity>

        {loading ? (
          <View style={styles.phraseCardLoading}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : fraseDia ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('DailyPhrase')}
            activeOpacity={0.9}
          >
            <PhraseCard
              fraseId={fraseDia.frase_id}
              texto={fraseDia.frase}
              isFavorite={fraseDia.isFavorite || false}
              onFavoriteChange={handleFavoriteChange}
            />
          </TouchableOpacity>
        ) : null}

        {/* Retos */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => navigation.navigate('Challenges')}
        >
          <Text style={styles.sectionTitle}>Retos</Text>
          <Feather name="chevron-right" size={18} color={colors.text} />
        </TouchableOpacity>

        {loading ? (
          <View style={styles.challengeCardLoading}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : tieneRetosActivos && ultimoRetoActivo ? (
          <ChallengeCard
            titulo={ultimoRetoActivo.titulo}
            descripcion={ultimoRetoActivo.descripcion}
            dificultad={ultimoRetoActivo.dificultad}
            progreso_actual={ultimoRetoActivo.progreso_actual || 0}
            target={ultimoRetoActivo.target}
            onPress={() =>
              navigation.navigate('ChallengeDetail', { challenge: ultimoRetoActivo })
            }
          />
        ) : (
          <View style={styles.emptyChallenge}>
            <Feather name="award" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Aún no estás en ningún reto</Text>
            <Text style={styles.emptySubtext}>¡Únete a uno y comienza tu desafío!</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Challenges')}
            >
              <Text style={styles.emptyButtonText}>Ver retos disponibles</Text>
            </TouchableOpacity>
          </View>
        )}

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
  phraseCardLoading: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  challengeCardLoading: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  emptyChallenge: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  emptyText: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  emptySubtext: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  emptyButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },
});