import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const GENDERS = ['Masculino', 'Femenino', 'No binario', 'Prefiero no decir'];

export default function EditProfileScreen({ navigation }: any) {
  const [name, setName] = useState('Jesús Rodrigues');
  const [nickname, setNickname] = useState('Rodi');
  const [gender, setGender] = useState('Masculino');
  const [description, setDescription] = useState('');
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Jesús Rodrigues"
          placeholderTextColor={colors.border}
        />

        <Text style={styles.label}>Apodo</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Rodi"
          placeholderTextColor={colors.border}
        />

        <Text style={styles.label}>Genero</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowGenderPicker(true)}
        >
          <Text style={styles.inputText}>{gender}</Text>
          <Feather name="chevron-down" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <Text style={styles.label}>Descripcion</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          placeholder="Añade aquí tu descripcion..."
          placeholderTextColor={colors.border}
          multiline
          textAlignVertical="top"
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>

      {/* Gender picker */}
      <Modal visible={showGenderPicker} transparent animationType="slide" statusBarTranslucent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGenderPicker(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Género</Text>
            {GENDERS.map((g) => (
              <TouchableOpacity
                key={g}
                style={styles.modalOption}
                onPress={() => { setGender(g); setShowGenderPicker(false); }}
              >
                <Text style={[styles.modalOptionText, gender === g && styles.modalOptionSelected]}>
                  {g}
                </Text>
                {gender === g && <Feather name="check" size={16} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  scroll: { paddingHorizontal: spacing.xl },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: fontSizes.md,
    color: colors.text,
  },
  textArea: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
    height: 120,
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  modalTitle: { fontSize: fontSizes.lg, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionText: { fontSize: fontSizes.md, color: colors.text },
  modalOptionSelected: { fontWeight: '700', color: colors.primary },
});