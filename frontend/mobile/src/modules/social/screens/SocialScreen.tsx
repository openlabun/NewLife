import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Post = {
  id: string;
  author: string;
  community: string;
  timeAgo: string;
  title: string;
  body: string;
  image?: any;
  likes: number;
  comments: number;
};

const USER_COMMUNITIES = ['AA Barranquilla', 'Fundación Shalom'];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Carlos Amador',
    community: 'AA Barranquilla',
    timeAgo: '4h',
    title: 'Hombres sean sinceros... como hacen para no ceder a la tentación cuando sus novias les invitan tomar un traguito',
    body: 'Hola chicos, hace una semana me pasó una situación que no supe muy bien cómo manejar. Mi novia me invitó a tomar "solo un traguito" para...',
    likes: 100,
    comments: 120,
  },
  {
    id: '2',
    author: 'Juan Perez',
    community: 'Fundación Shalom',
    timeAgo: '3d',
    title: '',
    body: '',
    image: require('../../../assets/images/contenido1.png'),
    likes: 45,
    comments: 12,
  },
];

const DAILY_FORUM = {
  question: '¿Qué podrías hacer solo por hoy para cuidarte y mantener tu paz interior?',
};

function PostCard({
  post,
  onPress,
  onPressAuthor,
}: {
  post: Post;
  onPress: () => void;
  onPressAuthor: () => void;
}) {
  return (
    <TouchableOpacity style={styles.postCard} onPress={onPress} activeOpacity={0.9}>
      <TouchableOpacity style={styles.postHeader} onPress={onPressAuthor} activeOpacity={0.7}>
        <View style={styles.postAvatar}>
          <Feather name="user" size={18} color={colors.textMuted} />
        </View>
        <View style={styles.postAuthorInfo}>
          <Text style={styles.postAuthor}>{post.author}</Text>
          <Text style={styles.postCommunity}>Comunidad: {post.community}</Text>
        </View>
        <Text style={styles.postTime}>{post.timeAgo}</Text>
      </TouchableOpacity>

      {post.title ? <Text style={styles.postTitle}>{post.title}</Text> : null}
      {post.body ? <Text style={styles.postBody}>{post.body}</Text> : null}
      {post.image && (
        <Image source={post.image} style={styles.postImage} resizeMode="cover" />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Feather name="heart" size={18} color={colors.textMuted} />
          <Text style={styles.postActionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postAction}>
          <Feather name="message-circle" size={18} color={colors.textMuted} />
          <Text style={styles.postActionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.postAction, { marginLeft: 'auto' }]}>
          <Feather name="share" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function SocialScreen({ navigation }: any) {
  const hasCommunities = USER_COMMUNITIES.length > 0;

  const getOtherUserProfile = (post: Post) => ({
    name: post.author,
    username: '@' + post.author.toLowerCase().replace(' ', ''),
    bio: 'Miembro de la comunidad.',
    publications: 15,
    communities: ['AA Barranquilla'],
    medals: ['🥇', '🥇', '🥇', '🥇'],
    totalMedals: 4,
    level: 3,
    levelName: 'Entregar',
    daysClean: 42,
    medalsAchieved: 4,
    isOwn: false,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.headerButton, !hasCommunities && styles.headerButtonDisabled]}
            onPress={() => hasCommunities && navigation.navigate('CreatePost')}
            disabled={!hasCommunities}
          >
            <Feather name="plus" size={22} color={hasCommunities ? colors.text : colors.border} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('MyCommunities')}
          >
            <Feather name="users" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('SocialProfile', { isOwn: true })}
          >
            <View style={styles.profileAvatar}>
              <Feather name="user" size={18} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Foro del día */}
        <TouchableOpacity
          style={styles.forumCard}
          onPress={() => navigation.navigate('DailyForum')}
          activeOpacity={0.9}
        >
          <Text style={styles.forumEmoji}>✏️</Text>
          <View style={styles.forumContent}>
            <Text style={styles.forumTitle}>Foro del día</Text>
            <Text style={styles.forumQuestion}>{DAILY_FORUM.question}</Text>
          </View>
        </TouchableOpacity>

        {/* Posts */}
        {!hasCommunities ? (
          <View style={styles.emptyState}>
            <Feather name="users" size={48} color={colors.border} />
            <Text style={styles.emptyTitle}>Sin publicaciones</Text>
            <Text style={styles.emptySubtitle}>
              No tienes ninguna publicación disponible porque no perteneces a ninguna comunidad.
            </Text>
          </View>
        ) : (
          MOCK_POSTS.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => navigation.navigate('PostDetail', { post })}
              onPressAuthor={() => navigation.navigate('UserProfile', {
                isOwn: false,
                profile: getOtherUserProfile(post),
              })}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonDisabled: {
    opacity: 0.4,
  },
  profileButton: {
    marginLeft: spacing.xs,
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  forumCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  forumEmoji: {
    fontSize: 32,
  },
  forumContent: {
    flex: 1,
  },
  forumTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  forumQuestion: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 18,
  },
  postCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    gap: spacing.sm,
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing.xl * 2,
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});