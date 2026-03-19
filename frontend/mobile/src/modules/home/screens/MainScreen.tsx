import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../../../navigation/BottomTabNavigator';
import HomeScreen from './HomeScreen';
import { colors } from '../../../constants/theme';
import ProgressScreen from '../../progress/screens/ProgressScreen';

const SCREENS: Record<string, (navigation: any) => React.ReactNode> = {
  Home: (navigation) => <HomeScreen navigation={navigation} />,
  Progress: (navigation) => <ProgressScreen navigation={navigation} />,
  Motivation: () => <View style={{ flex: 1, backgroundColor: colors.background }} />,
  Care: () => <View style={{ flex: 1, backgroundColor: colors.background }} />,
  Social: () => <View style={{ flex: 1, backgroundColor: colors.background }} />,
};

export default function MainScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Home');

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

