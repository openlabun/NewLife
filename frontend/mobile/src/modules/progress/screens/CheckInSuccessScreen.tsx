import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');

export default function CheckInSuccessScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color={colors.white} />
      </TouchableOpacity>

      <Image
        source={require('../../../assets/images/congratulations.jpg')}
        style={styles.background}
        resizeMode="cover"
      />

      <Text style={styles.title}>¡Todo está listo!</Text>
      <Text style={styles.subtitle}>Gracias por darte este momento.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
    position: 'absolute',
    width,
    height,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: spacing.xl,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginTop: height * 0.12,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 48,
    width: width - spacing.xl * 2,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: '#F5A623',
  },
});