import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOnboardingStatus } from '../services/authService';
import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        try {
          const status = await getOnboardingStatus();

          if (!status.completed) {
            // Onboarding de datos no completado → ir a Story
            setInitialRoute('Story');
            return;
          }
          
          const email = await AsyncStorage.getItem('userEmail');
          const tourCompleted = await AsyncStorage.getItem(`tourCompleted_${email}`);
          if (tourCompleted !== 'true') {
            // Datos completados pero tour no visto → ir al tour
            setInitialRoute('AppTour');
            return;
          }

          // Todo completado → Home
          setInitialRoute('Home');

        } catch {
          // Error de red → igual entrar, no borrar tokens
          setInitialRoute('Home');
        }
      } else {
        // Sin tokens → primera vez o cerró sesión
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