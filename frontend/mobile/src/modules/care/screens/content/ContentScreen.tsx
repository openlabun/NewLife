import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useContent } from '../../hooks/useContent';
import ContentCard from './components/ContentCard';

export default function ContentScreen({ navigation }: any) {
  const { contenido, loading, error, toggleFavorito, groupByCategory, getMostRead } = useContent();
  const [search, setSearch] = useState('');

  // Filtrar contenido por búsqueda
  const filtered = search.trim()
    ? contenido.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : null;

  const groupedByCategory = groupByCategory();
  const mostRead = getMostRead();

  // Estados de carga y error
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error && contenido.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Feather name="alert-circle" size={48} color={colors.textMuted} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {}}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Contenido</Text>
          <Text style={styles.headerSubtitle}>Entiende tu proceso</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
          <Feather name="heart" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Busca temas o dudas..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {filtered ? (
        // Resultados de búsqueda
        <ScrollView contentContainerStyle={styles.searchResults} showsVerticalScrollIndicator={false}>
          <Text style={styles.searchResultsTitle}>{filtered.length} resultados</Text>
          {filtered.length === 0 ? (
            <View style={styles.emptySearch}>
              <Feather name="inbox" size={48} color={colors.textMuted} />
              <Text style={styles.emptySearchText}>No encontramos resultados</Text>
            </View>
          ) : (
            filtered.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                type={item.type}
                duration={item.duration}
                image={item.image}
                liked={item.liked}
                wide
                onPress={() => navigation.navigate('ArticleScreen', { item })}
                onToggleLike={toggleFavorito}
              />
            ))
          )}
          <View style={{ height: spacing.xl }} />
        </ScrollView>
      ) : (
        // Contenido normal
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Más leído */}
          {mostRead.length > 0 && (
            <View>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Contenido más leído</Text>
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() => {
                    // Mostrar una selección de los primeros 10
                    navigation.navigate('CategoryScreen', {
                      category: 'Más leído',
                      items: contenido.slice(0, 10),
                    });
                  }}
                >
                  <Text style={styles.seeAllText}>Ver todos</Text>
                  <Feather name="chevron-right" size={14} color={colors.accent} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={mostRead}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ContentCard
                    id={item.id}
                    title={item.title}
                    type={item.type}
                    duration={item.duration}
                    image={item.image}
                    liked={item.liked}
                    onPress={() => navigation.navigate('ArticleScreen', { item })}
                    onToggleLike={toggleFavorito}
                  />
                )}
              />
            </View>
          )}

          {/* Categorías */}
          {Object.entries(groupedByCategory).map(([category, items]) => (
            <View key={category}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>{category}</Text>
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() =>
                    navigation.navigate('CategoryScreen', {
                      category,
                      items,
                    })
                  }
                >
                  <Text style={styles.seeAllText}>Ver todos</Text>
                  <Feather name="chevron-right" size={14} color={colors.accent} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={items}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ContentCard
                    id={item.id}
                    title={item.title}
                    type={item.type}
                    duration={item.duration}
                    image={item.image}
                    liked={item.liked}
                    onPress={() => navigation.navigate('ArticleScreen', { item })}
                    onToggleLike={toggleFavorito}
                  />
                )}
              />
            </View>
          ))}

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: fontSizes.lg, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSizes.sm, color: colors.textMuted },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  searchInput: { flex: 1, fontSize: fontSizes.md, color: colors.text },
  searchResults: { paddingHorizontal: spacing.xl, gap: spacing.md },
  searchResultsTitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  emptySearch: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptySearchText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text },
  seeAllButton: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllText: { fontSize: fontSizes.sm, color: colors.accent, fontWeight: '600' },
  horizontalList: { paddingHorizontal: spacing.xl, gap: spacing.md, paddingBottom: spacing.md },
  errorText: { fontSize: fontSizes.md, color: colors.textMuted, marginTop: spacing.md },
  retryButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  retryButtonText: { color: colors.white, fontSize: fontSizes.sm, fontWeight: '600' },
});