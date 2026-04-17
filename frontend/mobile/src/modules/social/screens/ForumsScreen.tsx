import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { getForums } from '../../../services/communityService';

type Forum = {
  id: string;
  pregunta: string;
  descripcion?: string;
  fecha?: string;
  created_at: string;
  total_respuestas: number;
  comunidad_id: string;
  comunidad_nombre?: string;
  isToday: boolean;
};

export default function ForumsScreen({ navigation, route }: any) {
  const { communities = [], initialForum } = route.params || {};

  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchForums = useCallback(async () => {
    try {
      const results = await Promise.all(
        communities.map((c: any) =>
          getForums(c.id)
            .then((fs: any[]) => fs.map(f => ({
              ...f,
              comunidad_id:     c.id,
              comunidad_nombre: c.nombre,
            })))
            .catch(() => [])
        )
      );

      const today = new Date().toISOString().split('T')[0];
      const flat = results
        .flat()
        .map(f => ({
          ...f,
          isToday: f.fecha === today || f.created_at?.startsWith(today),
        }))
        .sort((a, b) => {
          // Los de hoy primero, luego por fecha descendente
          if (a.isToday && !b.isToday) return -1;
          if (!a.isToday && b.isToday) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

      setForums(flat);
    } catch (err) {
      console.log('Error cargando foros:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [communities]);

  useFocusEffect(
    useCallback(() => { fetchForums(); }, [fetchForums])
  );

  const formatDate = (forum: Forum) => {
    if (forum.isToday) return 'Foro del día';
    if (forum.fecha) return forum.fecha;
    return new Date(forum.created_at).toLocaleDateString('es-CO');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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
            onRefresh={() => { setRefreshing(true); fetchForums(); }}
            colors={[colors.primary]}
          />
        }
      >
        {forums.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="edit" size={40} color={colors.border} />
            <Text style={styles.emptyText}>No hay foros disponibles</Text>
          </View>
        ) : (
          forums.map((forum) => (
            <TouchableOpacity
              key={`${forum.comunidad_id}-${forum.id}`}
              style={[styles.forumCard, forum.isToday && styles.forumCardToday]}
              onPress={() => navigation.navigate('ForumDetail', {
                forum,
                community: communities.find((c: any) => c.id === forum.comunidad_id),
              })}
              activeOpacity={0.9}
            >
              <Text style={styles.forumEmoji}>✏️</Text>
              <View style={styles.forumContent}>
                <View style={styles.forumMeta}>
                  <Text style={[styles.forumDate, forum.isToday && styles.forumDateToday]}>
                    {formatDate(forum)}
                  </Text>
                  {forum.comunidad_nombre && (
                    <Text style={[styles.forumCommunity, forum.isToday && styles.forumCommunityToday]}>
                      {forum.comunidad_nombre}
                    </Text>
                  )}
                </View>
                <Text style={[styles.forumQuestion, forum.isToday && styles.forumQuestionToday]}>
                  {forum.pregunta}
                </Text>
                {forum.total_respuestas > 0 && (
                  <Text style={[styles.forumReplies, forum.isToday && styles.forumRepliesToday]}>
                    {forum.total_respuestas} respuesta{forum.total_respuestas !== 1 ? 's' : ''}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
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

  forumCardToday: { 
    backgroundColor: colors.primary 
  },

  forumEmoji: { 
    fontSize: 36 
  },

  forumContent: { 
    flex: 1, 
    gap: 4 
  },

  forumMeta: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },

  forumDate: { 
    fontSize: fontSizes.sm, 
    fontWeight: '700', 
    color: colors.text 
  },

  forumDateToday: { 
    color: colors.white 
  },

  forumCommunity: { 
    fontSize: fontSizes.xs, 
    color: colors.textMuted 
  },

  forumCommunityToday: { 
    color: 'rgba(255,255,255,0.7)' 
  },

  forumQuestion: { 
    fontSize: fontSizes.sm, 
    color: colors.textMuted, 
    lineHeight: 18 
  },

  forumQuestionToday: { 
    color: 'rgba(255,255,255,0.8)' 
  },

  forumReplies: { 
    fontSize: fontSizes.xs, 
    color: colors.textMuted, 
    marginTop: 2 
  },

  forumRepliesToday: { 
    color: 'rgba(255,255,255,0.7)' 
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