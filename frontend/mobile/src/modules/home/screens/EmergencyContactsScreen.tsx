import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Linking, Alert, Modal, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Padrino Rubén', phone: '+573001234567' },
  { id: '2', name: 'Fundación Shalom', phone: '+573007654321' },
  { id: '3', name: 'Psicólogo Juan', phone: '+573009876543' },
];

export default function EmergencyContactsScreen({ navigation }: any) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const openModal = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setName(contact.name);
      setPhone(contact.phone);
    } else {
      setEditingContact(null);
      setName('');
      setPhone('');
    }
    setShowModal(true);
  };

  const saveContact = () => {
    if (!name.trim() || !phone.trim()) return;
    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id ? { ...c, name, phone } : c));
    } else {
      setContacts([...contacts, { id: Date.now().toString(), name, phone }]);
    }
    setShowModal(false);
  };

  const deleteContact = (id: string) => {
    Alert.alert('Eliminar contacto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setContacts(contacts.filter(c => c.id !== id)) },
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => callContact(contact.phone)}>
                <Icon name="phone" size={18} color={'#FF6B6B'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => smsContact(contact.phone)}>
                <Icon name="message-circle" size={18} color={'#FF6B6B'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonSecondary} onPress={() => openModal(contact)}>
                <Icon name="edit-2" size={16} color={colors.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonSecondary} onPress={() => deleteContact(contact.id)}>
                <Icon name="trash-2" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

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
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
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