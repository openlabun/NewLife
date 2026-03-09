import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Props = {
    title: string;
    image: any;
    onPress: () => void;
};

export default function MeditationCard({ title, image, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image source={image} style={styles.image} resizeMode="cover" />
            <View style={styles.footer}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.playButton} onPress={onPress}>
                    <Icon name="play" size={16} style={{ marginLeft: 2 }} color={colors.white} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    image: {
        width: '100%',
        height: 160,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
    },
    title: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.text,
        flex: 1,
    },
    playButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.text,
        alignItems: 'center',
        justifyContent: 'center',
    },
});