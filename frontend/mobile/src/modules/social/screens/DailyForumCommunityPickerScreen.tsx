import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const COMMUNITY_EMOJIS = ['🪴', '🐱', '🍊', '💙', '🌱', '🤝', '🌻', '🦋'];

const getEmoji = (id: string) => {
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COMMUNITY_EMOJIS[index % COMMUNITY_EMOJIS.length];
};

export default function DailyForumCommunityPickerScreen({ navigation, route }: any) {
  const { foro, communities = [] } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foro del día</Text>
      </View>

      {/* Card del foro */}
      <View style={styles.forumCard}>
        <Text style={styles.forumEmoji}>✏️</Text>
        <View style={styles.forumContent}>
          <Text style={styles.forumLabel}>
            {foro?.es_hoy ? 'Hoy' : foro?.fecha || ''}
          </Text>
          <Text style={styles.forumQuestion}>{foro?.pregunta}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        ¿En cuál comunidad quieres participar?
      </Text>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {communities.map((community: any) => (
          <TouchableOpacity
            key={community.id}
            style={styles.communityCard}
            onPress={() => navigation.navigate('DailyForumDetail', { foro, community })}
            activeOpacity={0.9}
          >
            <View style={styles.communityAvatar}>
              <Text style={styles.communityEmoji}>{getEmoji(community.id)}</Text>
            </View>
            <View style={styles.communityInfo}>
              <Text style={styles.communityName}>{community.nombre}</Text>
              <Text style={styles.communityAccess}>
                {community.tipo_acceso === 'SOLO_VER'
                  ? '👁 Solo lectura'
                  : community.tipo_acceso === 'POSTEAR_COMENTAR'
                  ? '✏️ Puede responder'
                  : '💬 Acceso completo'}
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingTop: 60, paddingHorizontal: spacing.xl, paddingBottom: spacing.lg,
  },
  headerTitle:  { fontSize: fontSizes.lg, fontWeight: '700', color: colors.text },
  forumCard: {
    backgroundColor: colors.primary, marginHorizontal: spacing.xl,
    marginBottom: spacing.lg, borderRadius: borderRadius.md,
    padding: spacing.lg, flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
  },
  forumEmoji:   { fontSize: 28 },
  forumContent: { flex: 1, gap: 4 },
  forumLabel: {
    fontSize: fontSizes.xs, fontWeight: '700',
    color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1,
  },
  forumQuestion: { fontSize: fontSizes.md, fontWeight: '700', color: colors.white, lineHeight: 22 },
  sectionTitle: {
    fontSize: fontSizes.sm, fontWeight: '600', color: colors.textMuted,
    paddingHorizontal: spacing.xl, marginBottom: spacing.sm,
  },
  scroll:        { paddingHorizontal: spacing.xl, gap: spacing.md },
  communityCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.lg,
    flexDirection: 'row', alignItems: 'center', gap: spacing.md, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4,
  },
  communityAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center',
  },
  communityEmoji:  { fontSize: 24 },
  communityInfo:   { flex: 1 },
  communityName:   { fontSize: fontSizes.md, fontWeight: '700', color: colors.text },
  communityAccess: { fontSize: fontSizes.xs, color: colors.textMuted, marginTop: 2 },
});