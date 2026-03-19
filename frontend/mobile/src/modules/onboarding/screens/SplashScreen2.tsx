import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { colors, spacing } from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOnboardingStatus } from '../../../services/authService';
import { isGuestMode, getGuestOnboardingStatus, isGuestTourCompleted } from '../../../services/guestService';

export default function SplashScreen2({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        // ── Caso 1: usuario registrado ──────────────────────────────
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
          try {
            const status = await getOnboardingStatus();
            if (!status.completed) {
              navigation.replace('Story');
              return;
            }
            const email = await AsyncStorage.getItem('userEmail');
            const tourCompleted = await AsyncStorage.getItem(`tourCompleted_${email}`);
            navigation.replace(tourCompleted === 'true' ? 'Home' : 'AppTour');
          } catch {
            navigation.replace('Home');
          }
          return;
        }

        // ── Caso 2: invitado ────────────────────────────────────────
        const guest = await isGuestMode();
        if (guest) {
          const status = await getGuestOnboardingStatus();
          if (!status.completed) {
            navigation.replace('Story');
            return;
          }
          const tourCompleted = await isGuestTourCompleted();
          navigation.replace(tourCompleted ? 'Home' : 'AppTour');
          return;
        }

        // ── Caso 3: sin sesión ──────────────────────────────────────
        const onboardingShown = await AsyncStorage.getItem('onboardingShown');
        navigation.replace(onboardingShown === 'true' ? 'Welcome' : 'Onboarding');

      } catch {
        navigation.replace('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.character}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/logosplash2.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  character: {
    width: 130,
    height: 130,
  },
  logo: {
    width: 120,
    height: 45,
  },
});