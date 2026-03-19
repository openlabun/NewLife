import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { registerUser } from '../../../services/authService';
import { isGuestMode } from '../../../services/guestService';
import { migrateGuestToUser } from '../../../services/authService';
import { useToast } from '../../../context/ToastContext';

const INPUT_HEIGHT = 52;

export default function RegisterScreen({ navigation }: any) {
  const { showToast } = useToast();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validate = (): boolean => {
    let valid = true;
    setNombreError('');
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    if (!nombre.trim()) {
      setNombreError('El nombre completo es obligatorio.');
      valid = false;
    } else if (nombre.trim().length < 2) {
      setNombreError('El nombre debe tener al menos 2 caracteres.');
      valid = false;
    } else if (nombre.trim().length > 50) {
      setNombreError('El nombre no puede tener más de 50 caracteres.');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('El correo electrónico es obligatorio.');
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError('El formato del correo no es válido. Ej: usuario@correo.com');
        valid = false;
      }
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos una letra mayúscula.');
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos una letra minúscula.');
      valid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos un número.');
      valid = false;
    } else if (!/[!@#$_\-.]/.test(password)) {
      setPasswordError('La contraseña debe tener al menos un símbolo (!, @, #, $, _, -, .)');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError('Por favor confirma tu contraseña.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError('Las contraseñas no coinciden. Por favor verifica.');
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const wasGuest = await isGuestMode();
      await registerUser(nombre.trim(), email.trim().toLowerCase(), password);

      if (wasGuest) {
        try {
          await migrateGuestToUser();
          const userEmail = await AsyncStorage.getItem('userEmail');
          await AsyncStorage.setItem(`tourCompleted_${userEmail}`, 'true');
          showToast({
            type: 'success',
            title: '¡Cuenta creada!',
            message: 'Tu progreso ha sido guardado exitosamente.',
          });
        } catch {
          showToast({
            type: 'warning',
            title: 'Cuenta creada',
            message: 'No pudimos migrar tu progreso. Puedes continuar normalmente.',
          });
        }
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else {
        showToast({
          type: 'success',
          title: '¡Bienvenidx!',
          message: 'Tu cuenta fue creada exitosamente.',
        });
        navigation.navigate('Story');
      }

    } catch (err: any) {
      const rawMsg = err?.response?.data?.message;
      const msg = Array.isArray(rawMsg)
        ? rawMsg.join(' ').toLowerCase()
        : (rawMsg || '').toLowerCase();

      if (msg.includes('existe') || msg.includes('registrado') || msg.includes('duplicate') || msg.includes('already')) {
        showToast({
          type: 'error',
          title: 'Correo ya registrado',
          message: 'Ya existe una cuenta con ese correo. ¿Quieres iniciar sesión?',
        });
      } else if (msg.includes('contraseña') || msg.includes('password')) {
        showToast({
          type: 'error',
          title: 'Contraseña inválida',
          message: 'La contraseña no cumple los requisitos mínimos de seguridad.',
        });
      } else {
        showToast({
          type: 'error',
          title: 'No pudimos crear tu cuenta',
          message: 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>¡Hola! Regístrate{'\n'}para empezar</Text>

        <View style={styles.inputsContainer}>

          <View style={[styles.inputWrapper, nombreError ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor={colors.border}
              autoCapitalize="words"
              value={nombre}
              onChangeText={(v) => { setNombre(v); setNombreError(''); }}
            />
          </View>
          {nombreError ? (
            <View style={styles.inlineError}>
              <View style={styles.inlineDot} />
              <Text style={styles.inlineErrorText}>{nombreError}</Text>
            </View>
          ) : null}

          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor={colors.border}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(v) => { setEmail(v); setEmailError(''); }}
            />
          </View>
          {emailError ? (
            <View style={styles.inlineError}>
              <View style={styles.inlineDot} />
              <Text style={styles.inlineErrorText}>{emailError}</Text>
            </View>
          ) : null}

          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={colors.border}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(v) => { setPassword(v); setPasswordError(''); }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <View style={styles.inlineError}>
              <View style={styles.inlineDot} />
              <Text style={styles.inlineErrorText}>{passwordError}</Text>
            </View>
          ) : null}

          <View style={[styles.inputWrapper, confirmError ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor={colors.border}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); setConfirmError(''); }}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeButton}>
              <Icon name={showConfirm ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          {confirmError ? (
            <View style={styles.inlineError}>
              <View style={styles.inlineDot} />
              <Text style={styles.inlineErrorText}>{confirmError}</Text>
            </View>
          ) : null}

        </View>

        <TouchableOpacity
          style={[styles.buttonPrimary, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={colors.white} />
            : <Text style={styles.buttonPrimaryText}>Registrarse</Text>
          }
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Entra aquí</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: 60, paddingBottom: spacing.xxl, flexGrow: 1 },
  backButton: { marginBottom: spacing.xl },
  title: { fontSize: fontSizes.xxl, fontWeight: '700', color: colors.text, lineHeight: 38, marginBottom: spacing.xxl },
  inputsContainer: { gap: spacing.xs, marginBottom: spacing.xl },
  inputWrapper: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#993C1D',
    backgroundColor: '#fff8f6',
  },
  input: { flex: 1, height: INPUT_HEIGHT, fontSize: fontSizes.md, color: colors.text },
  eyeButton: { padding: 4 },
  inlineError: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    backgroundColor: '#FAECE7',
    borderRadius: borderRadius.sm,
    marginTop: 2,
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
  buttonPrimary: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.full, alignItems: 'center', marginBottom: spacing.lg },
  buttonPrimaryText: { color: colors.white, fontSize: fontSizes.lg, fontWeight: '600' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: spacing.xl },
  loginText: { color: colors.textMuted, fontSize: fontSizes.sm },
  loginLink: { color: colors.accent, fontSize: fontSizes.sm, fontWeight: '600' },
});