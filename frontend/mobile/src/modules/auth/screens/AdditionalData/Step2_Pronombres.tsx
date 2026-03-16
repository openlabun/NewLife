import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

const OPTIONS = ['Él', 'Ella', 'Elle'];

export default function Step2_Pronombres({ navigation }: any) {
  const [selected, setSelected] = useState('');
  const { setField } = useOnboarding();

  return (
    <StepLayout
      currentStep={2}
      question="Dime tus pronombres pa' no embarrarla jajaja"
      characterImage={require('../../../../assets/images/character2.png')}
      onBack={() => navigation.goBack()}
      showButton={false}
    >
      <View style={styles.optionsContainer}>
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selected === option && styles.optionSelected]}
            onPress={() => {
              setSelected(option);
              setField('pronombre', option);
              setTimeout(() => navigation.navigate('Step3'), 300);
            }}
          >
            <Text style={[styles.optionText, selected === option && styles.optionTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </StepLayout>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    gap: spacing.sm,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: colors.white,
  },
});