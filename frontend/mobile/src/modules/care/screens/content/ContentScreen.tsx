import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, TextInput, FlatList, Share, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;

type ContentType = 'article' | 'video';
type Category = 'Relaciones' | 'Apoyo' | 'Motivación' | 'Salud' | 'Familia' | 'Trabajo' | 'Tipos de drogas';

type ContentItem = {
  id: string;
  title: string;
  type: ContentType;
  category: Category;
  duration: string;
  image: any;
  liked: boolean;
  tags: string[];
  author?: string;
  authorRole?: string;
  body?: string;
};

const MOCK_CONTENT: ContentItem[] = [
  { id: '1', title: 'Recaí: pasos reales de una psicóloga', type: 'video', category: 'Apoyo', duration: '5 min de duración', image: require('../../../assets/images/contenido1.png'), liked: false, tags: ['recaída', 'psicología', 'apoyo'] },
  { id: '2', title: 'Cómo manejar los impulsos en momentos difíciles', type: 'article', category: 'Motivación', duration: '3 min de lectura', image: require('../../../assets/images/contenido2.png'), liked: true, tags: ['impulsos', 'motivación', 'control'], author: 'Carlos Lopez', authorRole: 'Psicólogo', body: 'A veces parece que todo tu esfuerzo no vale la pena. Que retrocedes, que los demás no entienden, o que estás cansado de resistir. Pero lo que no ves es que cada día que eliges seguir, aunque cueste, ya estás ganando.\n\nLa mente suele mentir cuando está cansada: te hace creer que "no vas a poder", cuando en realidad solo necesitas una pausa. No es debilidad tomarte un respiro. De hecho, descansar también es una forma de disciplina.\n\nCada vez que te sientas al borde de rendirte, piensa en la persona que eras al empezar. En lo mucho que deseabas sentirte libre, tranquilo y en control. Esa versión tuya sigue ahí, esperando que vuelvas a creer en ti.\n\nHablar con alguien, escribir lo que sientes o simplemente salir a caminar puede cambiar completamente el momento. No tienes que hacerlo solo. Pedir apoyo no te hace frágil; te hace humano.\n\nY si algún día caes, recuerda: eso no borra tu camino. Las recaídas no te definen, lo que te define es tu decisión de levantarte. Cada paso, incluso los pequeños, te acerca más a tu mejor versión. 🌱' },
  { id: '3', title: 'Co-adicción: señales y pasos a seguir', type: 'video', category: 'Relaciones', duration: '5 min de duración', image: require('../../../assets/images/contenido3.png'), liked: true, tags: ['relaciones', 'co-adicción', 'familia'] },
  { id: '4', title: 'Impulsos: qué hacer en momentos críticos', type: 'article', category: 'Apoyo', duration: '3 min de lectura', image: require('../../../assets/images/contenido4.png'), liked: false, tags: ['impulsos', 'crisis', 'apoyo'] },
  { id: '5', title: 'Cómo manejar los impulsos en momentos difíciles', type: 'article', category: 'Relaciones', duration: '3 min de lectura', image: require('../../../assets/images/contenido5.png'), liked: false, tags: ['relaciones', 'impulsos'] },
  { id: '6', title: 'Cuando te dan ganas de rendirte', type: 'article', category: 'Motivación', duration: '2 min de lectura', image: require('../../../assets/images/contenido6.png'), liked: false, tags: ['motivación', 'rendirse', 'fuerza'], author: 'Carlos Lopez', authorRole: 'Psicólogo', body: 'A veces parece que todo tu esfuerzo no vale la pena. Que retrocedes, que los demás no entienden, o que estás cansado de resistir. Pero lo que no ves es que cada día que eliges seguir, aunque cueste, ya estás ganando.\n\nLa mente suele mentir cuando está cansada: te hace creer que "no vas a poder", cuando en realidad solo necesitas una pausa. No es debilidad tomarte un respiro. De hecho, descansar también es una forma de disciplina.\n\nCada vez que te sientas al borde de rendirte, piensa en la persona que eras al empezar. En lo mucho que deseabas sentirte libre, tranquilo y en control. Esa versión tuya sigue ahí, esperando que vuelvas a creer en ti.\n\nHablar con alguien, escribir lo que sientes o simplemente salir a caminar puede cambiar completamente el momento. No tienes que hacerlo solo. Pedir apoyo no te hace frágil; te hace humano.\n\nY si algún día caes, recuerda: eso no borra tu camino. Las recaídas no te definen, lo que te define es tu decisión de levantarte. Cada paso, incluso los pequeños, te acerca más a tu mejor versión. 🌱' },
  { id: '7', title: 'Salud mental y adicción', type: 'article', category: 'Salud', duration: '4 min de lectura', image: require('../../../assets/images/contenido7.png'), liked: false, tags: ['salud', 'mental', 'adicción'] },
  { id: '8', title: 'Cómo hablar con tu familia', type: 'article', category: 'Familia', duration: '3 min de lectura', image: require('../../../assets/images/contenido8.png'), liked: false, tags: ['familia', 'comunicación'] },
  { id: '9', title: 'Alcohol y trabajo: límites sanos', type: 'article', category: 'Trabajo', duration: '3 min de lectura', image: require('../../../assets/images/contenido9.png'), liked: false, tags: ['trabajo', 'límites'] },
  { id: '10', title: 'Tipos de alcohol y sus efectos', type: 'article', category: 'Tipos de drogas', duration: '5 min de lectura', image: require('../../../assets/images/contenido10.png'), liked: false, tags: ['alcohol', 'efectos', 'salud'] },
];

const CATEGORIES: Category[] = ['Relaciones', 'Apoyo', 'Motivación', 'Salud', 'Familia', 'Trabajo', 'Tipos de drogas'];
const MOST_READ_IDS = ['2', '3', '4'];

function ContentCard({
  item,
  onPress,
  onToggleLike,
  wide = false,
}: {
  item: ContentItem;
  onPress: () => void;
  onToggleLike: (id: string) => void;
  wide?: boolean;
}) {
  const handleShare = async () => {
    await Share.share({ message: item.title });
  };

  return (
    <TouchableOpacity
      style={[styles.card, wide && styles.cardWide]}
      onPress={onPress}
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
          <TouchableOpacity onPress={handleShare}>
            <Feather name="share" size={16} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onToggleLike(item.id)}>
            <Feather
              name="heart"
              size={16}
              color={item.liked ? '#FF6B6B' : colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ContentScreen({ navigation }: any) {
  const [content, setContent] = useState(MOCK_CONTENT);
  const [search, setSearch] = useState('');

  const toggleLike = (id: string) => {
    setContent(content.map((c) => c.id === id ? { ...c, liked: !c.liked } : c));
  };

  const getByCategory = (cat: Category) => content.filter((c) => c.category === cat);
  const mostRead = content.filter((c) => MOST_READ_IDS.includes(c.id));

  const filtered = search.trim()
    ? content.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : null;

  return (
    <View style={styles.container}>
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

      {/* Búsqueda */}
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
          {filtered.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              wide
              onPress={() => navigation.navigate('ArticleScreen', { item })}
              onToggleLike={toggleLike}
            />
          ))}
          <View style={{ height: spacing.xl }} />
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Contenido más leído */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Contenido más leído</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => navigation.navigate('CategoryScreen', { category: 'Más leído', items: mostRead })}
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
                item={item}
                onPress={() => navigation.navigate('ArticleScreen', { item })}
                onToggleLike={toggleLike}
              />
            )}
          />

          {/* Secciones por categoría */}
          {CATEGORIES.map((cat) => {
            const items = getByCategory(cat);
            if (items.length === 0) return null;
            return (
              <View key={cat}>
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionTitle}>{cat}</Text>
                  <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={() => navigation.navigate('CategoryScreen', { category: cat, items })}
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
                      item={item}
                      onPress={() => navigation.navigate('ArticleScreen', { item })}
                      onToggleLike={toggleLike}
                    />
                  )}
                />
              </View>
            );
          })}

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      )}
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
  searchResults: { paddingHorizontal: spacing.xl, gap: spacing.md },
  searchResultsTitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
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
  card: {
    width: CARD_WIDTH,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardWide: { width: width - spacing.xl * 2 },
  cardImage: { width: '100%', height: 160 },
  playButton: {
    position: 'absolute',
    bottom: spacing.lg + 40,
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