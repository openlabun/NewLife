import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList,
    PanResponder, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import MeditationCard from '../../componets/MeditationCard';



const SKIP_SECONDS = 10;
const { width } = Dimensions.get('window');
const PROGRESS_WIDTH = width - spacing.xl * 2;

type Meditation = {
    id: string;
    title: string;
    duration: string;
    image: any;
};

const MEDITATIONS: Meditation[] = [
    { id: '1', title: 'Montar la ola del deseo', duration: '15:00', image: require('../../../../assets/images/meditation1.jpg') },
    { id: '2', title: 'Cambia el foco', duration: '10:00', image: require('../../../../assets/images/meditation2.jpg') },
    { id: '3', title: 'Mis razones', duration: '12:00', image: require('../../../../assets/images/meditation3.jpg') },
];

export default function GuidedMeditationScreen({ navigation }: any) {
    const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef<any>(null);

    const selectMeditation = (meditation: Meditation) => {
        clearInterval(intervalRef.current);
        setSelectedMeditation(meditation);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const getDurationSeconds = (duration: string) => {
        const [m, s] = duration.split(':').map(Number);
        return m * 60 + s;
    };

    const togglePlay = () => {
        if (!selectedMeditation) return;
        if (isPlaying) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    const total = getDurationSeconds(selectedMeditation.duration);
                    if (prev >= total) {
                        clearInterval(intervalRef.current);
                        setIsPlaying(false);
                        return total;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
    };

    const skipBack = () => {
        setCurrentTime(prev => Math.max(0, prev - SKIP_SECONDS));
    };

    const skipForward = () => {
        if (!selectedMeditation) return;
        const total = getDurationSeconds(selectedMeditation.duration);
        setCurrentTime(prev => Math.min(total, prev + SKIP_SECONDS));
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progress = selectedMeditation
        ? currentTime / getDurationSeconds(selectedMeditation.duration)
        : 0;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (e) => {
                if (!selectedMeditation) return;
                const total = getDurationSeconds(selectedMeditation.duration);
                const x = e.nativeEvent.locationX;
                const newProgress = Math.max(0, Math.min(1, x / PROGRESS_WIDTH));
                setCurrentTime(Math.floor(newProgress * total));
            },
            onPanResponderMove: (e) => {
                if (!selectedMeditation) return;
                const total = getDurationSeconds(selectedMeditation.duration);
                const x = e.nativeEvent.locationX;
                const newProgress = Math.max(0, Math.min(1, x / PROGRESS_WIDTH));
                setCurrentTime(Math.floor(newProgress * total));
            },
        })
    ).current;

    if (selectedMeditation) {
        return (
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setSelectedMeditation(null)}>
                        <Icon name="chevron-left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="heart" size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="download" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Player */}
                <View style={styles.playerContent}>
                    <Text style={styles.playerTitle}>Escucha...</Text>
                    <Text style={styles.playerSubtitle}>{selectedMeditation.title}</Text>

                    {/* Controles */}
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={skipBack}>
                            <View style={styles.skipButton}>
                                <Icon name="rotate-ccw" size={20} color="#406ADF" />
                                <Text style={styles.skipText}>10</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                            <Icon name={isPlaying ? 'pause' : 'play'} size={24} style={!isPlaying ? { marginLeft: 5 } : undefined} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipForward}>
                            <View style={styles.skipButton}>
                                <Icon name="rotate-cw" size={20} color="#406ADF" />
                                <Text style={styles.skipText}>10</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Barra de progreso */}
                    <View style={styles.progressContainer}>
                        <View
                            style={styles.progressBar}
                            {...panResponder.panHandlers}
                        >
                            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                            <View style={[styles.progressThumb, { left: `${Math.min(progress * 100, 97)}%` }]} />
                        </View>
                        <View style={styles.timeRow}>
                            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                            <Text style={styles.timeText}>{selectedMeditation.duration}</Text>
                        </View>
                    </View>
                </View>

                {/* Salir */}
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('BreathingScreen')}>
                    <Text style={styles.exitText}>Ir al modo zen</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Practica guiada</Text>
                </View>
            </View>

            {/* Lista */}
            <FlatList
                data={MEDITATIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MeditationCard
                        title={item.title}
                        image={item.image}
                        onPress={() => selectMeditation(item)}
                    />
                )}
            />

            {/* Salir */}
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('BreathingScreen')}>
                <Text style={styles.exitText}>Ir al modo zen</Text>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    headerRight: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.text,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
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
    list: {
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    playerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xl,
    },
    playerTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '800',
        color: colors.text,
    },
    playerSubtitle: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: -spacing.md,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xl,
    },
    playButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#406ADF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#5C6BC0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    skipButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipText: {
        fontSize: fontSizes.xs,
        color: "#406ADF",
        marginTop: 2,
    },
    progressContainer: {
        width: '100%',
        gap: spacing.xs,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        position: 'relative',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#406ADF',
        borderRadius: 3,
    },
    progressThumb: {
        position: 'absolute',
        top: -5,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#406ADF',
        marginLeft: -8,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    exitButton: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    exitText: {
        fontSize: fontSizes.sm,
        color: colors.accent,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});