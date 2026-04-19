import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  type SharedValue,
} from 'react-native-reanimated';
import { AnimatedEmotionBar } from './AnimatedComponents';
import { getEmotionColor } from '../utils/emotionColorMap';
import { styles } from '../styles/analysisStyles';

export const EmotionBarChart = ({
  data,
  maxHeight = 160,
}: {
  data: Array<{ label: string; value: number; active: boolean }>;
  maxHeight?: number;
}) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  // Escalar al 100, no al máximo real
  const MAX_SCALE = 100;

  return (
    <View style={styles.emotionBarContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.emotionBarWrapper}>
          <View style={[styles.emotionBarBackground, { height: maxHeight }]}>
            <AnimatedEmotionBar
              progress={animationProgress}
              height={(item.value / MAX_SCALE) * maxHeight}
              color={getEmotionColor(item.label)}
              inactive={!item.active}
              maxHeight={maxHeight}
            />
            {/* ✨ MOSTRAR PORCENTAJE DENTRO DE LA BARRA */}
            {item.value > 0 && (
              <Text style={styles.emotionPercentageLabel}>
                {item.value}%
              </Text>
            )}
          </View>
          <Text style={styles.emotionLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};