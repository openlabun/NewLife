import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const COMMUNITY_EMOJIS = ['🌸', '🌼', '🌻', '🌷', '🌺', '🪻', '🌹'];

export default function MyCommunitiesScreen({ navigation, route }: any) {
  const { communities = [] } = route.params || {};
  const [search, setSearch] = useState('');

  const filtered = communities.filter((c: any) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Emoji consistente por comunidad basado en su id
  const getEmoji = (id: string) => {
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return COMMUNITY_EMOJIS[index % COMMUNITY_EMOJIS.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis comunidades</Text>
      </View>

      <View style={styles.searchWrapper}>
        <Feather name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="users" size={40} color={colors.border} />
            <Text style={styles.emptyText}>
              {search ? 'No se encontraron comunidades' : 'No perteneces a ninguna comunidad'}
            </Text>
          </View>
        ) : (
          filtered.map((community: any) => (
            <TouchableOpacity
              key={community.id}
              style={styles.communityCard}
              onPress={() => navigation.navigate('CommunityDetail', { community })}
              activeOpacity={0.9}
            >
              <View style={styles.communityAvatar}>
                <Text style={styles.communityEmoji}>{getEmoji(community.id)}</Text>
              </View>
              <View style={styles.communityInfo}>
                <View style={styles.communityNameRow}>
                  <Text style={styles.communityName}>{community.nombre}</Text>
                  {community.es_moderador && (
                    <View style={styles.modBadge}>
                      <Text style={styles.modBadgeText}>Mod</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.communityDescription} numberOfLines={2}>
                  {community.descripcion || 'Comunidad de apoyo y recuperación.'}
                </Text>
                <Text style={styles.communityAccess}>
                  {community.tipo_acceso === 'SOLO_VER'
                    ? '👁 Solo lectura'
                    : community.tipo_acceso === 'POSTEAR_COMENTAR'
                      ? '✏️ Puede publicar'
                      : '💬 Acceso completo'}
                </Text>
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

  searchInput: { 
    flex: 1, 
    fontSize: fontSizes.md, 
    color: colors.text 
  },

  scroll: { 
    paddingHorizontal: spacing.xl, 
    gap: spacing.md 
  },

  communityCard: {
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

  communityAvatar: {
    width: 56, 
    height: 56, 
    borderRadius: 28,
    backgroundColor: '#F0F0F0', 
    alignItems: 'center', 
    justifyContent: 'center',
  },

  communityEmoji: { 
    fontSize: 28 
  },

  communityInfo: { 
    flex: 1 
  },

  communityNameRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: spacing.sm, 
    marginBottom: 4 
  },

  communityName: { 
    fontSize: fontSizes.md, 
    fontWeight: '700', 
    color: colors.text 
  },

  communityDescription: { 
    fontSize: fontSizes.sm, 
    color: colors.textMuted, 
    lineHeight: 18 
  },

  communityAccess: { 
    fontSize: fontSizes.xs, 
    color: colors.textMuted, 
    marginTop: 4 
  },

  modBadge: {
    backgroundColor: '#d4854a20', 
    borderRadius: 6,
    paddingHorizontal: 6, 
    paddingVertical: 2,
  },

  modBadgeText: { 
    fontSize: 10, 
    color: '#c07842', 
    fontWeight: '600' 
  },

  emptyState: { 
    alignItems: 'center', 
    paddingTop: spacing.xl * 2, 
    gap: spacing.md 
  },

  emptyText: { 
    fontSize: fontSizes.md, 
    color: colors.textMuted, 
    textAlign: 'center' 
  },
});