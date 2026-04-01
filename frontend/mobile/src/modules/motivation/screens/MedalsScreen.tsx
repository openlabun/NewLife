import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const MEDALS = [
  { id: '1', title: 'Primera semana sin alcohol', emoji: '🏅' },
  { id: '2', title: 'Primera semana sin alcohol', emoji: '🏅' },
  { id: '3', title: 'Primera semana sin alcohol', emoji: '🏅' },
  { id: '4', title: 'Primera semana sin alcohol', emoji: '🏅' },
];

export default function MedalsScreen({ navigation }: any) {
  const handleShare = async () => {
    await Share.share({ message: '¡He logrado mis primeras medallas en New Life! 🏅' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Tus medallas</Text>
          <Text style={styles.headerSubtitle}>Mira como haz avanzado</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Feather name="share" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {MEDALS.map((medal) => (
          <View key={medal.id} style={styles.medalCard}>
            <Text style={styles.medalEmoji}>{medal.emoji}</Text>
            <Text style={styles.medalTitle}>{medal.title}</Text>
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
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  medalCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  medalEmoji: {
    fontSize: 48,
  },
  medalTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
});