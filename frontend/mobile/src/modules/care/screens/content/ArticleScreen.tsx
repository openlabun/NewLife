import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';

const { width } = Dimensions.get('window');

export default function ArticleScreen({ navigation, route }: any) {
  const { item } = route.params;
  const [liked, setLiked] = useState(item.liked);

  const handleShare = async () => {
    await Share.share({ message: item.title });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>
            {item.type === 'article' ? 'Artículo' : 'Video'}
          </Text>
          <Text style={styles.headerSubtitle}>Lectura: {item.duration}</Text>
        </View>
        <TouchableOpacity onPress={handleShare} style={styles.headerAction}>
          <Feather name="share" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.headerAction}>
          <Feather name="heart" size={20} color={liked ? '#FF6B6B' : colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Imagen principal */}
        <Image source={item.image} style={styles.heroImage} resizeMode="cover" />

        {/* Título */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Tags + likes */}
        <View style={styles.metaRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.category}</Text>
          </View>
          <View style={styles.metaStats}>
            <Feather name="heart" size={14} color={colors.textMuted} />
            <Text style={styles.metaStat}>100</Text>
            <Feather name="share" size={14} color={colors.textMuted} />
            <Text style={styles.metaStat}>120</Text>
          </View>
        </View>

        {/* Autor */}
        {item.author && (
          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Feather name="user" size={20} color={colors.textMuted} />
            </View>
            <View>
              <Text style={styles.authorName}>{item.author}</Text>
              <Text style={styles.authorRole}>{item.authorRole}</Text>
            </View>
          </View>
        )}

        {/* Cuerpo */}
        {item.body ? (
          item.body.split('\n\n').map((paragraph: string, i: number) => (
            <Text key={i} style={styles.body}>{paragraph}</Text>
          ))
        ) : (
          <Text style={styles.body}>
            Este contenido explora el tema de {item.title.toLowerCase()}. Profundiza en estrategias prácticas para tu proceso de recuperación y bienestar.
          </Text>
        )}

        {/* Tags */}
        <View style={styles.tagsRow}>
          {item.tags.map((tag: string) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagChipText}>#{tag}</Text>
            </View>
          ))}
        </View>

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
    gap: spacing.sm,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: fontSizes.lg, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSizes.sm, color: colors.textMuted },
  headerAction: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { paddingBottom: spacing.xl },
  heroImage: { width: '100%', height: 220 },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 28,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  tagText: { fontSize: fontSizes.xs, color: colors.text, fontWeight: '600' },
  metaStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaStat: { fontSize: fontSizes.sm, color: colors.textMuted },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text },
  authorRole: { fontSize: fontSizes.sm, color: colors.textMuted },
  body: {
    fontSize: fontSizes.md,
    color: colors.textLight,
    lineHeight: 26,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  tagChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  tagChipText: { fontSize: fontSizes.xs, color: colors.textMuted },
});