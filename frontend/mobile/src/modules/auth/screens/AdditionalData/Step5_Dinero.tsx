import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

const INPUT_HEIGHT = 52;

const CURRENCIES = [
  { code: 'COP', symbol: '$', separator: '.' },
  { code: 'USD', symbol: '$', separator: ',' },
  { code: 'EUR', symbol: '€', separator: '.' },
];

const formatAmount = (value: string, separator: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export default function Step5_Dinero({ navigation }: any) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');
  const { setField } = useOnboarding();

  const handleChange = (text: string) => {
    const formatted = formatAmount(text, currency.separator);
    setAmount(formatted);
    setError('');
  };

  const handleContinue = () => {
    setError('');

    if (amount.trim() === '') {
      setError('Por favor ingresa el monto. Puedes poner 0 si no recuerdas o era muy poco.');
      return;
    }

    const numeric = parseFloat(amount.replace(/\D/g, ''));
    if (isNaN(numeric)) {
      setError('Por favor ingresa solo valores numéricos.');
      return;
    }

    setField('gasto_semana', numeric);
    navigation.navigate('Step6');
  };

  return (
    <>
      <StepLayout
        currentStep={5}
        question="¿Cuánto gastabas más o menos en alcohol a la semana?"
        characterImage={require('../../../../assets/images/character6.png')}
        onBack={() => navigation.goBack()}
        onContinue={handleContinue}
        showButton={true}
      >
        <View>
          <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
            <TouchableOpacity style={styles.currencySelector} onPress={() => setShowPicker(true)}>
              <Text style={styles.currencyText}>{currency.code}</Text>
              <Icon name="chevron-down" size={14} color={colors.textMuted} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text style={styles.symbol}>{currency.symbol}</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.border}
              value={amount}
              onChangeText={handleChange}
              keyboardType="numeric"
            />
          </View>
          {error ? (
            <View style={styles.inlineError}>
              <View style={styles.inlineDot} />
              <Text style={styles.inlineErrorText}>{error}</Text>
            </View>
          ) : null}
        </View>
      </StepLayout>

      <Modal visible={showPicker} transparent animationType="fade" statusBarTranslucent>
        <TouchableOpacity style={styles.overlay} onPress={() => setShowPicker(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Selecciona la moneda</Text>
            {CURRENCIES.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={[styles.modalOption, currency.code === c.code && styles.modalOptionSelected]}
                onPress={() => { setCurrency(c); setAmount(''); setShowPicker(false); }}
              >
                <Text style={[styles.modalOptionText, currency.code === c.code && styles.modalOptionTextSelected]}>
                  {c.symbol} {c.code}
                </Text>
                {currency.code === c.code && <Icon name="check" size={16} color={colors.white} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
  currencySelector: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  currencyText: { fontSize: fontSizes.sm, fontWeight: '600', color: colors.text },
  divider: { width: 1, height: 20, backgroundColor: colors.border, marginHorizontal: spacing.xs },
  symbol: { fontSize: fontSizes.md, color: colors.textMuted },
  input: { flex: 1, height: INPUT_HEIGHT, fontSize: fontSizes.md, color: colors.text },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.lg, width: '75%', gap: spacing.sm },
  modalTitle: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text, marginBottom: spacing.xs, textAlign: 'center' },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border },
  modalOptionSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  modalOptionText: { fontSize: fontSizes.md, color: colors.text, fontWeight: '500' },
  modalOptionTextSelected: { color: colors.white },
});