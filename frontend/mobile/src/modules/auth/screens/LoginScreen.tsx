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

const INPUT_HEIGHT = 52;

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Cargar email y contraseña guardados si rememberMe estaba activo
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

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      setLoading(true);

      // Guardar o borrar credenciales según rememberMe
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
      setError(err.response?.data?.message || 'Correo o contraseña incorrectos.');
    } finally {
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

      <Text style={styles.title}>¡Ey! Nos alegra{'\n'}tenerte por acá :</Text>

      <View style={styles.inputsContainer}>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu correo aquí..."
            placeholderTextColor={colors.border}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu contraseña..."
            placeholderTextColor={colors.border}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Switch Recordarme — ahora solo autocompleta credenciales */}
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  inputWrapper: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
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
  forgotContainer: {
    alignItems: 'flex-end',
  },
  forgotText: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
  },
  errorText: {
    color: 'red',
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginTop: spacing.xs,
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