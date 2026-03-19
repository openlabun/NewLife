import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Linking, Alert, Modal, TextInput, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';
import { getContacts, createContact, updateContact, deleteContact } from '../../../services/authService';
import {
  getGuestContacts,
  createGuestContact,
  updateGuestContact,
  deleteGuestContact,
  isGuestMode,
} from '../../../services/guestService';

type Contact = {
  contacto_id?: string;
  id?: string;
  nombre: string;
  telefono: string;
};

export default function EmergencyContactsScreen({ navigation }: any) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const guest = await isGuestMode();
      if (guest) {
        const data = await getGuestContacts();
        setContacts(data);
      } else {
        const data = await getContacts();
        setContacts(Array.isArray(data) ? data : data.rows || []);
      }
    } catch (e) {
      console.log('Error obteniendo contactos:', e);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (contact?: Contact) => {
    setErrorMessage('');
    if (contact) {
      setEditingContact(contact);
      setName(contact.nombre);
      setPhone(contact.telefono ? String(contact.telefono) : '');
    } else {
      setEditingContact(null);
      setName('');
      setPhone('');
    }
    setShowModal(true);
  };

  const saveContact = async () => {
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Nombre y teléfono son obligatorios');
      return;
    }
    if (phone.length !== 10) {
      setErrorMessage('Número inválido. Debe tener 10 dígitos.');
      return;
    }

    try {
      const guest = await isGuestMode();
      if (guest) {
        if (editingContact) {
          await updateGuestContact(editingContact.contacto_id || editingContact.id || '', name, phone);
        } else {
          await createGuestContact(name, phone);
        }
      } else {
        if (editingContact) {
          await updateContact(editingContact.contacto_id || '', name, phone);
        } else {
          await createContact(name, phone);
        }
      }
      setErrorMessage('');
      setShowModal(false);
      fetchContacts();
    } catch (e: any) {
      console.log('Error guardando contacto:', e);
      setErrorMessage(e.response?.data?.message || e.message || 'Error al guardar contacto');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar contacto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: async () => {
          try {
            const guest = await isGuestMode();
            if (guest) {
              await deleteGuestContact(id);
            } else {
              await deleteContact(id);
            }
            fetchContacts();
          } catch (e) {
            console.log('Error eliminando contacto:', e);
          }
        }
      },
    ]);
  };

  const callContact = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const smsContact = (phone: string) => {
    Linking.openURL(`sms:${phone}`);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SOS')}>
          <Icon name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contactos de emergencia</Text>
        <TouchableOpacity onPress={() => openModal()}>
          <Icon name="plus" size={24} color={'#FF6B6B'} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Accede rápidamente a tus <Text style={styles.subtitleBold}>contactos clave.</Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {contacts.length === 0 ? (
            <Text style={styles.emptyText}>No tienes contactos de emergencia aún.</Text>
          ) : (
            contacts.map((contact) => (
              <View key={contact.contacto_id || contact.id} style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.contactName}>{contact.nombre}</Text>
                  <Text style={styles.contactPhone}>{contact.telefono}</Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => callContact(contact.telefono)}>
                    <Icon name="phone" size={18} color={'#FF6B6B'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => smsContact(contact.telefono)}>
                    <Icon name="message-circle" size={18} color={'#FF6B6B'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButtonSecondary} onPress={() => openModal(contact)}>
                    <Icon name="edit-2" size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButtonSecondary} onPress={() => handleDelete(contact.contacto_id || contact.id || '')}>
                    <Icon name="trash-2" size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* Modal agregar/editar */}
      <Modal visible={showModal} transparent animationType="slide" statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingContact ? 'Editar contacto' : 'Nuevo contacto'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre..."
              placeholderTextColor={colors.border}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Número telefónico..."
              placeholderTextColor={colors.border}
              value={phone}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setPhone(cleaned);
              }}
              keyboardType="phone-pad"
            />
            {errorMessage ? (
              <Text style={{ color: 'red', marginTop: 4, textAlign: 'center' }}>
                {errorMessage}
              </Text>
            ) : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowModal(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={saveContact}>
                <Text style={styles.modalSaveText}>Guardar</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  subtitleBold: {
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: fontSizes.md,
    marginTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    gap: spacing.md,
  },
  cardInfo: {
    gap: 4,
  },
  contactName: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },
  contactPhone: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#FF6B6B',
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonSecondary: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 52,
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.md * 2,
    borderTopRightRadius: borderRadius.md * 2,
    padding: spacing.xl,
    gap: spacing.md,
  },
  modalTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  modalCancel: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    fontWeight: '600',
  },
  modalSave: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: fontSizes.md,
    color: colors.white,
    fontWeight: '700',
  },
});