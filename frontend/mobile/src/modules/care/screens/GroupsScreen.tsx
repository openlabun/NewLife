import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Group = {
  id: string;
  name: string;
  type: string;
  address: string;
  link?: string;
  linkLabel?: string;
  isFoundation?: boolean;
};

const GROUPS: Group[] = [
  {
    id: '1',
    name: 'Fund. Shalom',
    type: 'Programa de acompañamiento',
    address: 'Cra 66 # 81 - 77',
    link: 'https://fundacionshalom.org',
    linkLabel: 'Ir al sitio web',
    isFoundation: true,
  },
  {
    id: '2',
    name: 'AA Barranquilla',
    type: 'Grupo presencial',
    address: 'Parroquia 3 avemarías',
    link: 'https://maps.google.com',
    linkLabel: 'Ver reuniones cercanas',
  },
  {
    id: '3',
    name: 'Jóvenes AA',
    type: 'Grupo virtual',
    address: '@grupojovens_AA',
    link: 'https://discord.com',
    linkLabel: 'Unirme en Discord',
  },
];

export default function GroupsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = GROUPS.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Fundaciones y grupos</Text>
          <Text style={styles.headerSubtitle}>Listado sugerido por la app.</Text>
        </View>
      </View>

      {/* Búsqueda */}
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
        {filtered.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupAvatar}>
              {group.isFoundation ? (
                <View style={styles.foundationIcon}>
                  <View style={styles.foundationRing} />
                  <View style={[styles.foundationRing, styles.foundationRingInner]} />
                </View>
              ) : (
                <Feather name="user" size={24} color={colors.textMuted} />
              )}
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupType}>{group.type}</Text>
              <Text style={styles.groupAddress}>{group.address}</Text>
              {group.link && (
                <TouchableOpacity onPress={() => Linking.openURL(group.link!)}>
                  <Text style={styles.groupLink}>{group.linkLabel}</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.groupActions}>
              <TouchableOpacity
                style={styles.groupActionButton}
                onPress={() => Linking.openURL('tel:+573001234567')}
              >
                <Feather name="phone" size={16} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.groupActionButton}>
                <Feather name="message-circle" size={16} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
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
    color: colors.text,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  groupCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  groupAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foundationIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  foundationRing: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: '#4CAF50',
    position: 'absolute',
  },
  foundationRingInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  groupInfo: {
    flex: 1,
    gap: 2,
  },
  groupName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  groupType: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  groupAddress: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  groupLink: {
    fontSize: fontSizes.sm,
    color: colors.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  groupActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  groupActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});