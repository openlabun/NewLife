import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { getForumDetail, replyForum } from '../../../services/communityService';

type Reply = {
  id: string;
  autor: { id: string; nombre: string };
  contenido: string;
  created_at: string;
  es_mio: boolean;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function ReplyCard({ reply }: { reply: Reply }) {
  return (
    <View style={styles.replyCard}>
      <View style={styles.replyHeader}>
        <View style={styles.replyAvatar}>
          <Feather name="user" size={14} color={colors.textMuted} />
        </View>
        <View style={styles.replyAuthorInfo}>
          <Text style={styles.replyAuthor}>{reply.autor.nombre}</Text>
        </View>
        <Text style={styles.replyTime}>{timeAgo(reply.created_at)}</Text>
      </View>
      <Text style={styles.replyText}>{reply.contenido}</Text>
    </View>
  );
}

export default function ForumDetailScreen({ navigation, route }: any) {
  const { forum, community } = route.params;

  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reflection, setReflection] = useState('');
  const [sending, setSending] = useState(false);

  const canReply = community?.tipo_acceso !== 'SOLO_VER';
  const isToday = forum.isToday;

  const fetchDetail = useCallback(async () => {
    try {
      const data = await getForumDetail(community.id, forum.id);
      setDetail(data);
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Error al cargar el foro.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [community?.id, forum.id]);

  useFocusEffect(
    useCallback(() => { fetchDetail(); }, [fetchDetail])
  );

  const handleSend = async () => {
    if (!reflection.trim()) return;
    setSending(true);
    try {
      await replyForum(community.id, forum.id, reflection.trim());
      setReflection('');
      await fetchDetail();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'No se pudo enviar la respuesta.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const replies: Reply[] = detail?.respuestas || [];
  const forumDate = forum.isToday
    ? 'Foro del día'
    : forum.fecha || new Date(forum.created_at).toLocaleDateString('es-CO');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foros</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchDetail(); }}
            colors={[colors.primary]}
          />
        }
      >
        {/* Card del foro */}
        <View style={styles.forumCard}>
          <Text style={styles.forumEmoji}>✏️</Text>
          <View style={styles.forumContent}>
            <Text style={styles.forumDate}>{forumDate}</Text>
            <Text style={styles.forumQuestion}>{detail?.pregunta || forum.pregunta}</Text>
          </View>
        </View>

        {/* Input reflexión */}
        {canReply && (
          <View style={styles.inputRow}>
            <TextInput
              style={styles.reflectionInput}
              placeholder="Escribir reflexión..."
              placeholderTextColor={colors.textMuted}
              value={reflection}
              onChangeText={setReflection}
            />
            <TouchableOpacity
              style={[styles.sendButton, (!reflection.trim() || sending) && styles.sendButtonDisabled]}
              disabled={!reflection.trim() || sending}
              onPress={handleSend}
            >
              {sending
                ? <ActivityIndicator size="small" color={colors.white} />
                : <Feather name="play" size={18} color={colors.white} />
              }
            </TouchableOpacity>
          </View>
        )}

        {/* Respuestas */}
        {replies.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="message-circle" size={36} color={colors.border} />
            <Text style={styles.emptyText}>Sé el primero en responder</Text>
          </View>
        ) : (
          replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
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
    backgroundColor: colors.background 
  },

  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: spacing.md,
    paddingTop: 60, 
    paddingHorizontal: spacing.xl, 
    paddingBottom: spacing.lg,
  },

  headerTitle: { 
    fontSize: fontSizes.lg, 
    fontWeight: '700', 
    color: colors.text 
  },

  scroll: { 
    paddingHorizontal: spacing.xl, 
    gap: spacing.md, 
    paddingBottom: spacing.xl 
  },

  forumCard: {
    backgroundColor: colors.primary, 
    borderRadius: borderRadius.md,
    padding: spacing.lg, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: spacing.md,
  },

  forumEmoji: { 
    fontSize: 36 
  },

  forumContent: { 
    flex: 1, 
    gap: 4 
  },

  forumDate: { 
    fontSize: fontSizes.sm, 
    fontWeight: '700', 
    color: colors.white 
  },

  forumQuestion: { 
    fontSize: fontSizes.sm, 
    color: 'rgba(255,255,255,0.8)', 
    lineHeight: 18 
  },

  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: spacing.sm 
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
    opacity: 0.4 
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

  replyHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: spacing.sm 
  },

  replyAvatar: {
    width: 32, 
    height: 32, 
    borderRadius: 16,
    backgroundColor: '#F0F0F0', 
    alignItems: 'center', 
    justifyContent: 'center',
  },

  replyAuthorInfo: { 
    flex: 1 
  },

  replyAuthor: { 
    fontSize: fontSizes.sm, 
    fontWeight: '700', 
    color: colors.text 
  },

  replyTime: { 
    fontSize: fontSizes.xs, 
    color: colors.textMuted 
  },

  replyText: { 
    fontSize: fontSizes.sm, 
    color: colors.textLight, 
    lineHeight: 20 
  },

  emptyState: { 
    alignItems: 'center', 
    paddingTop: spacing.xl * 2, 
    gap: spacing.md 
  },

  emptyText: { 
    fontSize: fontSizes.md, 
    color: colors.textMuted 
  },
});