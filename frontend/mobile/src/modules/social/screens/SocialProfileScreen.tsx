import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import {
  getProfile,
  getSobrietyTime,
  getSobrietyTimeById,
  getCamino,
  getCaminoById,
} from '../../../services/authService';
import { getUserPosts, getUserPostsById } from '../../../services/communityService';
import { getProfileById } from '../../../services/userService';

const LEVEL_NAMES: Record<number, string> = {
  1: 'Reconocer', 2: 'Confiar', 3: 'Entregar', 4: 'Explorar',
  5: 'Compartir', 6: 'Prepararme', 7: 'Pedir cambio', 8: 'Reparar',
  9: 'Actuar', 10: 'Reflexionar', 11: 'Conectar', 12: 'Compartir',
};

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  if (diff < 60000) return 'Ahora';
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}


function PostCard({ post, onPress }: { post: any; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.postCard} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Feather name="user" size={16} color={colors.textMuted} />
        </View>
        <View style={styles.postAuthorInfo}>
          <Text style={styles.postAuthor}>{post.autor_nombre || post.nombre}</Text>
          {post.comunidad_nombre ? (
            <Text style={styles.postCommunity}>Comunidad: {post.comunidad_nombre}</Text>
          ) : null}
        </View>
        <Text style={styles.postTime}>{timeAgo(post.created_at)}</Text>
      </View>
      {post.titulo ? <Text style={styles.postTitle}>{post.titulo}</Text> : null}
      {post.contenido ? <Text style={styles.postBody}>{post.contenido}</Text> : null}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Feather name="heart" size={18} color={colors.textMuted} />
          <Text style={styles.postActionText}>{post.total_reacciones ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Feather name="message-circle" size={18} color={colors.textMuted} />
          <Text style={styles.postActionText}>{post.total_comentarios ?? 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.postAction, { marginLeft: 'auto' }]}>
          <Feather name="share" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}


export default function SocialProfileScreen({ navigation, route }: any) {
  const isOwn = route?.params?.isOwn === true;
  const robleId: string | undefined = route?.params?.robleId;
  const initialName: string = route?.params?.name || '';

  const [posts, setPosts] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [daysClean, setDaysClean] = useState<number>(0);
  const [nivel, setNivel] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        if (isOwn) {
          const [profile, postsRes, sobriety, camino] = await Promise.all([
            getProfile(),
            getUserPosts(),
            getSobrietyTime().catch(() => null),
            getCamino().catch(() => null),
          ]);
          setProfileData({ ...profile, publications: postsRes.length });
          setPosts(postsRes);
          setDaysClean(sobriety?.contador?.dias ?? 0);
          setNivel(camino?.nivel ?? 0);
        } else if (robleId) {
          const [profile, postsRes, sobriety, camino] = await Promise.all([
            getProfileById(robleId).catch(() => null),
            getUserPostsById(robleId).catch(() => []),
            getSobrietyTimeById(robleId).catch(() => null),
            getCaminoById(robleId).catch(() => null),
          ]);
          setProfileData({ ...(profile || {}), publications: postsRes.length });
          setPosts(postsRes);
          setDaysClean(sobriety?.contador?.dias ?? 0);
          setNivel(camino?.nivel ?? 0);
        }
      } catch (err) {
        console.log('Error cargando perfil:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isOwn, robleId]);

  const name = profileData?.nombre || profileData?.name || initialName;
  const rawApodo = profileData?.apodo || '';
  const displayUsername = rawApodo
    ? `@${rawApodo}`
    : `@${name.toLowerCase().replace(/\s+/g, '')}`;
  const bio = profileData?.descripcion || profileData?.bio || '';
  const publications = profileData?.publications ?? 0;
  const communityCount = profileData?.total_comunidades ?? (profileData?.communities?.length ?? 0);
  const levelName = LEVEL_NAMES[nivel] || '';


  // Nivel y logros: hardcodeados por ahora hasta que el API los devuelva
  const medals: string[] = ['🥇', '🥇', '🥇', '🥇'];
  const totalMedals = 4;
  const medalsAchieved = 4;


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
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
        <View style={styles.headerCenter}>
          <View style={styles.avatarLarge}>
            <Feather name="user" size={32} color={colors.white} />
          </View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileUsername}>{displayUsername}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Bio */}
        {!!bio && <Text style={styles.bio}>{bio}</Text>}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{publications}</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{communityCount}</Text>
            <Text style={styles.statLabel}>Comunidades</Text>
          </View>
        </View>

        {/* Medallas */}
        <TouchableOpacity
          style={styles.medalsRow}
          onPress={() => isOwn && navigation.navigate('Medals')}
          activeOpacity={isOwn ? 0.7 : 1}
        >
          {medals.map((medal, i) => (
            <Text key={i} style={styles.medalEmoji}>{medal}</Text>
          ))}
          <Text style={styles.medalsCount}>{totalMedals} logros</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-right" size={16} color={colors.text} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Card nivel */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>
              {nivel > 0 ? `Nivel ${nivel} — ${levelName}` : 'Sin nivel aún'}
            </Text>
          </View>
          <View style={styles.levelStats}>
            <View style={styles.levelStat}>
              <Text style={styles.levelStatIcon}>🎯</Text>
              <View>
                <Text style={styles.levelStatNumber}>{daysClean} días sin</Text>
                <Text style={styles.levelStatLabel}>consumo</Text>
              </View>
            </View>
            <View style={styles.levelStatDivider} />
            <View style={styles.levelStat}>
              <Text style={styles.levelStatIcon}>🏅</Text>
              <View>
                <Text style={styles.levelStatNumber}>{medalsAchieved} logros</Text>
                <Text style={styles.levelStatLabel}>alcanzados</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab publicaciones */}
        <View style={styles.tabBar}>
          <View style={styles.tabActive}>
            <Text style={styles.tabActiveText}>Publicaciones</Text>
          </View>
        </View>

        {/* Posts */}
        {posts.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="edit-3" size={36} color={colors.border} />
            <Text style={styles.emptyText}>
              {isOwn ? 'Aún no has publicado nada' : 'Sin publicaciones'}
            </Text>
          </View>
        ) : (
          posts.map((post: any) => (
            <PostCard
              key={post.id || post._id}
              post={{ ...post, autor_nombre: name }}
              onPress={() => navigation.navigate('PostDetail', { post })}
            />
          ))
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerCenter: {
    alignItems: 'center',
    gap: 4,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  profileName: {
    fontSize: fontSizes.lg,
    fontWeight: '800',
    color: colors.text,
  },
  profileUsername: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  editButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
  },
  followButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  followButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.white,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  bio: {
    fontSize: fontSizes.md,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSizes.lg,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  medalsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  medalEmoji: {
    fontSize: 24,
  },
  medalsCount: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.xs,
    flex: 1,
  },
  levelCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    justifyContent: 'center',
  },
  levelTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  levelStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  levelStatIcon: {
    fontSize: 28,
  },
  levelStatNumber: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
  },
  levelStatLabel: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  levelStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.md,
  },
  tabActive: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: colors.text,
    alignSelf: 'flex-start',
  },
  tabActiveText: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  postCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
  },
  postCommunity: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  postTime: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  postTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 22,
  },
  postBody: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.sm,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginTop: spacing.xs,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  postActionText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  emptyState: { alignItems: 'center', paddingTop: spacing.xl * 2, gap: spacing.md },
  emptyText: { fontSize: fontSizes.md, color: colors.textMuted },
});