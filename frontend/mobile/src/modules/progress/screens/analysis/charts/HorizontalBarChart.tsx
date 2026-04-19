import React from 'react';
import { View, Dimensions, Text } from 'react-native';
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

  return (
    <View style={styles.horizontalBarContainer}>
      {data.map((item, index) => {
        const barWidth = (item.value / maxValue) * maxWidth;

        return (
          <View key={index}>
            {/* Barra con ancho proporcional (a la IZQUIERDA) */}
            <View
              style={[
                styles.horizontalBarRow,
                {
                  marginBottom: 8,
                },
              ]}
            >
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

            {/* Label FUERA, pegado a la derecha de la pantalla */}
            <Text style={styles.horizontalBarRightLabel}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};