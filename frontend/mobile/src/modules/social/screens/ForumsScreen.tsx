import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Forum = {
  id: string;
  date: string;
  question: string;
  isToday: boolean;
};

const FORUMS: Forum[] = [
  { id: '1', date: 'Foro del día', question: '¿Qué podrías hacer solo por hoy para cuidarte y mantener tu paz interior?', isToday: true },
  { id: '2', date: '20/10/2025', question: '¿Qué hábito pequeño ha transformado tu vida de manera inesperada?', isToday: false },
  { id: '3', date: '19/10/2025', question: '¿Qué hábito saludable puedes elegir hoy en lugar del viejo patrón?', isToday: false },
  { id: '4', date: '18/10/2025', question: '¿Qué te hubiera gustado entender antes sobre ti mismo?', isToday: false },
  { id: '5', date: '17/10/2025', question: '¿Qué límite podrías poner hoy para proteger tu tranquilidad emocional?', isToday: false },
  { id: '6', date: '20/10/2025', question: '¿Qué emoción te cuesta más expresar y qué la hace tan difícil?', isToday: false },
];

export default function ForumsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Foros</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {FORUMS.map((forum) => (
          <TouchableOpacity
            key={forum.id}
            style={[styles.forumCard, forum.isToday && styles.forumCardToday]}
            onPress={() => navigation.navigate('ForumDetail', { forum })}
            activeOpacity={0.9}
          >
            <Text style={styles.forumEmoji}>✏️</Text>
            <View style={styles.forumContent}>
              <Text style={[styles.forumDate, forum.isToday && styles.forumDateToday]}>
                {forum.date}
              </Text>
              <Text style={[styles.forumQuestion, forum.isToday && styles.forumQuestionToday]}>
                {forum.question}
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
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xl,
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
    backgroundColor: colors.primary,
  },
  forumEmoji: {
    fontSize: 36,
  },
  forumContent: {
    flex: 1,
    gap: 4,
  },
  forumDate: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
  },
  forumDateToday: {
    color: colors.white,
  },
  forumQuestion: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 18,
  },
  forumQuestionToday: {
    color: 'rgba(255,255,255,0.8)',
  },
});