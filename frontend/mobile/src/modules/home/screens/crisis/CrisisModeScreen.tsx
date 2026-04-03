import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';

export default function CrisisModeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={24} color={colors.text} />
            </TouchableOpacity>

            <Text style={styles.title}>Modo crisis</Text>
            <Text style={styles.subtitle}>Elige cómo quieres calmarte</Text>

            <View style={styles.options}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BreathingScreen')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#5C6BC0' }]}>
                        <Icon name="wind" size={28} color={colors.white} />
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>Modo Zen</Text>
                        <Text style={styles.cardSubtitle}>Respira y encuentra la calma</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MotivationalPhrasesScreen')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#F4845F' }]}>
                        <Icon name="heart" size={28} color={colors.white} />
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>Frases motivacionales</Text>
                        <Text style={styles.cardSubtitle}>Sigue adelante con tu fuerza</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('GuidedMeditationScreen')}>
                    <View style={[styles.iconCircle, { backgroundColor: '#26A69A' }]}>
                        <Icon name="headphones" size={28} color={colors.white} />
                    </View>
                    <View>
                        <Text style={styles.cardTitle}>Práctica guiada</Text>
                        <Text style={styles.cardSubtitle}>Meditaciones para tu bienestar</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
    backButton: {
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: fontSizes.xxl,
        fontWeight: '800',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        marginBottom: spacing.xl,
    },
    options: {
        gap: spacing.md,
    },
    card: {
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
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.text,
    },
    cardSubtitle: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginTop: 2,
    },
});