import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const GRATITUDE_ENTRIES = [
    { id: '1', date: '5 oct 2025', text: 'Agradezco que salí con mis amigos sin tomar.' },
    { id: '2', date: '4 oct 2025', text: 'Agradezco haber dormido bien y despertado tranquilo.' },
    { id: '3', date: '3 oct 2025', text: 'Agradezco el apoyo de mi familia hoy.' },
];

export default function ProgressScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.title}>Mi progreso</Text>
                <Text style={styles.subtitle}>Avanza y descubre cómo has progresado.</Text>

                {/* Tu camino */}
                <TouchableOpacity style={styles.sectionHeader} onPress={() => navigation.navigate('Path')}>
                    <Text style={styles.sectionTitle}>Tu camino</Text>
                    <Feather name="chevron-right" size={18} color={colors.text} />
                </TouchableOpacity>

                <View style={styles.caminoWrapper}>
                    {/* Personaje fuera a la izquierda */}
                    <View style={styles.caminoLeft}>
                        <Image
                            source={require('../../../assets/images/character_progreso.png')}
                            style={styles.characterImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.moduleLabel}>Modulo 2*</Text>
                    </View>

                    {/* Cuadro de texto con badge encima */}
                    <View style={styles.caminoCard}>
                        <View style={styles.nivelBadgeWrapper}>
                            <View style={styles.nivelBadge}>
                                <Text style={styles.nivelBadgeText}>Nivel 1</Text>
                            </View>
                        </View>
                        <Text style={styles.caminoTitle}>Reconocer</Text>
                        <Text style={styles.caminoDescription}>
                            Reconocí que mi consumo me superó y afectó mi vida.
                        </Text>
                    </View>
                </View>

                {/* Historial de gratitud */}
                <TouchableOpacity style={styles.sectionHeader} onPress={() => navigation.navigate('GratitudeHistory')}>
                    <Text style={styles.sectionTitle}>Historial de gratitud</Text>
                    <Feather name="chevron-right" size={18} color={colors.text} />
                </TouchableOpacity>

                {GRATITUDE_ENTRIES.slice(0, 1).map((entry) => (
                    <View key={entry.id} style={styles.gratitudeCard}>
                        <Text style={styles.gratitudeDate}>{entry.date}</Text>
                        <Text style={styles.gratitudeText}>{entry.text}</Text>
                    </View>
                ))}

                {/* Mi análisis */}
                <TouchableOpacity style={styles.sectionHeader} onPress={() => navigation.navigate('Analysis')}>
                    <Text style={styles.sectionTitle}>Mi análisis</Text>
                    <Feather name="chevron-right" size={18} color={colors.text} />
                </TouchableOpacity>

                <View style={styles.analysisCard}>
                    <Text style={styles.analysisText}>
                        💪 Tu ánimo ha mejorado un 25% esta semana.
                    </Text>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Botón fijo abajo */}
            <TouchableOpacity style={styles.dailyButton} onPress={() => navigation.navigate('DailyCheckIn')}>
                <Text style={styles.dailyButtonText}>Hacer registro diario</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scroll: {
        paddingHorizontal: spacing.xl,
        paddingTop: 60,
        paddingBottom: 100,
    },
    title: {
        fontSize: fontSizes.xxl,
        fontWeight: '800',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginBottom: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.md,
        marginTop: spacing.sm,
    },
    sectionTitle: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
    },
    caminoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    caminoLeft: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    characterImage: {
        width: 100,
        height: 100,
    },
    moduleLabel: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
        fontWeight: '500',
    },
    caminoCard: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        paddingTop: spacing.xl,
        marginTop: spacing.lg,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    nivelBadge: {
        backgroundColor: colors.accent,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
    },
    nivelBadgeText: {
        fontSize: fontSizes.md,
        color: colors.white,
        fontWeight: '700',
    },
    nivelBadgeWrapper: {
        position: 'absolute',
        top: -18,
        alignSelf: 'center',
    },
    caminoTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '800',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    caminoDescription: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        lineHeight: 20,
        textAlign: 'center',
    },
    gratitudeCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing.sm,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    gratitudeDate: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    gratitudeText: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        lineHeight: 20,
    },
    analysisCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    analysisText: {
        fontSize: fontSizes.sm,
        color: colors.text,
        textAlign: 'center',
        lineHeight: 22,
    },
    bottomPadding: {
        height: spacing.xl,
    },
    dailyButton: {
        position: 'absolute',
        bottom: 50,
        left: spacing.xl,
        right: spacing.xl,
        backgroundColor: colors.accent,
        borderRadius: borderRadius.full,
        paddingVertical: spacing.md,
        alignItems: 'center',
        elevation: 4,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    dailyButtonText: {
        color: colors.white,
        fontSize: fontSizes.lg,
        fontWeight: '700',
    },
});