import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

const INPUT_HEIGHT = 52;

export default function Step1_Apodo({ navigation }: any) {
  const [apodo, setApodo] = useState('');
  const [error, setError] = useState('');
  const { setField } = useOnboarding();

  const handleContinue = () => {
    setError('');
    if (!apodo.trim()) {
      setError('Por favor escribe cómo quieres que te llamemos.');
      return;
    }
    if (apodo.trim().length < 2) {
      setError('El apodo debe tener al menos 2 caracteres.');
      return;
    }
    if (apodo.trim().length > 20) {
      setError('El apodo no puede tener más de 20 caracteres.');
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
      <View>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Escribir apodo o nombre..."
          placeholderTextColor={colors.border}
          value={apodo}
          onChangeText={(v) => { setApodo(v); setError(''); }}
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="name"
          importantForAutofill="no"
          maxLength={20}
        />
        {error ? (
          <View style={styles.inlineError}>
            <View style={styles.inlineDot} />
            <Text style={styles.inlineErrorText}>{error}</Text>
          </View>
        ) : null}
      </View>
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
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#993C1D',
    backgroundColor: '#fff8f6',
  },
  inlineError: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    backgroundColor: '#FAECE7',
    borderRadius: borderRadius.sm,
    marginTop: 4,
  },
  inlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#993C1D',
    flexShrink: 0,
  },
  inlineErrorText: {
    fontSize: fontSizes.xs,
    color: '#712B13',
    flex: 1,
  },
});