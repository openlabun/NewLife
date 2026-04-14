import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Modal, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const USER_COMMUNITIES = [
  { id: '1', name: 'AA Barranquilla' },
  { id: '2', name: 'Fundación Shalom' },
];

export default function CreatePostScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [showCommunityPicker, setShowCommunityPicker] = useState(false);
  const [image, setImage] = useState<any>(null);

  const toggleCommunity = (id: string) => {
    setSelectedCommunities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCommunities.length === USER_COMMUNITIES.length) {
      setSelectedCommunities([]);
    } else {
      setSelectedCommunities(USER_COMMUNITIES.map((c) => c.id));
    }
  };

  const selectedNames = USER_COMMUNITIES
    .filter((c) => selectedCommunities.includes(c.id))
    .map((c) => c.name)
    .join(', ');

  const canPublish = title.trim().length > 0 && selectedCommunities.length > 0;

  const handlePublish = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Selector de comunidad */}
        <TouchableOpacity
          style={styles.communitySelector}
          onPress={() => setShowCommunityPicker(true)}
        >
          <View style={styles.communityDot} />
          <Text style={[styles.communitySelectorText, selectedCommunities.length > 0 && styles.communitySelectorTextSelected]}>
            {selectedCommunities.length > 0 ? selectedNames : 'Seleccionar comunidad'}
          </Text>
          <Feather name="chevron-down" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        {/* Título */}
        <TextInput
          style={styles.titleInput}
          placeholder="Escribe un titulo..."
          placeholderTextColor={colors.border}
          value={title}
          onChangeText={setTitle}
          multiline
        />

        {/* Cuerpo */}
        <TextInput
          style={styles.bodyInput}
          placeholder="Añade un cuerpo de texto..."
          placeholderTextColor={colors.border}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        {/* Imagen */}
        <TouchableOpacity style={styles.imageUpload}>
          {image ? (
            <Image source={image} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Cargar imagen</Text>
              <View style={styles.imagePlaceholderIcon}>
                <Feather name="image" size={32} color={colors.border} />
              </View>
            </View>
          )}
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botón publicar */}
      <TouchableOpacity
        style={[styles.publishButton, !canPublish && styles.publishButtonDisabled]}
        onPress={handlePublish}
        disabled={!canPublish}
      >
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>

      {/* Modal selector comunidades */}
      <Modal
        visible={showCommunityPicker}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowCommunityPicker(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Publicar en</Text>

            {/* Todas */}
            <TouchableOpacity
              style={styles.communityOption}
              onPress={toggleAll}
            >
              <View style={[
                styles.checkbox,
                selectedCommunities.length === USER_COMMUNITIES.length && styles.checkboxSelected,
              ]}>
                {selectedCommunities.length === USER_COMMUNITIES.length && (
                  <Feather name="check" size={12} color={colors.white} />
                )}
              </View>
              <Text style={styles.communityOptionText}>Todas mis comunidades</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {USER_COMMUNITIES.map((community) => (
              <TouchableOpacity
                key={community.id}
                style={styles.communityOption}
                onPress={() => toggleCommunity(community.id)}
              >
                <View style={[
                  styles.checkbox,
                  selectedCommunities.includes(community.id) && styles.checkboxSelected,
                ]}>
                  {selectedCommunities.includes(community.id) && (
                    <Feather name="check" size={12} color={colors.white} />
                  )}
                </View>
                <View style={styles.communityOptionInfo}>
                  <Feather name="users" size={16} color={colors.textMuted} />
                  <Text style={styles.communityOptionText}>{community.name}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={() => setShowCommunityPicker(false)}
            >
              <Text style={styles.modalConfirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  communitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  communityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  communitySelectorText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '500',
  },
  communitySelectorTextSelected: {
    color: colors.text,
    fontWeight: '600',
  },
  titleInput: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  bodyInput: {
    fontSize: fontSizes.md,
    color: colors.textLight,
    minHeight: 80,
    lineHeight: 24,
  },
  imageUpload: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  imagePlaceholder: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  imagePlaceholderText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    fontWeight: '500',
  },
  imagePlaceholderIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
  },
  publishButton: {
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
  publishButtonDisabled: {
    opacity: 0.4,
  },
  publishButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
    gap: spacing.md,
    paddingBottom: 48,
  },
  modalTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  communityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  communityOptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  communityOptionText: {
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  modalConfirmButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  modalConfirmText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
});