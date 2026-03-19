import React, { useState } from 'react';
import { TextInput, StyleSheet, Alert } from 'react-native';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

const INPUT_HEIGHT = 52;

export default function Step1_Apodo({ navigation }: any) {
  const [apodo, setApodo] = useState('');
  const { setField } = useOnboarding();

  const handleContinue = () => {
    if (!apodo.trim()) {
      Alert.alert('Campo requerido', 'Por favor escribe cómo quieres que te llamemos.');
      return;
    }
    if (apodo.trim().length < 1) {
      Alert.alert('Nombre muy corto', 'El apodo debe tener al menos 1 caracter.');
      return;
    }
    if (apodo.trim().length > 20) {
      Alert.alert('Nombre muy largo', 'El apodo no puede tener más de 20 caracteres.');
      return;
    }
    setField('apodo', apodo.trim());
    navigation.navigate('Step2');
  };

  return (
    <StepLayout
      currentStep={1}
      question="Dime cómo quieres que te llame"
      characterImage={require('../../../../assets/images/character1.png')}
      onBack={() => navigation.goBack()}
      onContinue={handleContinue}
      showButton={true}
    >
      <TextInput
        style={styles.input}
        placeholder="Escribir apodo o nombre..."
        placeholderTextColor={colors.border}
        value={apodo}
        onChangeText={setApodo}
        autoCapitalize="words"
        maxLength={20}
      />
    </StepLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    fontSize: fontSizes.md,
    color: colors.text,
  },
});