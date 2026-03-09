import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../../constants/theme';
import PhraseCard from '../../componets/PhraseCard';


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;

const PHRASES = [
    {
        id: '1',
        text: 'No necesitas alcohol para calmarte, tu fuerza está contigo.',
        image: require('../../../../assets/images/phrase.jpg'),
        liked: false,
    },
    {
        id: '2',
        text: 'Permite la quietud, más cerca estás de ti.',
        image: require('../../../../assets/images/phrase.jpg'),
        liked: false,
    },
    {
        id: '3',
        text: 'Cada día sobrio es una victoria que merece celebrarse.',
        image: require('../../../../assets/images/phrase.jpg'),
        liked: false,
    },
    {
        id: '4',
        text: 'Tu cuerpo y mente te agradecen cada decisión consciente.',
        image: require('../../../../assets/images/phrase.jpg'),
        liked: false,
    },
];

export default function MotivationalPhrasesScreen({ navigation }: any) {
    const [phrases, setPhrases] = useState(PHRASES);

    const toggleLike = (id: string) => {
        setPhrases(phrases.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
    };

    const sharePhrase = (text: string) => {
        // TODO: implementar share
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Frases motivacionales</Text>
                </View>
            </View>

            <Text style={styles.title}>Motívate</Text>
            <Text style={styles.subtitle}>Sigue adelante</Text>

            {/* Cards horizontal */}
            <FlatList
                data={phrases}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                keyExtractor={(item) => item.id}
                 style={{ flexGrow: 0 }}
                renderItem={({ item }) => (
                    <PhraseCard
                        id={item.id}
                        text={item.text}
                        image={item.image}
                        liked={item.liked}
                        onToggleLike={toggleLike}
                    />
                )}
            />

            {/* Link a práctica guiada */}
            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('GuidedMeditationScreen')}
            >
                <Text style={styles.link}>Ir a practica guiada</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
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
        paddingHorizontal: spacing.xl,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xl,
    },
    list: {
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.4,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        backgroundColor: '#E0E0E0',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    cardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'flex-end',
        padding: spacing.md,
        gap: spacing.sm,
    },
    cardText: {
        fontSize: fontSizes.sm,
        color: colors.white,
        fontWeight: '600',
        lineHeight: 20,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linkButton: {
        alignItems: 'center',
        paddingVertical: spacing.md,
        marginTop: spacing.md,
    },
    link: {
        fontSize: fontSizes.sm,
        color: colors.accent,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});