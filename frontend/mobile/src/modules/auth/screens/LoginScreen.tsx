import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { loginUser, getOnboardingStatus } from '../../../services/authService';
import { useToast } from '../../../context/ToastContext';

const INPUT_HEIGHT = 52;

export default function LoginScreen({ navigation }: any) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const saved = await AsyncStorage.getItem('rememberMe');
        if (saved === 'true') {
          const savedEmail = await AsyncStorage.getItem('savedEmail');
          const savedPassword = await AsyncStorage.getItem('savedPassword');
          if (savedEmail) setEmail(savedEmail);
          if (savedPassword) setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (e) {
        console.log('Error cargando credenciales:', e);
      }
    };
    loadSavedCredentials();
  }, []);

  const validate = (): boolean => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

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

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      if (rememberMe) {
        await AsyncStorage.multiSet([
          ['rememberMe', 'true'],
          ['savedEmail', email.trim().toLowerCase()],
          ['savedPassword', password],
        ]);
      } else {
        await AsyncStorage.multiRemove(['rememberMe', 'savedEmail', 'savedPassword']);
      }

      await loginUser(email.trim().toLowerCase(), password);
      const status = await getOnboardingStatus();
      navigation.navigate(status.completed ? 'Home' : 'Story');

    } catch (err: any) {
      const rawMsg = err?.response?.data?.message;
      const msg = Array.isArray(rawMsg)
      ? rawMsg.join(' ').toLowerCase()
      : (rawMsg || '').toLowerCase();
      
      if (msg.includes('inactiv') || msg.includes('bloquead')) {
        showToast({
          type: 'warning',
          title: 'Cuenta inactiva',
          message: 'Tu cuenta está inactiva. Contacta al soporte.',
        });
      } else {
        showToast({
          type: 'error',
          title: 'No pudimos iniciarte sesión',
          message: 'Verifica tu correo y contraseña e intenta de nuevo.',
        });
      }
    }finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={24} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>¡Ey! Nos alegra{'\n'}tenerte por acá :)</Text>

      <View style={styles.inputsContainer}>

        <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu correo aquí..."
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
            placeholder="Escribe tu contraseña..."
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

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: '#ccc', true: '#FF6B6B' }}
            thumbColor="#fff"
          />
          <Text style={{ marginLeft: 8, color: colors.text }}>Recordarme</Text>
        </View>

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>¿Se te olvidó la contraseña?</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={[styles.buttonPrimary, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color={colors.white} />
          : <Text style={styles.buttonPrimaryText}>Entrar</Text>
        }
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿Sin cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Súmate ya</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 38,
    marginBottom: spacing.xxl,
  },
  inputsContainer: {
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
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
  input: {
    flex: 1,
    height: INPUT_HEIGHT,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  eyeButton: {
    padding: 4,
  },
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
  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    marginBottom: 'auto',
  },
  buttonPrimaryText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  registerText: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
  },
  registerLink: {
    color: colors.accent,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});