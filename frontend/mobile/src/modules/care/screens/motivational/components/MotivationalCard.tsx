import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;

export interface MotivationalCardProps {
  id: string;
  text: string;
  image: any;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShare?: (text: string) => void;
}

export default function MotivationalCard({
  id,
  text,
  image,
  isFavorite,
  onToggleFavorite,
  onShare,
}: MotivationalCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // ✅ Animación de like
  const animateLike = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleToggleFavorite = () => {
    animateLike();
    onToggleFavorite(id);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${text}" - NewLife 🌱`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardText}>{text}</Text>
        <View style={styles.cardActions}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleToggleFavorite}
            >
              <Feather
                name={isFavorite ? 'heart' : 'heart'}
                size={18}
                color={isFavorite ? '#FF6B6B' : colors.white}
                fill={isFavorite ? '#FF6B6B' : 'none'}
              />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Feather name="share-2" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardText: {
    fontSize: fontSizes.sm,
    color: colors.white,
    fontWeight: '600',
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});