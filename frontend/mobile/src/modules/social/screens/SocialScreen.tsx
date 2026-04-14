import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { width } = Dimensions.get('window');

type Post = {
  id: string;
  author: string;
  authorAvatar?: any;
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
    title: 'Compartiendo mi progreso esta semana',
    body: 'Esta semana logré mantenerme firme en varias situaciones difíciles. Quería compartirlo con la comunidad...',
    image: require('../../../assets/images/contenido1.png'),
    likes: 45,
    comments: 32,
  },
  {
    id: '3',
    author: 'María García',
    community: 'AA Barranquilla',
    timeAgo: '1d',
    title: '¿Cómo manejan el estrés laboral sin recurrir al alcohol?',
    body: 'El trabajo ha estado muy pesado últimamente y siento que necesito estrategias nuevas...',
    likes: 67,
    comments: 89,
  },
];

const hasCommities = USER_COMMUNITIES.length > 0;

function PostCard({ post, onPress }: { post: Post; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.postCard} onPress={onPress} activeOpacity={0.9}>
      {/* Author row */}
      <View style={styles.postHeader}>
        <View style={styles.authorAvatar}>
          <Feather name="user" size={18} color={colors.textMuted} />
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author}</Text>
          <Text style={styles.authorCommunity}>Comunidad: {post.community}</Text>
        </View>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>

      {/* Content */}
      <Text style={styles.postTitle}>{post.title}</Text>
      {!post.image && (
        <Text style={styles.postBody} numberOfLines={3}>{post.body}</Text>
      )}
      {post.image && (
        <Image source={post.image} style={styles.postImage} resizeMode="cover" />
      )}

      {/* Actions */}
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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.headerButton, !hasCommities && styles.headerButtonDisabled]}
            onPress={() => hasCommities && navigation.navigate('CreatePost')}
            disabled={!hasCommities}
          >
            <Feather name="plus" size={20} color={hasCommities ? colors.text : colors.border} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('MyCommunities')}
          >
            <Feather name="users" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('SocialProfile')}
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
          onPress={() => navigation.navigate('ForumOfDay')}
          activeOpacity={0.9}
        >
          <Text style={styles.forumEmoji}>✏️</Text>
          <View style={styles.forumContent}>
            <Text style={styles.forumTitle}>Foro del día</Text>
            <Text style={styles.forumQuestion}>
              ¿Qué podrías hacer solo por hoy para cuidarte y mantener tu paz interior?
            </Text>
          </View>
        </TouchableOpacity>

        {/* Posts */}
        {!hasCommities ? (
          <View style={styles.emptyState}>
            <Feather name="users" size={48} color={colors.border} />
            <Text style={styles.emptyTitle}>Sin publicaciones disponibles</Text>
            <Text style={styles.emptySubtitle}>
              No perteneces a ninguna comunidad. Únete a una para ver publicaciones.
            </Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate('MyCommunities')}
            >
              <Text style={styles.joinButtonText}>Ver comunidades</Text>
            </TouchableOpacity>
          </View>
        ) : (
          MOCK_POSTS.map((post) => (
            <PostCard
              key={post.id}
              post={post}
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
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  headerButtonDisabled: {
    opacity: 0.4,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: spacing.xl,
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
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  forumQuestion: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 20,
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
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
  },
  authorCommunity: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  timeAgo: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  postTitle: {
    fontSize: fontSizes.md,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 22,
  },
  postBody: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    lineHeight: 22,
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
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
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
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  joinButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  joinButtonText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
});