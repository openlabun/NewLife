import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Message = {
  id: string;
  text: string;
  isOwn: boolean;
  time: string;
  date?: string;
};

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'EStoy viajando', isOwn: true, time: '10:00' },
  { id: '2', text: 'Hola que mas', isOwn: false, time: '10:01' },
  { id: '3', text: 'Esta lloviendo???', isOwn: false, time: '10:02' },
  { id: '4', text: 'EStoy viajando', isOwn: true, time: '10:03', date: 'Domingo 14 de noviembre, 2025' },
  { id: '5', text: 'Hola que mas', isOwn: false, time: '10:04' },
  { id: '6', text: 'Esta lloviendo???', isOwn: false, time: '10:05' },
  { id: '7', text: 'EStoy viajando', isOwn: true, time: '10:06' },
];

export default function CommunityChatScreen({ navigation, route }: any) {
  const { community } = route.params;
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      text: text.trim(),
      isOwn: true,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerAvatar}>
          <Feather name="user" size={18} color={colors.textMuted} />
        </View>
        <Text style={styles.headerTitle}>{community.name}</Text>
      </View>

      {/* Mensajes */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesScroll}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((msg) => (
          <View key={msg.id}>
            {msg.date && (
              <Text style={styles.dateSeparator}>{msg.date}</Text>
            )}
            <View style={[styles.messageRow, msg.isOwn && styles.messageRowOwn]}>
              <View style={[styles.bubble, msg.isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
                <Text style={[styles.bubbleText, msg.isOwn && styles.bubbleTextOwn]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: spacing.sm }} />
      </ScrollView>

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Escribir..."
          placeholderTextColor={colors.textMuted}
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Feather name="camera" size={20} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!text.trim()}
        >
          <Feather name="play" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: fontSizes.md, fontWeight: '700', color: colors.text },
  messagesScroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  dateSeparator: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  messageRowOwn: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubbleOther: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  bubbleOwn: {
    backgroundColor: '#C8D8F5',
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    lineHeight: 20,
  },
  bubbleTextOwn: {
    color: colors.text,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    paddingBottom: Platform.OS === 'ios' ? 32 : spacing.md,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.white,
    paddingVertical: spacing.xs,
  },
  cameraButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});