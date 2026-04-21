import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { useCare } from '../../hooks/useCare';

export default function ContactsScreen({ navigation }: any) {
  const { contactos, loading, addContacto, deleteContacto, updateContacto, fetchContactos } = useCare();
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Cargar contactos al montar
  useEffect(() => {
    fetchContactos();
  }, []);

  // ✅ Refetch al enfocarse en la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchContactos();
    });
    return unsubscribe;
  }, [navigation, fetchContactos]);

  const openAdd = () => {
    setErrorMessage('');
    setEditingContact(null);
    setName('');
    setPhone('');
    setShowModal(true);
  };

  const openEdit = (contact: any) => {
    setErrorMessage('');
    setEditingContact(contact);
    setName(contact.nombre);
    setPhone(String(contact.telefono));
    setShowModal(true);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    return cleaned.length === 10;
  };

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Nombre y teléfono son obligatorios');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setErrorMessage('Número inválido. Debe tener 10 dígitos.');
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage('');

      if (editingContact) {
        await updateContacto(editingContact.contacto_id, {
          nombre: name,
          telefono: phone,
        });
      } else {
        await addContacto({
          nombre: name,
          telefono: phone,
        });
      }

      setShowModal(false);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al guardar contacto');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (contactoId: string) => {
    Alert.alert('Eliminar contacto', '¿Estás seguro de que deseas eliminar este contacto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteContacto(contactoId);
          } catch (error: any) {
            Alert.alert('Error', error.message || 'Error al eliminar contacto');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Contactos de emergencia</Text>
          <Text style={styles.headerSubtitle}>Edita rápido tus contactos clave.</Text>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {contactos && contactos.length > 0 ? (
            contactos.map((contact) => (
              <View key={contact.contacto_id || contact._id} style={styles.contactCard}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarPlaceholder}>
                    <Feather name="user" size={24} color={colors.textMuted} />
                  </View>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.nombre}</Text>
                  <Text style={styles.contactPhone}>{contact.telefono}</Text>
                </View>
                <View style={styles.contactActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openEdit(contact)}
                  >
                    <Feather name="edit-2" size={16} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(contact.contacto_id || contact._id)}
                  >
                    <Feather name="trash-2" size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No tienes contactos de emergencia aún.</Text>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={openAdd}>
        <Text style={styles.addButtonText}>Agregar contacto</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide" statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Feather name="chevron-left" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {editingContact ? 'Editar contacto' : 'Añadir contacto'}
              </Text>
            </View>

            {/* Avatar */}
            <View style={styles.avatarLarge}>
              <View style={styles.avatarLargePlaceholder}>
                <Feather name="user" size={40} color={colors.textMuted} />
              </View>
              <View style={styles.avatarEditBadge}>
                <Feather name="edit-2" size={10} color={colors.white} />
              </View>
            </View>

            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe un nombre..."
              placeholderTextColor={colors.border}
              value={name}
              onChangeText={setName}
              editable={!isSaving}
            />

            <Text style={styles.inputLabel}>Número</Text>
            <TextInput
              style={styles.input}
              placeholder="10 dígitos..."
              placeholderTextColor={colors.border}
              value={phone}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setPhone(cleaned.slice(0, 10));
              }}
              keyboardType="phone-pad"
              editable={!isSaving}
            />

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.saveButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: fontSizes.md,
    marginTop: spacing.xl,
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  contactPhone: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
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
  addButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modal: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  avatarLarge: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  avatarLargePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
});