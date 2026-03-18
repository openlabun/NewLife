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
        // Hay tokens → siempre entrar, nunca borrar
        try {
          const status = await getOnboardingStatus();
          setInitialRoute(status.completed ? 'Home' : 'Story');
        } catch {
          // Error de red u otro → igual entrar a Home
          // Los tokens siguen válidos, no los borramos
          setInitialRoute('Home');
        }
      } else {
        // Sin tokens → primera vez o cerró sesión explícitamente
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