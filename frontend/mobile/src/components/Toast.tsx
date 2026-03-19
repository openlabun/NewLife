import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export type ToastType = 'error' | 'success' | 'warning';

type ToastProps = {
  visible: boolean;
  type: ToastType;
  title: string;
  message: string;
  onHide: () => void;
  duration?: number;
};

const COLORS = {
  error:   { bg: '#404040', progress: 'rgba(255,255,255,0.35)' },
  success: { bg: '#C37A49', progress: 'rgba(255,255,255,0.35)' },
  warning: { bg: '#5F5E5A', progress: 'rgba(255,255,255,0.35)' },
};

const ICONS = {
  error:   '!',
  success: '✓',
  warning: '!',
};

export default function Toast({
  visible, type, title, message, onHide, duration = 3500,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(120)).current;
  const progressWidth = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      // Resetear progreso
      progressWidth.setValue(1);

      // Animar entrada
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 10,
      }).start();

      // Animar barra de progreso
      Animated.timing(progressWidth, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start();

      // Auto ocultar
      timerRef.current = setTimeout(() => hide(), duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  const hide = () => {
    Animated.timing(translateY, {
      toValue: 120,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onHide());
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (!visible) return null;

  const colors = COLORS[type];

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.bg, transform: [{ translateY }] },
      ]}
    >
      {/* Ícono */}
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{ICONS[type]}</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      {/* Cerrar */}
      <TouchableOpacity onPress={hide} style={styles.closeBtn}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* Barra de progreso */}
      <Animated.View
        style={[
          styles.progressBar,
          {
            backgroundColor: colors.progress,
            width: progressWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    zIndex: 9999,
    elevation: 10,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  iconText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  message: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    lineHeight: 17,
  },
  closeBtn: {
    paddingHorizontal: 4,
    flexShrink: 0,
  },
  closeText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
    lineHeight: 20,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});