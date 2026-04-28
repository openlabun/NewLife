import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useMotivationalPhrases } from '../../../care/hooks/useMotivationalPhrases';
import MotivationalCard from '../../../care/screens/motivational/components/MotivationalCard';

export default function MotivationalPhrasesScreen({ navigation }: any) {
  const { frases, loading, toggleFavorito, fetchFrasesPorFecha } = useMotivationalPhrases();
  const hasFetched = useRef(false);

  // ✅ Cargar frases al montar (una sola vez)
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const today = new Date().toISOString().split('T')[0];
      fetchFrasesPorFecha(today);
    }
  }, []);

  // ✅ Refetch al enfocar en la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const today = new Date().toISOString().split('T')[0];
      fetchFrasesPorFecha(today);
    });
    return unsubscribe;
  }, [navigation, fetchFrasesPorFecha]);

  // ✅ Formatear fecha para badge
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Hoy';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Frases motivacionales</Text>
        </View>
      </View>

      <Text style={styles.title}>Motívate</Text>
      <Text style={styles.subtitle}>Sigue adelante</Text>

      {/* Contenido */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : frases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="inbox" size={48} color={colors.textMuted} />
          <Text style={styles.emptyText}>No hay frases disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={frases}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.frase_id}
          style={{ flexGrow: 0 }}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              {/* Badge con fecha */}
              <View style={styles.dateTab}>
                <Text style={styles.dateTabText}>{formatDate(item.dia)}</Text>
              </View>
              {/* Card */}
              <MotivationalCard
                id={item.frase_id}
                text={item.frase}
                image={require('../../../../assets/images/phrase.jpg')}
                isFavorite={item.isFavorite || false}
                onToggleFavorite={toggleFavorito}
              />
            </View>
          )}
        />
      )}

      {/* Link a práctica guiada */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('GuidedMeditationScreen')}
      >
        <Text style={styles.link}>Ir a práctica guiada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: spacing.xl,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  list: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  cardWrapper: {
    position: 'relative',
  },
  dateTab: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.md,
    zIndex: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  dateTabText: {
    fontSize: fontSizes.xs,
    fontWeight: '700',
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
  },
  link: {
    fontSize: fontSizes.sm,
    color: colors.accent,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});