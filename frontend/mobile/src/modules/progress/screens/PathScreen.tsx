import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { width } = Dimensions.get('window');

const LEVELS = [
    { id: 1, title: 'Reconocer', description: 'Admití que perdí el control sobre mi consumo y que mi vida se volvió difícil de manejar.' },
    { id: 2, title: 'Confiar', description: 'Empecé a creer que un poder más grande que yo puede ayudarme a recuperar la claridad.' },
    { id: 3, title: 'Entregar', description: 'Decidí confiar mi voluntad y mi vida a ese poder superior, tal como yo lo entiendo.' },
    { id: 4, title: 'Explorar', description: 'Hice una revisión sincera y profunda de mí mismo: mis actos, errores y emociones.' },
    { id: 5, title: 'Compartir', description: 'Confesé ante mí, ante otro ser humano y ante mi poder superior la verdad sobre mis fallas.' },
    { id: 6, title: 'Prepararme', description: 'Estuve dispuesto a dejar atrás mis defectos y viejas actitudes que me hacían daño.' },
    { id: 7, title: 'Pedir cambio', description: 'Le pedí humildemente a mi poder superior que me ayudara a superar esas debilidades.' },
    { id: 8, title: 'Reparar', description: 'Hice una lista de las personas a las que herí y me preparé para enmendar el daño.' },
    { id: 9, title: 'Actuar', description: 'Busqué reparar el daño directamente con quienes pude, sin causarles más dolor.' },
    { id: 10, title: 'Reflexionar', description: 'Sigo revisando mi conducta y reconozco mis errores en el momento que los cometo.' },
    { id: 11, title: 'Conectar', description: 'Busco a mi poder superior con oración o meditación para mantener claridad y dirección.' },
    { id: 12, title: 'Compartir', description: 'Después de vivir estos pasos, trato de ayudar a otros y aplicar estos principios en mi vida.' },
];

// Mock: usuario va en nivel 1, subnivel 2 (libro completado, en estrella)
const USER_PROGRESS = {
    level: 2,
    sublevel: 1, // 1=libro, 2=estrella, 3=corazon
};

// Subniveles: orden libro(1), estrella(2), corazon(3)
const SUBLEVEL_ORDER = ['libro', 'estrella', 'corazon'];

type SubnodeProps = {
    type: 'libro' | 'estrella' | 'corazon';
    state: 'completed' | 'current' | 'pending' | 'locked';
};

function SubNode({ type, state, isCurrent }: SubnodeProps & { isCurrent?: boolean }) {
    const getImage = () => {
        if (state === 'locked') return require('../../../assets/images/bloqueado.png');
        if (state === 'current') return require('../../../assets/images/actual.png');
        if (state === 'completed') {
            if (type === 'libro') return require('../../../assets/images/libro.png');
            if (type === 'estrella') return require('../../../assets/images/estrella.png');
            return require('../../../assets/images/corazon.png');
        }
        // pending
        if (type === 'libro') return require('../../../assets/images/librogris.png');
        if (type === 'estrella') return require('../../../assets/images/estrellagris.png');
        return require('../../../assets/images/corazongris.png');
    };

    return (
        <Image
            source={getImage()}
            style={[styles.subNodeImage, isCurrent && styles.subNodeImageCurrent]}
            resizeMode="contain"
        />
    );
}

const MODULE_ROUTES: Record<number, Record<number, string>> = {
    1: { 1: 'Nivel1Modulo1', 2: 'Nivel1Modulo2', 3: 'Nivel1Modulo3' },
    2: { 1: 'Nivel2Modulo1', 2: 'Nivel2Modulo2', 3: 'Nivel2Modulo3' },
    3: { 1: 'Nivel3Modulo1', 2: 'Nivel3Modulo2', 3: 'Nivel3Modulo3' },
    4: { 1: 'Nivel4Modulo1', 2: 'Nivel4Modulo2', 3: 'Nivel4Modulo3' },
    5: { 1: 'Nivel5Modulo1', 2: 'Nivel5Modulo2', 3: 'Nivel5Modulo3' },
    6: { 1: 'Nivel6Modulo1', 2: 'Nivel6Modulo2', 3: 'Nivel6Modulo3' },
    7: { 1: 'Nivel7Modulo1', 2: 'Nivel7Modulo2', 3: 'Nivel7Modulo3' },
    8: { 1: 'Nivel8Modulo1', 2: 'Nivel8Modulo2', 3: 'Nivel8Modulo3' },
    9: { 1: 'Nivel9Modulo1', 2: 'Nivel9Modulo2', 3: 'Nivel9Modulo3' },
    10: { 1: 'Nivel10Modulo1', 2: 'Nivel10Modulo2', 3: 'Nivel10Modulo3' },
    11: { 1: 'Nivel11Modulo1', 2: 'Nivel11Modulo2', 3: 'Nivel11Modulo3' },
    12: { 1: 'Nivel12Modulo1', 2: 'Nivel12Modulo2', 3: 'Nivel12Modulo3' },
};

function LevelCard({
    level,
    userProgress,
    navigation,  // agrega navigation como prop
}: {
    level: typeof LEVELS[0];
    userProgress: typeof USER_PROGRESS;
    navigation: any;
}) {
    const isCurrentLevel = userProgress.level === level.id;
    const isCompletedLevel = userProgress.level > level.id;
    const isLockedLevel = userProgress.level < level.id;
    const isDisabled = isLockedLevel;

    const handlePress = () => {
        const levelRoutes = MODULE_ROUTES[level.id];
        if (!levelRoutes) return;
        const route = levelRoutes[userProgress.sublevel];
        if (route) navigation.navigate(route);
    };

    const getSubnodeState = (sublevelIndex: number): SubnodeProps['state'] => {
        if (isLockedLevel) return 'locked';
        if (isCompletedLevel) return 'completed';
        // current level
        const completedSublevel = userProgress.sublevel - 1;
        if (sublevelIndex < completedSublevel) return 'completed';
        if (sublevelIndex === completedSublevel) return 'current';
        return 'pending';
    };

    return (
        <TouchableOpacity
            style={styles.levelWrapper}
            activeOpacity={0.8}
        >
            {/* Card */}
            <View style={[styles.levelCard, isDisabled && styles.levelCardDisabled]}>
                {/* Badge nivel */}
                <View style={[styles.nivelBadge, isDisabled && styles.nivelBadgeDisabled]}>
                    <Text style={styles.nivelBadgeText}>Nivel {level.id}</Text>
                </View>
                <Text style={[styles.levelTitle, isDisabled && styles.levelTitleDisabled]}>
                    {level.title}
                </Text>
                <Text style={[styles.levelDescription, isDisabled && styles.levelDescriptionDisabled]}>
                    {level.description}
                </Text>
            </View>

            {/* Subnodos */}
            <View style={styles.subnodesWrapper}>
                <View style={styles.subnodesTopRow}>
                    {SUBLEVEL_ORDER.slice(0, 2).map((type, i) => {
                        const state = getSubnodeState(i);
                        const route = MODULE_ROUTES[level.id]?.[i + 1];
                        return (
                            <TouchableOpacity
                                key={i}
                                disabled={state === 'locked' || state === 'pending'}
                                onPress={() => route && navigation.navigate(route)}
                                activeOpacity={0.8}
                            >
                                <SubNode
                                    type={type as SubnodeProps['type']}
                                    state={state}
                                    isCurrent={state === 'current'}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.subnodesBottomRow}>
                    {(() => {
                        const state = getSubnodeState(2);
                        const route = MODULE_ROUTES[level.id]?.[3];
                        return (
                            <TouchableOpacity
                                disabled={state === 'locked' || state === 'pending'}
                                onPress={() => route && navigation.navigate(route)}
                                activeOpacity={0.8}
                            >
                                <SubNode
                                    type={SUBLEVEL_ORDER[2] as SubnodeProps['type']}
                                    state={state}
                                    isCurrent={state === 'current'}
                                />
                            </TouchableOpacity>
                        );
                    })()}
                </View>
            </View>

            {/* Conector hacia abajo */}
            {level.id < 12 && (
                <View style={styles.connector} />
            )}
        </TouchableOpacity>
    );
}

export default function PathScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Feather name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Tu camino</Text>
                    <Text style={styles.headerSubtitle}>Basado en los 12 pasos de AA</Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {LEVELS.map((level) => (
                    <LevelCard
                        key={level.id}
                        level={level}
                        userProgress={USER_PROGRESS}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
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
        paddingBottom: spacing.xl,
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    levelWrapper: {
        alignItems: 'center',
        width: '100%',
        marginBottom: spacing.xl,
    },
    levelCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        paddingTop: spacing.xl,
        width: '70%',
        alignItems: 'center',
        gap: spacing.xs,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        position: 'relative',
    },
    levelCardDisabled: {
        backgroundColor: '#F0F0F0',
        elevation: 0,
        shadowOpacity: 0,
    },
    nivelBadge: {
        position: 'absolute',
        top: -16,
        backgroundColor: colors.accent,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: 4,
    },
    nivelBadgeDisabled: {
        backgroundColor: '#AAAAAA',
    },
    nivelBadgeText: {
        fontSize: fontSizes.lg,
        color: colors.white,
        fontWeight: '700',
    },
    levelTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
    },
    levelTitleDisabled: {
        color: '#AAAAAA',
    },
    levelDescription: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 20,
    },
    levelDescriptionDisabled: {
        color: '#BBBBBB',
    },
    subnodesRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.xl,
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    subNodeImage: {
        width: 70,
        height: 70,
    },
    connector: {
        width: 2,
        height: 24,
        marginBottom: spacing.xs,
    },
    subnodesWrapper: {
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    subnodesTopRow: {
        flexDirection: 'row',
        gap: spacing.xl,
        marginBottom: spacing.sm,
        alignItems: 'flex-end',
    },
    subnodesBottomRow: {
        alignItems: 'center',
    },
    subNodeImageCurrent: {
        width: 105,
        height: 105,
    },
});