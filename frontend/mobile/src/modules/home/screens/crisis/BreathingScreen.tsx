import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';

const PHASES = [
    { label: 'Inhala', duration: 4 },
    { label: 'Sostén', duration: 4 },
    { label: 'Exhala', duration: 5 },
];

const SOUNDS = [
    { id: '1', label: 'Lluvia', icon: 'cloud-rain' },
    { id: '2', label: 'Olas del mar', icon: 'wind' },
    { id: '3', label: 'Viento', icon: 'cloud' },
    { id: '4', label: 'Fuego', icon: 'zap' },
    { id: '5', label: 'Pájaros', icon: 'feather' },
];

export default function BreathingScreen({ navigation }: any) {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState(PHASES[0].duration);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedSound, setSelectedSound] = useState('1');
    const [progress, setProgress] = useState(0);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0.6)).current;
    const intervalRef = useRef<any>(null);
    const animRef = useRef<any>(null);
    const phaseRef = useRef(0);

    const totalDuration = PHASES.reduce((acc, p) => acc + p.duration, 0);
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startBreathing();
        return () => {
            clearInterval(intervalRef.current);
            animRef.current?.stop();
        };
    }, []);

    const startBreathing = () => {
        setIsPlaying(true);
        runPhase(0);
    };

    const runPhase = (index: number) => {
        phaseRef.current = index;
        const phase = PHASES[index];
        setPhaseIndex(index);
        setCountdown(phase.duration);

        const toScale = index === 0 ? 1.5 : index === 1 ? 1.5 : 1;
        const toGlow = index === 0 ? 1 : index === 1 ? 1 : 0.6;

        animRef.current = Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: toScale,
                duration: phase.duration * 1000,
                useNativeDriver: true,
            }),
            Animated.timing(glowAnim, {
                toValue: toGlow,
                duration: phase.duration * 1000,
                useNativeDriver: true,
            }),
        ]);
        animRef.current.start();

        let remaining = phase.duration;
        intervalRef.current = setInterval(() => {
            remaining -= 1;
            setCountdown(remaining);
            if (remaining <= 0) {
                clearInterval(intervalRef.current);
                const next = (index + 1) % PHASES.length;
                runPhase(next);
            }
        }, 1000);
    };

    const currentPhase = PHASES[phaseIndex];

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Modo Zen</Text>
                </View>
            </View>

            <Text style={styles.title}>Respira</Text>
            <Text style={styles.subtitle}>Encuentra la calma</Text>

            {/* Círculo con degradado y glow */}
            <View style={styles.circleWrapper}>
                <Animated.View style={[styles.glowRing, { opacity: glowAnim }]} />
                <Animated.View style={[styles.circleContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <LinearGradient
                        colors={['#7986CB', '#3F51B5', '#1A237E']}
                        style={styles.circle}
                        start={{ x: 0.2, y: 0 }}
                        end={{ x: 0.8, y: 1 }}
                    >
                        <Text style={styles.circleLabel}>{currentPhase.label}</Text>
                    </LinearGradient>
                </Animated.View>
            </View>

            {/* Countdown */}
            <Text style={styles.countdown}>{countdown}</Text>
            <Text style={styles.countdownLabel}>
                {currentPhase.label} en {countdown}s
            </Text>

            {/* Selector de sonidos */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.soundsList}
                style={styles.soundsScroll}
            >
                {SOUNDS.map((sound) => {
                    const isSelected = selectedSound === sound.id;
                    return (
                        <TouchableOpacity
                            key={sound.id}
                            style={[styles.soundChip, isSelected && styles.soundChipSelected]}
                            onPress={() => setSelectedSound(sound.id)}
                        >
                            <Icon name={sound.icon} size={14} color={isSelected ? colors.white : colors.text} />
                            <Text style={[styles.soundChipText, isSelected && styles.soundChipTextSelected]}>
                                {sound.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Barra de reproducción + controles */}
            <View style={styles.playerContainer}>
                {/* Barra de progreso */}
                <View style={styles.progressBar}>
                    <Animated.View style={[styles.progressFill, { width: `${(1 - countdown / currentPhase.duration) * 100}%` }]} />
                </View>
                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>0:00</Text>
                    <Text style={styles.timeText}>∞</Text>
                </View>

                {/* Controles */}
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlButtonSecondary}>
                        <Icon name="rotate-ccw" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.controlButtonPrimary}
                        onPress={() => {
                            if (isPlaying) {
                                clearInterval(intervalRef.current);
                                animRef.current?.stop();
                                setIsPlaying(false);
                            } else {
                                startBreathing();
                            }
                        }}
                    >
                        <Icon name={isPlaying ? 'pause' : 'play'} size={24} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButtonSecondary}>
                        <Icon name="rotate-cw" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Link */}
            <TouchableOpacity onPress={() => navigation.navigate('MotivationalPhrasesScreen')}>
                <Text style={styles.link}>Ir a frases motivacionales</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 60,
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: spacing.md,
    },
    badge: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
    },
    badgeText: {
        fontSize: fontSizes.sm,
        color: colors.text,
        fontWeight: '600',
    },
    title: {
        fontSize: fontSizes.xxl,
        fontWeight: '800',
        color: colors.text,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },
    circleWrapper: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    glowRing: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#5C6BC0',
        shadowColor: '#5C6BC0',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 20,
    },
    circleContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
    },
    circle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleLabel: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.white,
    },
    countdown: {
        fontSize: fontSizes.xxl,
        fontWeight: '800',
        color: colors.text,
    },
    countdownLabel: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },
    soundsScroll: {
        width: '100%',
        marginBottom: spacing.sm,
        flexGrow: 0,
    },
    soundsList: {
        gap: spacing.sm,
        paddingHorizontal: 2,
    },
    soundChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: colors.white,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: colors.border,
        height: 32,
    },
    soundChipSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    soundChipText: {
        fontSize: fontSizes.xs,
        color: colors.text,
        fontWeight: '500',
    },
    soundChipTextSelected: {
        color: colors.white,
    },
    playerContainer: {
        padding: spacing.xl,
        paddingTop: spacing.xxl,
        width: '100%',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    progressBar: {

        width: '100%',
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xl,
    },
    controlButtonPrimary: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    controlButtonSecondary: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        fontSize: fontSizes.sm,
        color: colors.accent,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});