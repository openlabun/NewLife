import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type Post = {
    id: string;
    author: string;
    timeAgo: string;
    title: string;
    body: string;
    image?: any;
    likes: number;
    comments: number;
};

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        author: 'Carlos Santos',
        timeAgo: '4h',
        title: 'Hombres sean sinceros... como hacen para no ceder a la tentación cuando sus novias les invitan tomar un traguito',
        body: 'Hola chicos, hace una semana me pasó una situación que no supe muy bien cómo manejar. Mi novia me invitó a tomar "solo un traguito" para...',
        likes: 100,
        comments: 120,
    },
    {
        id: '2',
        author: 'Juan Perez',
        timeAgo: '3d',
        title: '',
        body: '',
        image: require('../../../assets/images/contenido3.png'),
        likes: 45,
        comments: 12,
    },
];

const DAILY_FORUM = {
    question: '¿Qué podrías hacer solo por hoy para cuidarte y mantener tu paz interior?',
};

function PostCard({ post, onPress, onPressAuthor }: {
    post: Post;
    onPress: () => void;
    onPressAuthor: () => void;
}) {
    return (
        <TouchableOpacity style={styles.postCard} onPress={onPress} activeOpacity={0.9}>
            <TouchableOpacity style={styles.postHeader} onPress={onPressAuthor} activeOpacity={0.7}>
                <View style={styles.postAvatar}>
                    <Feather name="user" size={18} color={colors.textMuted} />
                </View>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>{post.timeAgo}</Text>
            </TouchableOpacity>
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

export default function CommunityDetailScreen({ navigation, route }: any) {
    const { community } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{community.name}</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.navigate('CommunityChat', { community })}
                    >
                        <Feather name="more-horizontal" size={22} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.navigate('CreatePostCommunity', { community })}
                    >
                        <Feather name="plus" size={22} color={colors.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Foro del día */}
                <TouchableOpacity
                    style={styles.forumCard}
                    onPress={() => navigation.navigate('DailyForum')}
                    activeOpacity={0.9}
                >
                    <Text style={styles.forumEmoji}>✏️</Text>
                    <View style={styles.forumContent}>
                        <Text style={styles.forumTitle}>Foro del día</Text>
                        <Text style={styles.forumQuestion}>{DAILY_FORUM.question}</Text>
                    </View>
                </TouchableOpacity>

                {/* Posts */}
                {MOCK_POSTS.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onPress={() => navigation.navigate('PostDetail', { post })}
                        onPressAuthor={() => navigation.navigate('UserProfile', {
                            isOwn: false,
                            profile: {
                                name: post.author,
                                username: '@' + post.author.toLowerCase().replace(' ', ''),
                                bio: 'Miembro de la comunidad.',
                                publications: 15,
                                communities: [community.name],
                                medals: ['🥇', '🥇'],
                                totalMedals: 2,
                                level: 3,
                                levelName: 'Entregar',
                                daysClean: 42,
                                medalsAchieved: 2,
                            },
                        })}
                    />
                ))}

                <View style={{ height: spacing.xl }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
    },
    headerTitle: { fontSize: fontSizes.xxl, fontWeight: '800', color: colors.text },
    headerActions: { flexDirection: 'row', gap: spacing.sm },
    headerButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        paddingBottom: spacing.xl,
    },
    forumCard: {
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
    forumEmoji: { fontSize: 32 },
    forumContent: { flex: 1 },
    forumTitle: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
    },
    forumQuestion: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        lineHeight: 18,
    },
    postCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        gap: spacing.sm,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    postAuthor: {
        flex: 1,
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.text,
    },
    postTime: { fontSize: fontSizes.xs, color: colors.textMuted },
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
    postActionText: { fontSize: fontSizes.sm, color: colors.textMuted },
});