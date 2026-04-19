import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { AnimatedHorizontalBar } from './AnimatedComponents';
import { styles } from '../styles/analysisStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HorizontalBarChart = ({
  data,
  maxWidth = SCREEN_WIDTH - 160,
}: {
  data: Array<{ label: string; value: number; color: string }>;
  maxWidth?: number;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  // ✨ FUNCIÓN PARA DIVIDIR LABELS
  const splitLabel = (label: string) => {
    if (label.includes('Compañeros')) {
      return ['Compañeros', label.replace('Compañeros ', '')];
    }
    return [label, ''];
  };

  return (
    <View style={styles.horizontalBarContainer}>
      {data.map((item, index) => {
        const barWidth = (item.value / maxValue) * maxWidth;
        const [line1, line2] = splitLabel(item.label);

        return (
          <View key={index} style={{ marginBottom: 40, flexDirection: 'row', alignItems: 'flex-start' }}>
            {/* ✨ BARRA */}
            <View style={[styles.horizontalBarRow, { flex: 1, marginRight: 10 }]}>
              <View
                style={[
                  styles.horizontalBar,
                  {
                    backgroundColor: item.color,
                    width: barWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
              >
                <Text style={styles.horizontalBarLabel}>{item.value}%</Text>
              </View>
            </View>

            {/* ✨ LABEL EN 2 LÍNEAS, ALINEADO AL TOP DE LA BARRA */}
            <View style={{ width: 100 }}>
              <Text style={[styles.horizontalBarRightLabel, { marginBottom: 2 }]}>
                {line1}
              </Text>
              {line2 && (
                <Text style={[styles.horizontalBarRightLabel, { marginTop: 15 }]}>
                  {line2}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};