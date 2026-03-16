import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Props = {
    id: string;
    text: string;
    image: any;
    liked: boolean;
    onToggleLike: (id: string) => void;
};

export default function PhraseCard({ id, text, image, liked, onToggleLike }: Props) {
    const handleShare = async () => {
        await Share.share({ message: text });
    };

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} resizeMode="cover" />
            <View style={styles.footer}>
                <Text style={styles.text}>{text}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleShare}>
                        <Icon name="share" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onToggleLike(id)}>
                        <Icon name="heart" size={20} color={liked ? '#FF6B6B' : colors.textMuted} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        height: 350,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        backgroundColor: colors.white,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    image: {
        width: '100%',
        height: 200,
    },
    footer: {
        flex: 1,
        padding: spacing.md,
        gap: spacing.sm,
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: fontSizes.sm,
        color: colors.white,
        lineHeight: 20,
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
});