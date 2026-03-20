import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import StepLayout from '../../components/StepLayout';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useOnboarding } from '../../../../context/OnboardingContext';

const INPUT_HEIGHT = 52;

const PREFIXES = [
  { code: '+57', country: '🇨🇴 Colombia' },
  { code: '+1', country: '🇺🇸 USA' },
  { code: '+52', country: '🇲🇽 México' },
  { code: '+34', country: '🇪🇸 España' },
  { code: '+54', country: '🇦🇷 Argentina' },
];

export default function Step6_Telefono({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [prefix, setPrefix] = useState(PREFIXES[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const { setField } = useOnboarding();

  const handleChange = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    setPhone(numbers);
    setPhoneError('');
  };

  const handleContinue = () => {
    setNameError('');
    setPhoneError('');

    const hasName = name.trim().length > 0;
    const hasPhone = phone.trim().length > 0;

    if (!hasName && !hasPhone) {
      setNameError('Por favor agrega al menos un contacto de emergencia.');
      return;
    }
    if (hasName && !hasPhone) {
      setPhoneError('Si agregas un contacto debes incluir su número de teléfono.');
      return;
    }
    if (hasPhone && !hasName) {
      setNameError('Si agregas un número debes incluir el nombre del contacto.');
      return;
    }
    if (phone.length !== 10) {
      setPhoneError('El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    setField('telefono', parseInt(phone));
    setField('nombre_contacto', name.trim());
    navigation.navigate('Step7');
  };

  return (
    <>
      <StepLayout
        currentStep={6}
        question="En caso de crisis, ¿a quién podemos avisar?"
        characterImage={require('../../../../assets/images/character7.png')}
        onBack={() => navigation.goBack()}
        onContinue={handleContinue}
        showButton={true}
      >
        <View style={styles.fieldsContainer}>

          <View>
            <View style={[styles.inputWrapper, nameError ? styles.inputError : null]}>
              <Icon name="user" size={16} color={colors.textMuted} />
              <View style={styles.divider} />
              <TextInput
                style={styles.input}
                placeholder="Nombre del contacto..."
                placeholderTextColor={colors.border}
                value={name}
                onChangeText={(v) => { setName(v); setNameError(''); }}
              />
            </View>
            {nameError ? (
              <View style={styles.inlineError}>
                <View style={styles.inlineDot} />
                <Text style={styles.inlineErrorText}>{nameError}</Text>
              </View>
            ) : null}
          </View>

          <View>
            <View style={[styles.inputWrapper, phoneError ? styles.inputError : null]}>
              <TouchableOpacity style={styles.prefixSelector} onPress={() => setShowPicker(true)}>
                <Text style={styles.prefixText}>{prefix.code}</Text>
                <Icon name="chevron-down" size={14} color={colors.textMuted} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TextInput
                style={styles.input}
                placeholder="Número telefónico..."
                placeholderTextColor={colors.border}
                value={phone}
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            {phoneError ? (
              <View style={styles.inlineError}>
                <View style={styles.inlineDot} />
                <Text style={styles.inlineErrorText}>{phoneError}</Text>
              </View>
            ) : null}
          </View>

        </View>
      </StepLayout>

      <Modal visible={showPicker} transparent animationType="fade" statusBarTranslucent>
        <TouchableOpacity style={styles.overlay} onPress={() => setShowPicker(false)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Selecciona el prefijo</Text>
            {PREFIXES.map((p) => (
              <TouchableOpacity
                key={p.code}
                style={[styles.modalOption, prefix.code === p.code && styles.modalOptionSelected]}
                onPress={() => { setPrefix(p); setShowPicker(false); }}
              >
                <Text style={[styles.modalOptionText, prefix.code === p.code && styles.modalOptionTextSelected]}>
                  {p.country}
                </Text>
                <Text style={[styles.modalOptionCode, prefix.code === p.code && styles.modalOptionTextSelected]}>
                  {p.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fieldsContainer: { gap: spacing.md },
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
  prefixSelector: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  prefixText: { fontSize: fontSizes.sm, fontWeight: '600', color: colors.text },
  divider: { width: 1, height: 20, backgroundColor: colors.border, marginHorizontal: spacing.xs },
  input: { flex: 1, height: INPUT_HEIGHT, fontSize: fontSizes.md, color: colors.text },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.lg, width: '80%', gap: spacing.sm },
  modalTitle: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text, marginBottom: spacing.xs, textAlign: 'center' },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border },
  modalOptionSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  modalOptionText: { fontSize: fontSizes.md, color: colors.text, fontWeight: '500' },
  modalOptionCode: { fontSize: fontSizes.sm, color: colors.textMuted },
  modalOptionTextSelected: { color: colors.white },
});