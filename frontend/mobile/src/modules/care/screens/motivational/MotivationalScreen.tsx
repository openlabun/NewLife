import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useMotivationalPhrases } from '../../hooks/useMotivationalPhrases';
import MotivationalCard from './components/MotivationalCard';

type SortOption = 'recent' | 'oldest' | 'favorites' | 'non-favorites';

const SORT_LABELS: Record<SortOption, string> = {
  recent: 'Más reciente',
  oldest: 'Más antiguo',
  favorites: 'Favoritas',
  'non-favorites': 'No favoritas',
};

export default function MotivationalScreen({ navigation }: any) {
  const { frases, loading, toggleFavorito, fetchFrasesPorFecha } = useMotivationalPhrases();
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const menuRef = React.useRef(null);

  // ✅ TODOS LOS HOOKS AL INICIO

  // Cargar frases al montar
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchFrasesPorFecha(today);
  }, [fetchFrasesPorFecha]);

  // Refetch al enfocar
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const today = new Date().toISOString().split('T')[0];
      fetchFrasesPorFecha(today);
    });
    return unsubscribe;
  }, [navigation, fetchFrasesPorFecha]);

  // Lógica de ordenamiento
  const sortedFrases = useMemo(() => {
    let sorted = [...frases];

    if (sortBy === 'recent') {
      sorted.sort((a, b) => new Date(b.dia).getTime() - new Date(a.dia).getTime());
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.dia).getTime() - new Date(b.dia).getTime());
    } else if (sortBy === 'favorites') {
      sorted = sorted.filter((f) => f.isFavorite);
      sorted.sort((a, b) => new Date(b.dia).getTime() - new Date(a.dia).getTime());
    } else if (sortBy === 'non-favorites') {
      sorted = sorted.filter((f) => !f.isFavorite);
      sorted.sort((a, b) => new Date(b.dia).getTime() - new Date(a.dia).getTime());
    }

    return sorted;
  }, [frases, sortBy]);

  // Formatear fecha para badge
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

  const handleSelectFilter = (option: SortOption) => {
    setSortBy(option);
    (menuRef.current as any)?.close?.();
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

      {/* Filtro activo con dropdown */}
      <View style={styles.filterRow}>
        <View style={styles.filterLabelContainer}>
          <Text style={styles.filterLabel}>Ordenado por:</Text>
          <Text style={styles.filterValue}>{SORT_LABELS[sortBy]}</Text>
        </View>
        <Menu ref={menuRef}>
          <MenuTrigger
            customStyles={{
              triggerWrapper: styles.menuTriggerWrapper,
              TriggerTouchableComponent: TouchableOpacity,
            }}
          >
            <Feather name="sliders" size={20} color={colors.primary} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsWrapper: styles.menuOptionsWrapper,
              optionWrapper: styles.menuOptionWrapper,
            }}
          >
            {(
              [
                'recent',
                'oldest',
                'favorites',
                'non-favorites',
              ] as SortOption[]
            ).map((option) => (
              <MenuOption
                key={option}
                onSelect={() => handleSelectFilter(option)}
                customStyles={{
                  optionWrapper: [
                    styles.menuOption,
                    sortBy === option && styles.menuOptionActive,
                  ],
                }}
              >
                <View style={styles.menuOptionContent}>
                  <Text
                    style={[
                      styles.menuOptionText,
                      sortBy === option && styles.menuOptionTextActive,
                    ]}
                  >
                    {SORT_LABELS[option]}
                  </Text>
                  {sortBy === option && (
                    <Feather name="check" size={16} color={colors.primary} />
                  )}
                </View>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>

      {/* Contenido */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : sortedFrases.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="inbox" size={48} color={colors.textMuted} />
          <Text style={styles.emptyText}>
            {sortBy === 'favorites'
              ? 'No tienes frases favoritas aún'
              : sortBy === 'non-favorites'
              ? 'No hay frases sin marcar'
              : 'No hay frases disponibles'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedFrases}
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
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  filterLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  filterLabel: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '500',
  },
  filterValue: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '700',
  },
  menuTriggerWrapper: {
    padding: spacing.sm,
  },
  menuOptionsWrapper: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuOptionWrapper: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  menuOption: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuOptionActive: {
    backgroundColor: 'rgba(74, 123, 247, 0.1)',
  },
  menuOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  menuOptionText: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
  },
  menuOptionTextActive: {
    color: colors.primary,
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
});