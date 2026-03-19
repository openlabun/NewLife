import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOnboardingStatus } from '../services/authService';
import {
  isGuestMode,
  getGuestOnboardingStatus,
  isGuestTourCompleted,
} from '../services/guestService';
import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // ── Caso 1: usuario registrado ──────────────────────────────
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
          try {
            const status = await getOnboardingStatus();
            if (!status.completed) {
              setInitialRoute('Story');
              return;
            }
            const email = await AsyncStorage.getItem('userEmail');
            const tourCompleted = await AsyncStorage.getItem(`tourCompleted_${email}`);
            setInitialRoute(tourCompleted === 'true' ? 'Home' : 'AppTour');
          } catch {
            setInitialRoute('Home');
          }
          return;
        }

        // ── Caso 2: invitado ────────────────────────────────────────
        const guest = await isGuestMode();

        if (guest) {
          const status = await getGuestOnboardingStatus();
          if (!status.completed) {
            setInitialRoute('Story');
            return;
          }
          const tourCompleted = await isGuestTourCompleted();
          setInitialRoute(tourCompleted ? 'Home' : 'AppTour');
          return;
        }

        // ── Caso 3: sin sesión ──────────────────────────────────────
        setInitialRoute('Splash1');

      } catch {
        setInitialRoute('Splash1');
      }
    };

    checkSession();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator initialRoute={initialRoute} />;
}