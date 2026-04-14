import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Post = {
    id: string;
    author: string;
    community: string;
    timeAgo: string;
    title: string;
    body: string;
    image?: any;
    likes: number;
    comments: number;
};

const MY_PROFILE = {
    name: 'Rodilia',
    username: '@Rodi',
    bio: 'Aprendiendo a superar conflictos sin tragos de por medio.',
    publications: 15,
    communities: ['AA Barranquilla', 'Fundación Shalom'],
    medals: ['🥇', '🥇', '🥇', '🥇'],
    totalMedals: 7,
    level: 9,
    levelName: 'Actuar',
    daysClean: 400,
    medalsAchieved: 7,
    isOwn: true,
};

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        author: 'Rodilia',
        community: 'AA',
        timeAgo: '4h',
        title: 'Hombres sean sinceros... como hacen para no ceder a la tentación cuando sus novias les invitan tomar un traguito',
        body: 'Hola chicos, hace una semana me pasó una situación que no supe muy bien cómo manejar. Mi novia me invitó a tomar "solo un traguito" para...',
        likes: 100,
        comments: 120,
    },
    {
        id: '2',
        author: 'Rodilia',
        community: 'Fundacion',
        timeAgo: '3d',
        title: '',
        body: '',
        image: require('../../../assets/images/contenido2.png'),
        likes: 45,
        comments: 12,
    },
];

function PostCard({ post, onPress }: { post: Post; onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.postCard} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                    <Feather name="user" size={16} color={colors.textMuted} />
                </View>
                <View style={styles.postAuthorInfo}>
                    <Text style={styles.postAuthor}>{post.author}</Text>
                    <Text style={styles.postCommunity}>Comunidad: {post.community}</Text>
                </View>
                <Text style={styles.postTime}>{post.timeAgo}</Text>
            </View>
            {post.title ? <Text style={styles.postTitle}>{post.title}</Text> : null}
            {post.body ? <Text style={styles.postBody}>{post.body}</Text> : null}
            {post.image && (
                <Image source={post.image} style={styles.postImage} resizeMode="cover" />
            )}
            <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction}>
                    <Feather name="heart" size={18} color={colors.textMuted} />
                    <Text style={styles.postActionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                    <Feather name="message-circle" size={18} color={colors.textMuted} />
                    <Text style={styles.postActionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.postAction, { marginLeft: 'auto' }]}>
                    <Feather name="share" size={18} color={colors.textMuted} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

type Props = {
    navigation: any;
    isOwn?: boolean;
    profile?: typeof MY_PROFILE;
};

export default function SocialProfileScreen({ navigation, route }: any) {
    const isOwn = route?.params?.isOwn !== false;
    const profile = route?.params?.profile || MY_PROFILE;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <View style={styles.avatarLarge}>
                        <Feather name="user" size={32} color={colors.white} />
                    </View>
                    <Text style={styles.profileName}>{profile.name}</Text>
                    <Text style={styles.profileUsername}>{profile.username}</Text>
                </View>
                {isOwn ? (
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                ) : <View style={{ width: 40 }} />}
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Bio */}
                <Text style={styles.bio}>{profile.bio}</Text>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{profile.publications}</Text>
                        <Text style={styles.statLabel}>Publicaciones</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{profile.communities.length}</Text>
                        <Text style={styles.statLabel}>Comunidades</Text>
                    </View>
                </View>

                {/* Medallas */}
                <TouchableOpacity
                    style={styles.medalsRow}
                    onPress={() => navigation.navigate('Medals')}
                >
                    {profile.medals.map((medal: string, i: number) => (
                        <Text key={i} style={styles.medalEmoji}>{medal}</Text>
                    ))}
                    <Text style={styles.medalsCount}>{profile.totalMedals} logros</Text>
                    <Feather name="chevron-right" size={16} color={colors.textMuted} />
                </TouchableOpacity>

                {/* Card nivel */}
                <View style={styles.levelCard}>
                    <View style={styles.levelHeader}>
                        <Text style={styles.levelTitle}>Nivel {profile.level} - {profile.levelName}</Text>
                        <Feather name="eye" size={18} color={colors.textMuted} />
                    </View>
                    <View style={styles.levelStats}>
                        <View style={styles.levelStat}>
                            <Text style={styles.levelStatIcon}>🎯</Text>
                            <View>
                                <Text style={styles.levelStatNumber}>{profile.daysClean} días sin</Text>
                                <Text style={styles.levelStatLabel}>consumo</Text>
                            </View>
                        </View>
                        <View style={styles.levelStatDivider} />
                        <View style={styles.levelStat}>
                            <Text style={styles.levelStatIcon}>🏅</Text>
                            <View>
                                <Text style={styles.levelStatNumber}>{profile.medalsAchieved} logros</Text>
                                <Text style={styles.levelStatLabel}>alcanzados</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Tab publicaciones */}
                <View style={styles.tabBar}>
                    <View style={styles.tabActive}>
                        <Text style={styles.tabActiveText}>Publicaciones</Text>
                    </View>
                </View>

                {/* Posts */}
                {MOCK_POSTS.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onPress={() => navigation.navigate('PostDetail', { post })}
                    />
                ))}

                <View style={{ height: spacing.xl }} />
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
    },
    headerCenter: {
        alignItems: 'center',
        gap: 4,
    },
    avatarLarge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    profileName: {
        fontSize: fontSizes.lg,
        fontWeight: '800',
        color: colors.text,
    },
    profileUsername: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
    },
    editButton: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
    },
    editButtonText: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.text,
    },
    followButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
    },
    followButtonText: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.white,
    },
    scroll: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xl,
    },
    bio: {
        fontSize: fontSizes.md,
        color: colors.textLight,
        lineHeight: 22,
        marginBottom: spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: fontSizes.lg,
        fontWeight: '800',
        color: colors.text,
    },
    statLabel: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: colors.border,
    },
    medalsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.lg,
    },
    medalEmoji: {
        fontSize: 24,
    },
    medalsCount: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.text,
        marginLeft: spacing.xs,
        flex: 1,
    },
    levelCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    levelTitle: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
    },
    levelStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    levelStat: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    levelStatIcon: {
        fontSize: 28,
    },
    levelStatNumber: {
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.text,
    },
    levelStatLabel: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    levelStatDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border,
        marginHorizontal: spacing.md,
    },
    tabBar: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginBottom: spacing.md,
    },
    tabActive: {
        paddingBottom: spacing.sm,
        borderBottomWidth: 2,
        borderBottomColor: colors.text,
        alignSelf: 'flex-start',
    },
    tabActiveText: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
    },
    postCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        gap: spacing.sm,
        marginBottom: spacing.md,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    postAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    postAuthorInfo: {
        flex: 1,
    },
    postAuthor: {
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.text,
    },
    postCommunity: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    postTime: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    postTitle: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
        lineHeight: 22,
    },
    postBody: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        lineHeight: 20,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: borderRadius.sm,
    },
    postActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
        marginTop: spacing.xs,
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    postActionText: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
    },
});