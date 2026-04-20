import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { useMotivation } from '../hooks/useMotivation';
import { PhraseCard } from '../components/PhraseCard';

export default function DailyPhraseScreen({ navigation }: any) {
  const {
    fraseDia,
    frasesGuardadas,
    loading,
    fetchFraseDia,
    fetchFrasesGuardadas,
  } = useMotivation();

  // ✅ Refetch cuando vuelves a la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFraseDia();
      fetchFrasesGuardadas();
    });

    return unsubscribe;
  }, [navigation, fetchFraseDia, fetchFrasesGuardadas]);

  const handleFavoriteChange = () => {
    // ✅ Refetch inmediato cuando cambia favorita
    fetchFraseDia();
    fetchFrasesGuardadas();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Tu frase del día</Text>
          <Text style={styles.headerSubtitle}>Lee, respira y reflexiona.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Frase del Día */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : fraseDia ? (
          <PhraseCard
            fraseId={fraseDia.frase_id}
            texto={fraseDia.frase}
            isFavorite={fraseDia.isFavorite || false}
            onFavoriteChange={handleFavoriteChange}
          />
        ) : null}

        {/* Frases Guardadas */}
        {frasesGuardadas && frasesGuardadas.length > 0 && (
          <>
            <Text style={styles.savedTitle}>Frases guardadas</Text>
            {frasesGuardadas.map((frase) => (
              <PhraseCard
                key={frase.frase_id}
                fraseId={frase.frase_id}
                texto={frase.frase}
                isFavorite={true}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </>
        )}

        {!loading && frasesGuardadas.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="inbox" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Aún no tienes frases guardadas</Text>
            <Text style={styles.emptySubtext}>Guarda tus frases favoritas dándole corazón</Text>
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
    gap: spacing.md,
  },
  savedTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  loadingContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  emptyText: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.text,
  },
  emptySubtext: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
});