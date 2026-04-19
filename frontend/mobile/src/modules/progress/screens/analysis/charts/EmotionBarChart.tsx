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

  // ✨ FILTRAR: solo emociones con value > 0
  const activeEmotions = data.filter(item => item.value > 0);

  // ✨ Encontrar el valor máximo
  const maxValue = Math.max(...activeEmotions.map(e => e.value));

  return (
    <View style={styles.emotionBarContainer}>
      {activeEmotions.map((item, index) => {
        // ✨ Altura proporcional: máximo = 100% del maxHeight disponible
        const barHeight = (item.value / maxValue) * maxHeight;

        return (
          <View key={index} style={styles.emotionBarWrapper}>
            {/* ✨ BARRA GRIS DE FONDO */}
            <View style={[styles.emotionBarBackground, { height: barHeight }]}>
              
              {/* ✨ BARRA COLOREADA */}
              <AnimatedEmotionBar
                progress={animationProgress}
                height={barHeight}
                color={getEmotionColor(item.label)}
                inactive={!item.active}
                maxHeight={barHeight}
              />
              
              {/* ✨ PORCENTAJE DENTRO DE LA BARRA */}
              {item.value > 0 && (
                <Text style={styles.emotionPercentageLabel}>
                  {item.value}%
                </Text>
              )}
            </View>
            <Text style={styles.emotionLabel}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};