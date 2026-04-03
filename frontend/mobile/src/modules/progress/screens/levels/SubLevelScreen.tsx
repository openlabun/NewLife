import React, { useMemo, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, Dimensions, TextInput, Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

const CHARACTERS = [
    require('../../../../assets/images/character1.png'),
    require('../../../../assets/images/character2.png'),
    require('../../../../assets/images/character3.png'),
    require('../../../../assets/images/character4.png'),
    require('../../../../assets/images/character5.png'),
    require('../../../../assets/images/character6.png'),
    require('../../../../assets/images/character7.png'),
    require('../../../../assets/images/character8.png'),
    require('../../../../assets/images/character9.png'),
    require('../../../../assets/images/character10.png'),
    require('../../../../assets/images/character11.png'),
];

function getRandomCharacter() {
    return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

type Props = {
    moduleNumber: number;
    currentStep: number;
    totalSteps: number;
    children: React.ReactNode;
    onBack: () => void;
    onContinue: () => void;
    continueLabel?: string;
    mascot: any;
    showIntro?: boolean;
    introTitle?: string;
    introDescription?: string;
};


const QuoteIcon = () => (
    <View style={styles.quoteCircle}>
        <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
                d="M11 7C11 9.5 10 10.5 7.5 10.5C5 10.5 4 11.5 4 14V16.5H7.5C10 16.5 11 15.5 11 13V7Z"
                fill="#FFF"
            />
            <Path
                d="M20 7C20 9.5 19 10.5 16.5 10.5C14 10.5 13 11.5 13 14V16.5H16.5C19 16.5 20 15.5 20 13V7Z"
                fill="#FFF"
            />
        </Svg>
    </View>
);

const Sparkle = ({ style }: { style?: any }) => (
    <View style={style}>
        <Svg width={14} height={14} viewBox="0 0 24 24">
            <Path
                d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z"
                fill="#D38A58"
                opacity={0.4}
            />
        </Svg>
    </View>
);

const FloatingDot = ({ delay, style }: { delay: number; style?: any }) => {
    const scale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(scale, { toValue: 1.1, duration: 1200, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 0.8, duration: 1200, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return <Animated.View style={[styles.floatingDot, style, { transform: [{ scale }] }]} />;
};

export default function SubLevelScreen({
    currentStep,
    totalSteps,
    children,
    onBack,
    onContinue,
    continueLabel = 'Continuar',
    mascot,
    showIntro,
    introTitle,
    introDescription,
    moduleNumber,
}: Props) {
    const progress = currentStep / totalSteps;

    if (showIntro) {
        return (
            <View style={Phrasestyles.container}>
                <View style={Phrasestyles.header}>
                    <TouchableOpacity onPress={onBack}>
                        <Feather name="chevron-left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View style={Phrasestyles.progressBarWrapper}>
                        <View style={[Phrasestyles.progressBarFill, { width: `${progress * 100}%` }]} />
                    </View>
                </View>

                <View style={Phrasestyles.introContent}>
                    <View style={Phrasestyles.moduleBadge}>
                        <Text style={Phrasestyles.moduleBadgeText}>Módulo {moduleNumber}</Text>
                    </View>
                    <Text style={Phrasestyles.introTitle}>{introTitle}</Text>
                    <Text style={Phrasestyles.introDescription}>{introDescription}</Text>
                </View>

                <Image source={mascot} style={Phrasestyles.mascotIntro} resizeMode="contain" />

                <TouchableOpacity style={Phrasestyles.mainButton} onPress={onContinue}>
                    <Text style={Phrasestyles.mainButtonText}>{continueLabel}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={Phrasestyles.container}>
            <View style={Phrasestyles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Feather name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View style={Phrasestyles.progressBarWrapper}>
                    <View style={[Phrasestyles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>
            </View>

            <ScrollView
                contentContainerStyle={Phrasestyles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {children}
                <View style={{ height: 100 }} />
            </ScrollView>

            <TouchableOpacity style={Phrasestyles.mainButton} onPress={onContinue}>
                <Text style={Phrasestyles.mainButtonText}>{continueLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}

// Burbuja + mascota aleatoria
export function MascotBubble({ text }: { text: string }) {
    const character = useMemo(() => getRandomCharacter(), []);

    return (
        <View style={bubbleStyles.row}>
            <Image source={character} style={bubbleStyles.mascot} resizeMode="contain" />
            <View style={bubbleStyles.bubbleWrapper}>
                <View style={bubbleStyles.bubble}>
                    <Text style={bubbleStyles.text}>{text}</Text>
                </View>
                <View style={bubbleStyles.tail} />
            </View>
        </View>
    );
}

// Frase reflexiva
export function ReflectivePhrase({ text, author }: { text: string; author?: string }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 450,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 450,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.card,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                {/* Decoraciones sutiles */}
                <Sparkle style={styles.sparkle1} />
                <Sparkle style={styles.sparkle2} />
                <FloatingDot delay={0} style={styles.dot1} />
                <FloatingDot delay={400} style={styles.dot2} />
                <FloatingDot delay={800} style={styles.dot3} />

                {/* Circulo decorativo de fondo */}
                <View style={styles.bgCircle} />

                {/* Header con icono */}
                <View style={styles.header}>
                    <QuoteIcon />
                    <Text style={styles.headerText}>Reflexiona</Text>
                </View>

                {/* Caja de la frase */}
                <View style={styles.quoteBox}>
                    <Text style={styles.quoteText}>{text}</Text>
                </View>

                {/* Autor */}
                {author && (
                    <View style={styles.authorContainer}>
                        <View style={styles.authorDot} />
                        <Text style={styles.authorText}>{author}</Text>
                    </View>
                )}

                {/* Indicadores de navegacion */}
                <View style={styles.indicators}>
                    <View style={[styles.indicator, styles.indicatorActive]} />
                    <View style={[styles.indicator, styles.indicatorActive]} />
                    <View style={[styles.indicator, styles.indicatorActive]} />
                </View>
            </Animated.View>
        </View>
    );
}


// Componente de opción múltiple
export function MultipleChoice({
    question,
    options,
    selected,
    onSelect,
    multiple = false,
}: {
    question?: string;
    options: string[];
    selected: string | string[] | null;
    onSelect: (val: string) => void;
    multiple?: boolean;
}) {
    const isSelected = (opt: string) =>
        multiple
            ? Array.isArray(selected) && selected.includes(opt)
            : selected === opt;

    return (
        <View style={choiceStyles.wrapper}>
            {question && <Text style={choiceStyles.question}>{question}</Text>}
            {options.map((opt) => (
                <TouchableOpacity
                    key={opt}
                    style={[choiceStyles.option, isSelected(opt) && choiceStyles.optionSelected]}
                    onPress={() => onSelect(opt)}
                    activeOpacity={0.8}
                >
                    <Text style={[choiceStyles.optionText, isSelected(opt) && choiceStyles.optionTextSelected]}>
                        {opt}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

// Pregunta abierta
export function OpenQuestion({
    placeholder,
    value,
    onChange,
}: {
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <TextInput
            style={openStyles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.border}
            value={value}
            onChangeText={onChange}
            multiline
            textAlignVertical="top"
        />
    );
}

// Completar frase
export function CompleteSentence({
    prefix,
    value,
    onChange,
}: {
    prefix: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <View style={sentenceStyles.wrapper}>
            <Text style={sentenceStyles.prefix}>{prefix}</Text>
            <TextInput
                style={sentenceStyles.input}
                placeholder="Escribe aquí..."
                placeholderTextColor={colors.border}
                value={value}
                onChangeText={onChange}
                multiline
                textAlignVertical="top"
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 180,
    },
    card: {
        width: width - 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#D38A58',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 6,
    },
    bgCircle: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(211, 138, 88, 0.08)',
    },
    sparkle1: {
        position: 'absolute',
        top: 20,
        right: 70,
    },
    sparkle2: {
        position: 'absolute',
        bottom: 60,
        left: 20,
    },
    floatingDot: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(211, 138, 88, 0.25)',
    },
    dot1: {
        top: 50,
        left: 30,
    },
    dot2: {
        top: 80,
        right: 40,
    },
    dot3: {
        bottom: 90,
        right: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quoteCircle: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#D38A58',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 13,
        color: '#D38A58',
        fontWeight: '600',
        marginLeft: 12,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    quoteBox: {
        padding: 22,
    },
    quoteText: {
        fontSize: 17,
        color: '#3D3D3D',
        lineHeight: 28,
        fontWeight: '500',
        textAlign: 'center',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    authorDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#D38A58',
        marginRight: 10,
    },
    authorText: {
        fontSize: 14,
        color: '#8B7355',
        fontWeight: '600',
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        gap: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(211, 138, 88, 0.2)',
    },
    indicatorActive: {
        backgroundColor: '#D38A58',
        width: 8,
    },
});


const Phrasestyles = StyleSheet.create({
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
    progressBarWrapper: {
        flex: 1,
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.accent,
        borderRadius: 3,
    },
    introContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        alignItems: 'center',
    },
    introTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    introDescription: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 24,
    },
    mascotIntro: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center',
        marginBottom: spacing.xxl,
    },
    scroll: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
    },
    mainButton: {
        position: 'absolute',
        bottom: 32,
        left: spacing.xl,
        right: spacing.xl,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.full,
        paddingVertical: spacing.md,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    mainButtonText: {
        color: colors.white,
        fontSize: fontSizes.lg,
        fontWeight: '700',
    },
    moduleBadge: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    moduleBadgeText: {
        fontSize: fontSizes.sm,
        color: colors.text,
        fontWeight: '600',
    },
});

const bubbleStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    mascot: {
        width: 110,
        height: 110,
    },
    bubbleWrapper: {
        flex: 1,
    },
    bubble: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        borderBottomLeftRadius: 4,
        padding: spacing.md,
    },
    tail: {
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderTopColor: colors.primary,
        borderRightColor: 'transparent',
        marginTop: -1,
    },
    text: {
        color: colors.white,
        fontSize: fontSizes.md,
        lineHeight: 20,
        fontWeight: '500',
    },
});

const phraseStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.xl,
        marginVertical: spacing.md,
    },
    quoteOpen: {
        fontSize: 64,
        color: colors.accent,
        fontWeight: '800',
        lineHeight: 56,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: fontSizes.lg,
        color: colors.text,
        textAlign: 'center',
        lineHeight: 28,
        fontStyle: 'italic',
        fontWeight: '500',
        marginVertical: spacing.sm,
    },
    quoteClose: {
        fontSize: 64,
        color: colors.accent,
        fontWeight: '800',
        lineHeight: 56,
        alignSelf: 'flex-end',
    },
});



const choiceStyles = StyleSheet.create({
    wrapper: {
        marginVertical: spacing.sm,
    },
    question: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    option: {
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        backgroundColor: colors.white,
        marginBottom: spacing.xs,
    },
    optionSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    optionText: {
        fontSize: fontSizes.md,
        color: colors.text,
        fontWeight: '500',
    },
    optionTextSelected: {
        color: colors.white,
        fontWeight: '700',
    },
});

const openStyles = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSizes.md,
        color: colors.text,
        height: 120,
        borderWidth: 1,
        borderColor: colors.border,
        marginVertical: spacing.sm,
        textAlignVertical: 'top',
    },
});

const sentenceStyles = StyleSheet.create({
    wrapper: {
        marginVertical: spacing.sm,
    },
    prefix: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSizes.md,
        color: colors.text,
        height: 100,
        borderWidth: 1,
        borderColor: colors.border,
        textAlignVertical: 'top',
    },
});