import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, TextInput, Share, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { width } = Dimensions.get('window');

export default function CategoryScreen({ navigation, route }: any) {
  const { category, items } = route.params;
  const [content, setContent] = useState(items);
  const [search, setSearch] = useState('');

  const toggleLike = (id: string) => {
    setContent(content.map((c: any) => c.id === id ? { ...c, liked: !c.liked } : c));
  };

  const filtered = search.trim()
    ? content.filter((c: any) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : content;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{category}</Text>
          <Text style={styles.headerSubtitle}>
            {category === 'Relaciones' ? 'Para parejas y vínculos' :
             category === 'Apoyo' ? 'Herramientas para ti' :
             category === 'Motivación' ? 'Sigue adelante' :
             category === 'Más leído' ? 'Lo más popular' :
             'Contenido relacionado'}
          </Text>
        </View>
      </View>

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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('ArticleScreen', { item })}
            activeOpacity={0.9}
          >
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            {item.type === 'video' && (
              <View style={styles.playButton}>
                <Feather name="play" size={14} color={colors.white} />
              </View>
            )}
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.cardMeta}>
                {item.type === 'article' ? 'Artículo' : 'Video'} — {item.duration}
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={async () => await Share.share({ message: item.title })}>
                  <Feather name="share" size={16} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Feather name="heart" size={16} color={item.liked ? '#FF6B6B' : colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  scroll: { paddingHorizontal: spacing.xl, gap: spacing.md },
  card: {
    width: '100%',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardImage: { width: '100%', height: 180 },
  playButton: {
    position: 'absolute',
    bottom: spacing.lg + 44,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOverlay: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    gap: 4,
  },
  cardTitle: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 18,
  },
  cardMeta: { fontSize: fontSizes.xs, color: 'rgba(255,255,255,0.7)' },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: 4,
  },
});