import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../../../navigation/BottomTabNavigator';
import HomeScreen from './HomeScreen';
import { colors } from '../../../constants/theme';
import ProgressScreen from '../../progress/screens/ProgressScreen';
import MotivationScreen from '../../motivation/screens/MotivationScreen';
import CareScreen from '../../care/screens/CareScreen';

const SCREENS: Record<string, (navigation: any) => React.ReactNode> = {
  Home: (navigation) => <HomeScreen navigation={navigation} />,
  Progress: (navigation) => <ProgressScreen navigation={navigation} />,
  Motivation: (navigation) => <MotivationScreen navigation={navigation} />,
  Care: (navigation) => <CareScreen navigation={navigation} />,
  Social: () => <View style={{ flex: 1, backgroundColor: colors.background }} />,
};

export default function MainScreen({ navigation, route }: any) {
  // ✅ Obtener initialTab del parámetro, si no está usa 'Home'
  const [activeTab, setActiveTab] = useState(route?.params?.initialTab || 'Home');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {SCREENS[activeTab](navigation)}
      </View>
      <BottomTabNavigator activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});