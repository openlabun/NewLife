import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  type SharedValue,
} from 'react-native-reanimated';
import { AnimatedPieSlice } from './AnimatedComponents';
import { styles } from '../styles/analysisStyles';

export const PieChart = ({
  data,
  size = 220,
  tooltipLabel = '',
  tooltipValue = '',
}: {
  data: Array<{ label: string; value: number; color: string; porcentaje?: number }>;
  size?: number;
  tooltipLabel?: string;
  tooltipValue?: string;
}) => {
  const animationProgress = useSharedValue(0);
  const radius = size / 2;
  const center = size / 2;

  useEffect(() => {
    animationProgress.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...item, startAngle, angle, index };
  });

  return (
    <View style={styles.pieContainer}>
      <Svg width={size} height={size}>
        <G>
          {slices.map((slice) => (
            <AnimatedPieSlice
              key={slice.index}
              slice={slice}
              radius={radius}
              center={center}
              progress={animationProgress}
            />
          ))}
        </G>
      </Svg>
      {tooltipValue && (
        <View style={styles.pieTooltip}>
          <Text style={styles.pieTooltipText}>
            {tooltipLabel}: {tooltipValue}%
          </Text>
        </View>
      )}
    </View>
  );
};

export const PieLegend = ({
  data,
}: {
  data: Array<{ label: string; value: number; color: string; porcentaje?: number }>;
}) => {
  const rows = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }

  return (
    <View style={styles.legendContainer}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.legendRow}>
          {row.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.label} ({item.porcentaje || item.value}%)
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};