import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.xl * 2;

const EMOTIONS = [
    { id: '1', emoji: '😇', label: 'Tranquilo' },
    { id: '2', emoji: '😄', label: 'Animado' },
    { id: '3', emoji: '😐', label: 'Normal' },
    { id: '4', emoji: '😔', label: 'Bajoneado' },
    { id: '5', emoji: '😰', label: 'Ansioso' },
    { id: '6', emoji: '🤯', label: 'Saturado' },
    { id: '7', emoji: '😡', label: 'Irritado' },
];

const LOCATIONS = [
    { id: '1', emoji: '🏠', label: 'En mi casa' },
    { id: '2', emoji: '🏡', label: 'En casa de un amigo' },
    { id: '3', emoji: '🏙️', label: 'En el barrio / calle' },
    { id: '4', emoji: '🎓', label: 'En la universidad' },
    { id: '5', emoji: '🪩', label: 'En un bar o disco' },
];

const SOCIALS = [
    { id: '1', emoji: '🧍', label: 'Solo' },
    { id: '2', emoji: '👫', label: 'Con amigos' },
    { id: '3', emoji: '💝', label: 'Con mi pareja' },
    { id: '4', emoji: '👥', label: 'Con gente del trabajo' },
    { id: '5', emoji: '🎒', label: 'Con gente de la uni' },
    { id: '6', emoji: '👤', label: 'Con desconocidos' },
];

function BlobCard({ children, badge }: { children: React.ReactNode; badge: string }) {
    const [cardHeight, setCardHeight] = useState(200);

    return (
        <View style={styles.cardWrapper}>
            <View style={styles.badgeFloating}>
                <Text style={styles.badgeText}>{badge}</Text>
            </View>
            <View style={{ width: CARD_WIDTH, height: cardHeight }}>
                <Svg
                    width={CARD_WIDTH}
                    height={cardHeight}
                    viewBox="0 0 300 414"
                    preserveAspectRatio="none"
                    style={[StyleSheet.absoluteFill, styles.cardShadow]}
                >
                    <Path
                        d="M151.451 0.5C188.662 0.57261 238.886 9.3057 270.96 15.7598C288.76 19.3417 300.646 35.874 299.16 53.9941C295.669 96.5513 290.114 172.594 290.114 225.545C290.114 273.408 294.653 326.271 298.103 359.546C300.048 378.298 287.827 395.711 269.337 399.226C236.887 405.393 186.994 413.534 149.912 413.5C112.491 413.465 61.9364 405.08 29.7615 398.903C12.0076 395.495 -0.0354135 379.229 1.09839 361.163C3.21462 327.442 6.11401 272.657 6.11401 225.545C6.11401 172.578 2.66698 95.3912 0.546631 52.9199C-0.334995 35.2607 11.4389 19.5004 28.7517 16.0137C61.174 9.48396 113.125 0.425265 151.451 0.5Z"
                        fill="white"
                        stroke="#E3E3E3"
                        strokeWidth="1"
                    />
                </Svg>
                <View
                    style={styles.cardContent}
                    onLayout={(e) => setCardHeight(e.nativeEvent.layout.height + 20)}
                >
                    {children}
                </View>
            </View>
        </View>
    );
}

function Step1({ onNo, onYes }: { onNo: () => void; onYes: () => void }) {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [consumed, setConsumed] = useState<boolean | null>(null);

    return (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <BlobCard badge="Emociones">
                <Text style={styles.cardQuestion}>¿Cómo te sientes hoy?</Text>
                {EMOTIONS.map((e) => (
                    <TouchableOpacity
                        key={e.id}
                        style={[styles.optionRow, selectedEmotion === e.id && styles.optionRowSelected]}
                        onPress={() => setSelectedEmotion(e.id)}
                    >
                        <Text style={styles.optionEmoji}>{e.emoji}</Text>
                        <Text style={[styles.optionLabel, selectedEmotion === e.id && styles.optionLabelSelected]}>
                            {e.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </BlobCard>

            <BlobCard badge="Consumo">
                <Text style={styles.cardQuestion}>¿Consumiste alcohol hoy?</Text>
                <View style={styles.yesNoRow}>
                    <TouchableOpacity
                        style={[styles.yesNoButton, consumed === true && styles.yesNoSelected]}
                        onPress={() => setConsumed(true)}
                    >
                        <Text style={[styles.yesNoText, consumed === true && styles.yesNoTextSelected]}>Sí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.yesNoButton, consumed === false && styles.yesNoSelected]}
                        onPress={() => setConsumed(false)}
                    >
                        <Text style={[styles.yesNoText, consumed === false && styles.yesNoTextSelected]}>No</Text>
                    </TouchableOpacity>
                </View>
            </BlobCard>

            <TouchableOpacity
                style={[styles.mainButton, consumed === null && styles.mainButtonDisabled]}
                disabled={consumed === null}
                onPress={() => consumed ? onYes() : onNo()}
            >
                <Text style={styles.mainButtonText}>Continuar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function Step2({ onContinue }: { onContinue: () => void }) {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
    const [reflection, setReflection] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <BlobCard badge="Ubicacion">
                <Text style={styles.cardQuestion}>¿Dónde estabas?</Text>
                {LOCATIONS.map((l) => (
                    <TouchableOpacity
                        key={l.id}
                        style={[styles.optionRow, selectedLocation === l.id && styles.optionRowSelected]}
                        onPress={() => setSelectedLocation(l.id)}
                    >
                        <Text style={styles.optionEmoji}>{l.emoji}</Text>
                        <Text style={[styles.optionLabel, selectedLocation === l.id && styles.optionLabelSelected]}>
                            {l.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </BlobCard>

            <BlobCard badge="Social">
                <Text style={styles.cardQuestion}>¿Con quién estabas?</Text>
                {SOCIALS.map((s) => (
                    <TouchableOpacity
                        key={s.id}
                        style={[styles.optionRow, selectedSocial === s.id && styles.optionRowSelected]}
                        onPress={() => setSelectedSocial(s.id)}
                    >
                        <Text style={styles.optionEmoji}>{s.emoji}</Text>
                        <Text style={[styles.optionLabel, selectedSocial === s.id && styles.optionLabelSelected]}>
                            {s.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </BlobCard>

            <BlobCard badge="Reflexión">
                <Text style={styles.cardQuestion}>¿Qué podrías hacer diferente la próxima vez?</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Escribir aquí..."
                    placeholderTextColor={colors.border}
                    value={reflection}
                    onChangeText={setReflection}
                    multiline
                    textAlignVertical="top"
                />
            </BlobCard>

            <TouchableOpacity style={styles.mainButton} onPress={onContinue}>
                <Text style={styles.mainButtonText}>Continuar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function Step3({ onFinish }: { onFinish: () => void }) {
    const [gratitude, setGratitude] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <BlobCard badge="Gratitud">
                <Text style={styles.cardQuestion}>¿Qué agradeces hoy, por pequeño que sea?</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Escribe algo bueno del día, aunque sea mínimo..."
                    placeholderTextColor={colors.border}
                    value={gratitude}
                    onChangeText={setGratitude}
                    multiline
                    textAlignVertical="top"
                />
            </BlobCard>

            <TouchableOpacity style={styles.mainButton} onPress={onFinish}>
                <Text style={styles.mainButtonText}>Finalizar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default function DailyCheckInScreen({ navigation }: any) {
    const [step, setStep] = useState(1);
    const [consumedAlcohol, setConsumedAlcohol] = useState<boolean | null>(null);

    const handleBack = () => {
        if (step === 1) {
            navigation.goBack();
        } else if (step === 3 && consumedAlcohol === false) {
            setStep(1);
        } else {
            setStep(step - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Feather name="chevron-left" size={24} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Text>
            </View>

            {step === 1 && (
                <Step1
                    onNo={() => { setConsumedAlcohol(false); setStep(3); }}
                    onYes={() => { setConsumedAlcohol(true); setStep(2); }}
                />
            )}
            {step === 2 && <Step2 onContinue={() => setStep(3)} />}
            {step === 3 && <Step3 onFinish={() => navigation.replace('CheckInSuccess')} />}
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
        backgroundColor: '#303030',
        borderBottomLeftRadius: 34,
        borderBottomRightRadius: 34,
    },
    headerTitle: {
        flex: 1,
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.white,
        textAlign: 'center',
        marginRight: 24,
    },
    scroll: {
        paddingHorizontal: spacing.xl,
        paddingBottom: 40,
        paddingTop: spacing.lg,
    },
    cardWrapper: {
        position: 'relative',
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 6,
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 6,
    },
    badgeFloating: {
        position: 'absolute',
        top: -18,
        left: spacing.lg,
        zIndex: 1,
        backgroundColor: colors.accent,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
        transform: [{ rotate: '-2deg' }],
    },
    badgeText: {
        fontSize: fontSizes.md,
        color: colors.white,
        fontWeight: '700',
    },
    cardContent: {
        padding: spacing.lg,
        paddingTop: spacing.xl,
    },
    cardQuestion: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.white,
        marginBottom: spacing.xs,
    },
    optionRowSelected: {
        borderColor: colors.accent,
        backgroundColor: '#FDF3EC',
    },
    optionEmoji: {
        fontSize: 20,
    },
    optionLabel: {
        fontSize: fontSizes.md,
        color: colors.text,
    },
    optionLabelSelected: {
        color: colors.accent,
        fontWeight: '600',
    },
    yesNoRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    yesNoButton: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    yesNoSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    yesNoText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.text,
    },
    yesNoTextSelected: {
        color: colors.white,
    },
    textArea: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSizes.md,
        color: colors.text,
        height: 120,
        borderWidth: 1,
        borderColor: colors.border,
    },
    mainButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.full,
        paddingVertical: spacing.md,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    mainButtonDisabled: {
        opacity: 0.4,
    },
    mainButtonText: {
        color: colors.white,
        fontSize: fontSizes.lg,
        fontWeight: '700',
    },
});