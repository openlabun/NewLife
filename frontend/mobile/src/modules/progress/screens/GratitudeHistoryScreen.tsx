import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const GRATITUDE_ENTRIES = [
  { id: '1', date: '5 oct 2025', text: 'Agradezco que salí con mis amigos sin tomar.' },
  { id: '2', date: '4 oct 2025', text: 'Dormí bien por primera vez en días.' },
  { id: '3', date: '3 oct 2025', text: 'Mi mamá me apoyó cuando me sentía mal.' },
  { id: '4', date: '3 oct 2025', text: 'Agradezco por tener la oportunidad de empezar de nuevo.' },
  { id: '5', date: '3 oct 2025', text: 'Agradezco por sentirme acompañado en este proceso.' },
  { id: '6', date: '3 oct 2025', text: 'Agradezco por las cosas que salieron bien hoy.' },
  { id: '7', date: '3 oct 2025', text: 'Agradezco por haber podido ayudar a alguien.' },
  { id: '8', date: '3 oct 2025', text: 'Agradezco por sentirme más tranquilo que antes.' },
  { id: '9', date: '3 oct 2025', text: 'Agradezco por el clima de hoy.' },
  { id: '10', date: '3 oct 2025', text: 'Agradezco por las risas en medio del caos.' },
];

export default function GratitudeHistoryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Historial de gratitud</Text>
          <Text style={styles.headerSubtitle}>Tu registro de gratitud</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {GRATITUDE_ENTRIES.map((entry) => (
          <View key={entry.id} style={styles.card}>
            <Text style={styles.date}>{entry.date}</Text>
            <Text style={styles.text}>{entry.text}</Text>
          </View>
        ))}
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
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  date: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  text: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 20,
  },
});