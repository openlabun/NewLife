import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Community = {
  id: string;
  name: string;
  description: string;
  emoji: string;
};

const MY_COMMUNITIES: Community[] = [
  { id: '1', name: 'AA Barranquilla', description: 'Un espacio para fortalecer tu disciplina y mantener el rumbo...', emoji: '🪴' },
  { id: '2', name: 'Fundacion Shalom', description: 'Un espacio para fortalecer tu disciplina y mantener el rumbo...', emoji: '🐱' },
  { id: '3', name: 'AA Medellín', description: 'Un espacio para fortalecer tu disciplina y mantener el rumbo...', emoji: '🍊' },
];

export default function MyCommunitiesScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = MY_COMMUNITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
        {filtered.map((community) => (
          <TouchableOpacity
            key={community.id}
            style={styles.communityCard}
            onPress={() => navigation.navigate('CommunityDetail', { community })}
            activeOpacity={0.9}
          >
            <View style={styles.communityAvatar}>
              <Text style={styles.communityEmoji}>{community.emoji}</Text>
            </View>
            <View style={styles.communityInfo}>
              <Text style={styles.communityName}>{community.name}</Text>
              <Text style={styles.communityDescription} numberOfLines={2}>
                {community.description}
              </Text>
            </View>
          </TouchableOpacity>
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
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
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
  communityEmoji: { fontSize: 28 },
  communityInfo: { flex: 1 },
  communityName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  communityDescription: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 18,
  },
});