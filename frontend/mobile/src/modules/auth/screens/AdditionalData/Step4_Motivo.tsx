import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

export default function Step4_Motivo({ navigation }: any) {
  const [motivo, setMotivo] = useState('');
  const { setField } = useOnboarding();

  const handleContinue = () => {
    // Opcional — si está vacío se envía string vacío
    setField('motivo_sobrio', motivo.trim() || '');
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
      <TextInput
        style={styles.input}
        placeholder="Puedes dejarlo en blanco si prefieres..."
        placeholderTextColor={colors.border}
        value={motivo}
        onChangeText={setMotivo}
        multiline
        textAlignVertical="top"
        maxLength={200}
      />
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
  },
});