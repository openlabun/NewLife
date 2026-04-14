import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

export default function SettingsScreen({ navigation }: any) {
  const [shareAchievements, setShareAchievements] = useState(true);
  const [checkInReminders, setCheckInReminders] = useState(true);
  const [riskDateAlerts, setRiskDateAlerts] = useState(true);
  const [riskPlaceAlerts, setRiskPlaceAlerts] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>Privacidad</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Compartir logros</Text>
          <Switch
            value={shareAchievements}
            onValueChange={setShareAchievements}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>

        <Text style={styles.sectionLabel}>Notificaciones</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Recordatorios de check-in</Text>
          <Switch
            value={checkInReminders}
            onValueChange={setCheckInReminders}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Alertas de fechas de riesgo</Text>
          <Switch
            value={riskDateAlerts}
            onValueChange={setRiskDateAlerts}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Alertas de lugares de riesgo</Text>
          <Switch
            value={riskPlaceAlerts}
            onValueChange={setRiskPlaceAlerts}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: fontSizes.lg, fontWeight: '700', color: colors.text },
  content: { paddingHorizontal: spacing.xl },
  sectionLabel: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  settingItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  settingText: { fontSize: fontSizes.md, color: colors.text },
  saveButton: {
    position: 'absolute',
    bottom: 32,
    left: spacing.xl,
    right: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    elevation: 4,
  },
  saveButtonText: { color: colors.white, fontSize: fontSizes.lg, fontWeight: '700' },
});