import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { colors, fontSizes, spacing } from '../../../constants/theme';

const { width } = Dimensions.get('window');

type Props = {
  navigation?: any;
};

export default function SocialScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
        <Text style={styles.subtitle}>Conecta con otros</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/images/mascotacorazon.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.mainText}>Estamos trabajando en esta sección</Text>
        <Text style={styles.subtitleText}>Pronto podrás conectar con la comunidad y compartir tu progreso</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    opacity: 0.6,
  },
  mainText: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});