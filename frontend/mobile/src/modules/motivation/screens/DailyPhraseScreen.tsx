import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const DAILY_PHRASE = {
  id: '1',
  text: 'No necesitas alcohol para calmarte, tu fuerza está contigo.',
  image: require('../../../assets/images/phrase1.png'),
  liked: false,
};

const SAVED_PHRASES = [
  { id: '1', text: 'No necesitas alcohol para calmarte, tu fuerza está contigo.', image: require('../../../assets/images/phrase1.png'), liked: true },
  { id: '2', text: 'Permite la quietud, más cerca estás de ti.', image: require('../../../assets/images/phrase2.png'), liked: true },
  { id: '3', text: 'Cada día sobrio es una victoria que merece celebrarse.', image: require('../../../assets/images/phrase3.png'), liked: true },
  { id: '4', text: 'Tu cuerpo y mente te agradecen cada decisión consciente.', image: require('../../../assets/images/phrase4.png'), liked: true },
];

type Phrase = typeof SAVED_PHRASES[0];

function PhraseCard({ phrase, onToggleLike }: { phrase: Phrase; onToggleLike: (id: string) => void }) {
  const handleShare = async () => {
    await Share.share({ message: phrase.text });
  };

  return (
    <View style={styles.card}>
      <Image source={phrase.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardText}>{phrase.text}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={handleShare}>
            <Feather name="share" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onToggleLike(phrase.id)}>
            <Feather
              name="heart"
              size={20}
              color={phrase.liked ? '#FF6B6B' : colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function DailyPhraseScreen({ navigation }: any) {
  const [saved, setSaved] = useState(SAVED_PHRASES);

  const toggleLike = (id: string) => {
    setSaved(saved.map((p) => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Tu frase del día</Text>
          <Text style={styles.headerSubtitle}>Lee, respira y reflexiona.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Frase del día */}
        <PhraseCard phrase={DAILY_PHRASE} onToggleLike={() => {}} />

        {/* Frases guardadas */}
        <Text style={styles.savedTitle}>Frases guardadas</Text>
        {saved.map((phrase) => (
          <PhraseCard key={phrase.id} phrase={phrase} onToggleLike={toggleLike} />
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
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  card: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardOverlay: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardText: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedTitle: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
});