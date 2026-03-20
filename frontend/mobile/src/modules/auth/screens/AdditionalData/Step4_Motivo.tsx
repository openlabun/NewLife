import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

export default function Step4_Motivo({ navigation }: any) {
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState('');
  const { setField } = useOnboarding();

  const handleContinue = () => {
    setError('');
    if (!motivo.trim()) {
      setError('Por favor escribe tu motivo para estar sobrio. Puede ser cualquier cosa que te impulse.');
      return;
    }
    if (motivo.trim().length < 3) {
      setError('Cuéntanos un poco más, mínimo 3 caracteres.');
      return;
    }
    setField('motivo_sobrio', motivo.trim());
    navigation.navigate('Step5');
  };

  return (
    <StepLayout
      currentStep={4}
      question="¿Cuál es tu mayor motivo para estar sobrio? ❤️"
      characterImage={require('../../../../assets/images/character5.png')}
      onBack={() => navigation.goBack()}
      onContinue={handleContinue}
      showButton={true}
    >
      <View>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Escribir un breve motivo..."
          placeholderTextColor={colors.border}
          value={motivo}
          onChangeText={(v) => { setMotivo(v); setError(''); }}
          multiline
          textAlignVertical="top"
          maxLength={200}
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
    height: 140,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
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