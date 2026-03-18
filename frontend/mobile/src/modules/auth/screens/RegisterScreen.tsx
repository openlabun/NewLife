import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { registerUser } from '../../../services/authService';
// Agrega este import arriba
import { sessionTokens } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INPUT_HEIGHT = 52;

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    setError('');
    
    if (!nombre || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    
    try {
      setLoading(true);
      const data = await registerUser(nombre, email, password);

      // Registro siempre persiste sesión (rememberMe = true automático)
      await AsyncStorage.multiSet([
        ['accessToken', data.accessToken],
        ['refreshToken', data.refreshToken],
        ['rememberMe', 'true'],
      ]);

      navigation.navigate('Story');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse. Intenta de nuevo.');
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

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor={colors.border}
              autoCapitalize="words"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Correo"
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
              placeholder="Contraseña"
              placeholderTextColor={colors.border}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor={colors.border}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeButton}>
              <Icon name={showConfirm ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
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
    marginBottom: spacing.lg,
  },
  buttonPrimaryText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: spacing.xl,
  },
  loginText: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
  },
  loginLink: {
    color: colors.accent,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});