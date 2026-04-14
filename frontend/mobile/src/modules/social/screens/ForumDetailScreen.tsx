import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Reply = {
  id: string;
  author: string;
  community: string;
  timeAgo: string;
  text: string;
  likes: number;
  comments: number;
  replies?: Reply[];
};

const MOCK_REPLIES: Reply[] = [
  {
    id: '1',
    author: '@Rodi',
    community: 'Sobriedad en pareja',
    timeAgo: '3d',
    text: 'Hace unas semanas le conté a mi novia que estoy dejando el alcohol. Me da miedo que no entienda del todo lo importante que es esto para mí...',
    likes: 100,
    comments: 120,
    replies: [
      {
        id: '1-1',
        author: '@Rodi',
        community: '',
        timeAgo: '2d',
        text: 'Te entiendo totalmente, bro. A mí me pasó igual con mi pareja. Al principio no comprendía que para mí "una copa" podía ser una recaída. Lo...',
        likes: 0,
        comments: 0,
      },
      {
        id: '1-2',
        author: '@Rodi',
        community: '',
        timeAgo: '2d',
        text: 'Te entiendo totalmente, bro. A mí me pasó igual con mi pareja. Al principio no comprendía que para mí "una copa" podía ser una recaída. Lo...',
        likes: 0,
        comments: 0,
      },
    ],
  },
  {
    id: '2',
    author: '@Carlos',
    community: 'AA Barranquilla',
    timeAgo: '2d',
    text: 'Hoy me propuse dar una caminata de 20 minutos antes del trabajo. Fue el mejor comienzo de día que he tenido en semanas.',
    likes: 45,
    comments: 8,
    replies: [],
  },
];

function ReplyCard({ reply, isNested = false }: { reply: Reply; isNested?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <View style={[styles.replyCard, isNested && styles.replyCardNested]}>
      <View style={styles.replyHeader}>
        <View style={styles.replyAvatar}>
          <Feather name="user" size={14} color={colors.textMuted} />
        </View>
        <View style={styles.replyAuthorInfo}>
          <Text style={styles.replyAuthor}>{reply.author}</Text>
          {reply.community ? (
            <Text style={styles.replyCommunity}>{reply.community}</Text>
          ) : null}
        </View>
        <Text style={styles.replyTime}>{reply.timeAgo}</Text>
      </View>

      <Text style={styles.replyText}>{reply.text}</Text>

      {!isNested && (
        <View style={styles.replyActions}>
          <TouchableOpacity style={styles.replyAction} onPress={() => setLiked(!liked)}>
            <Feather name="heart" size={16} color={liked ? '#FF6B6B' : colors.textMuted} />
            <Text style={styles.replyActionText}>{reply.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.replyAction}
            onPress={() => setShowReplies(!showReplies)}
          >
            <Feather name="message-circle" size={16} color={colors.textMuted} />
            <Text style={styles.replyActionText}>{reply.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.replyAction, { marginLeft: 'auto' }]}>
            <Feather name="share" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}

      {/* Respuestas anidadas */}
      {showReplies && reply.replies && reply.replies.length > 0 && (
        <View style={styles.nestedReplies}>
          {reply.replies.map((r) => (
            <ReplyCard key={r.id} reply={r} isNested />
          ))}
        </View>
      )}
    </View>
  );
}

export default function ForumDetailScreen({ navigation, route }: any) {
  const { forum } = route.params;
  const [reflection, setReflection] = useState('');
  const isToday = forum.isToday;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foros</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Card del foro */}
        <View style={styles.forumCard}>
          <Text style={styles.forumEmoji}>✏️</Text>
          <View style={styles.forumContent}>
            <Text style={styles.forumDate}>{forum.date}</Text>
            <Text style={styles.forumQuestion}>{forum.question}</Text>
          </View>
        </View>

        {/* Input reflexión — solo foro del día */}
        {isToday && (
          <View style={styles.inputRow}>
            <TextInput
              style={styles.reflectionInput}
              placeholder="Escribir reflexión..."
              placeholderTextColor={colors.textMuted}
              value={reflection}
              onChangeText={setReflection}
            />
            <TouchableOpacity
              style={[styles.sendButton, !reflection.trim() && styles.sendButtonDisabled]}
              disabled={!reflection.trim()}
            >
              <Feather name="play" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}

        {/* Respuestas */}
        {MOCK_REPLIES.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
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
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  forumCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  forumEmoji: { fontSize: 36 },
  forumContent: { flex: 1, gap: 4 },
  forumDate: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.white,
  },
  forumQuestion: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reflectionInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  replyCard: {
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
  replyCardNested: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    borderRadius: 0,
    paddingLeft: spacing.md,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyAuthorInfo: { flex: 1 },
  replyAuthor: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
  },
  replyCommunity: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  replyTime: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  replyText: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    lineHeight: 20,
  },
  replyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginTop: spacing.xs,
  },
  replyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  replyActionText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  nestedReplies: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
});