import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const LEGAL_ITEMS = [
  { label: 'Ver políticas de privacidad', url: 'https://newlife.app/privacy' },
  { label: 'Ver términos y condiciones', url: 'https://newlife.app/terms' },
];

export default function LegalScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal / Seguridad</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Información sobre tus datos y cómo se usan dentro de la app.
        </Text>

        <View style={styles.itemList}>
          {LEGAL_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={() => Linking.openURL(item.url)}
            >
              <Text style={styles.itemText}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  itemList: { gap: spacing.md },
  item: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  itemText: { fontSize: fontSizes.md, fontWeight: '600', color: colors.text },
});