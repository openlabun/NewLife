import React, { useEffect } from 'react';
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
import { useMotivationalPhrases } from '../../hooks/useMotivationalPhrases';
import MotivationalCard from './components/MotivationalCard';

export default function MotivationalScreen({ navigation }: any) {
  const {
    frases,
    loading,
    error,
    selectedDate,
    fetchFrasesPorFecha,
    toggleFavorito,
  } = useMotivationalPhrases();

  // ✅ Cargar frases de hoy al montar
  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    fetchFrasesPorFecha(todayDate);
  }, []);

  // ✅ Refetch al enfocar pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFrasesPorFecha(selectedDate);
    });
    return unsubscribe;
  }, [navigation, selectedDate, fetchFrasesPorFecha]);

  const handleChangeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    const dateString = newDate.toISOString().split('T')[0];
    fetchFrasesPorFecha(dateString);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
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

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={() => handleChangeDate(-1)}>
          <Feather name="chevron-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <TouchableOpacity onPress={() => handleChangeDate(1)}>
          <Feather name="chevron-right" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : frases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay frases para esta fecha</Text>
        </View>
      ) : (
        <FlatList
          data={frases}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.frase_id}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <MotivationalCard
              id={item.frase_id}
              text={item.frase}
              image={require('../../../../assets/images/phrase.jpg')}
              isFavorite={item.isFavorite || false}
              onToggleFavorite={toggleFavorito}
            />
          )}
        />
      )}
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
    marginBottom: spacing.md,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  dateText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 150,
  },
  list: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    fontSize: fontSizes.md,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
});