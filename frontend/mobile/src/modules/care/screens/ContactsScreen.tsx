import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Linking, Modal, TextInput, Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Contact = {
  id: string;
  name: string;
  phone: string;
  avatar?: any;
};

const INITIAL_CONTACTS: Contact[] = [
  { id: '1', name: 'Padrino Rubén', phone: '+57 300 123 4567' },
  { id: '2', name: 'Fund. Shalom', phone: '+57 300 123 4567' },
  { id: '3', name: 'Psicólogo Juan', phone: '+57 300 123 4567' },
];

export default function ContactsScreen({ navigation }: any) {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const openAdd = () => {
    setEditingContact(null);
    setName('');
    setPhone('');
    setShowModal(true);
  };

  const openEdit = (contact: Contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) return;
    if (editingContact) {
      setContacts(contacts.map((c) =>
        c.id === editingContact.id ? { ...c, name, phone } : c
      ));
    } else {
      setContacts([...contacts, { id: Date.now().toString(), name, phone }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar contacto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setContacts(contacts.filter((c) => c.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Contactos de emergencia</Text>
          <Text style={styles.headerSubtitle}>Edita rápido tus contactos clave.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarPlaceholder}>
                <Feather name="user" size={24} color={colors.textMuted} />
              </View>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
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
                onPress={() => handleDelete(contact.id)}
              >
                <Feather name="trash-2" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={openAdd}>
        <Text style={styles.addButtonText}>Agregar contacto</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide" statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {editingContact ? 'Editar contacto' : 'Añadir contacto'}
              </Text>
            </View>

            {/* Avatar */}
            <TouchableOpacity style={styles.avatarLarge}>
              <View style={styles.avatarLargePlaceholder}>
                <Feather name="user" size={40} color={colors.textMuted} />
              </View>
              <View style={styles.avatarEditBadge}>
                <Feather name="edit-2" size={10} color={colors.white} />
              </View>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe un nombre...."
              placeholderTextColor={colors.border}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Numero</Text>
            <TextInput
              style={styles.input}
              placeholder="+57...."
              placeholderTextColor={colors.border}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.addFieldButton}>
              <Text style={styles.addFieldText}>+ Añadir numero de teléfono</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Email</Text>
            <TouchableOpacity style={styles.addFieldButton}>
              <Text style={styles.addFieldText}>+ Añadir correo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Guardar</Text>
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
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: spacing.md,
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
  addFieldButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.xs,
  },
  addFieldText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
});