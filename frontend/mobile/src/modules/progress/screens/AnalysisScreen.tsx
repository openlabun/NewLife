import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.xl * 2;

// Mock data calendario
const OCTOBER_2024 = {
    month: 'Octubre',
    year: '2025',
    days: [
        { day: 29, prevMonth: true, clean: false },
        { day: 30, prevMonth: true, clean: false },
        { day: 1, clean: true },
        { day: 2, clean: true },
        { day: 3, clean: true },
        { day: 4, clean: true },
        { day: 5, clean: true },
        { day: 6, clean: true },
        { day: 7, clean: true },
        { day: 8, clean: true },
        { day: 9, clean: true },
        { day: 10, clean: true },
        { day: 11, clean: true },
        { day: 12, clean: true },
        { day: 13, clean: true },
        { day: 14, clean: true },
        { day: 15, clean: true },
        { day: 16, clean: true },
        { day: 17, clean: true },
        { day: 18, clean: true },
        { day: 19, clean: true },
        { day: 20, clean: true },
        { day: 21, clean: true },
        { day: 22, clean: false, difficult: true },
        { day: 23, clean: true },
        { day: 24, today: true },
        { day: 25 },
        { day: 26 },
        { day: 27 },
        { day: 28 },
        { day: 29 },
        { day: 30 },
        { day: 31 },
        { day: 1, nextMonth: true },
        { day: 2, nextMonth: true },
    ],
};

const SELECTED_DAY_INFO = {
    location: '"En mi casa"',
    social: '"Solo"',
    emotion: '"Ansioso"',
};

const WEEK_DAYS = ['Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab', 'Dom'];

const INSIGHTS = [
    { emoji: '💪', text: 'Tu ánimo ha mejorado un 25% esta semana.' },
    { emoji: '🌿', text: 'Tu promedio de días sobrios aumentó un 60%.' },
    { emoji: '🔍', text: 'Tus principales detonantes fueron sociales.' },
];

// Mock data gráfica emocional
const EMOTION_DATA = [
    { value: 30 }, { value: 60 }, { value: 40 }, { value: 80 },
    { value: 50 }, { value: 90 }, { value: 45 }, { value: 70 },
    { value: 35 }, { value: 85 }, { value: 55 }, { value: 75 },
    { value: 40 }, { value: 95 }, { value: 60 }, { value: 50 },
    { value: 70 }, { value: 40 }, { value: 80 }, { value: 55 },
    { value: 65 }, { value: 45 }, { value: 75 }, { value: 50 },
    { value: 85 }, { value: 60 }, { value: 70 }, { value: 45 },
    { value: 80 }, { value: 55 },
];

const EMOTION_LEGEND = [
    { color: '#7B61FF', label: 'Triste' },
    { color: '#C061FF', label: 'Ansioso' },
    { color: '#9B8FFF', label: 'Neutral' },
    { color: '#D4AAFF', label: 'Motivado' },
    { color: '#E8D5FF', label: 'Tranquilo' },
];

export default function AnalysisScreen({ navigation }: any) {
    const [selectedDay, setSelectedDay] = useState<number | null>(24);
    const [currentMonth, setCurrentMonth] = useState(0);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Mi análisis</Text>
                    <Text style={styles.headerSubtitle}>Análisis y gráficos</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* Resumen */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Resumen de tu progreso</Text>
                    {INSIGHTS.map((item, i) => (
                        <View key={i} style={styles.insightRow}>
                            <Text style={styles.insightEmoji}>{item.emoji}</Text>
                            <Text style={styles.insightText}>{item.text}</Text>
                        </View>
                    ))}
                </View>

                {/* Calendario */}
                <View style={styles.card}>
                    {/* Nav mes */}
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity style={styles.calendarNavButton}>
                            <Feather name="chevron-left" size={18} color={colors.text} />
                        </TouchableOpacity>
                        <View style={styles.calendarTitleWrapper}>
                            <Text style={styles.calendarMonth}>{OCTOBER_2024.month}</Text>
                            <Text style={styles.calendarYear}>{OCTOBER_2024.year}</Text>
                        </View>
                        <TouchableOpacity style={styles.calendarNavButton}>
                            <Feather name="chevron-right" size={18} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    {/* Días de semana */}
                    <View style={styles.weekRow}>
                        {WEEK_DAYS.map((d) => (
                            <Text key={d} style={styles.weekDay}>{d}</Text>
                        ))}
                    </View>

                    {/* Días */}
                    <View style={styles.daysGrid}>
                        {OCTOBER_2024.days.map((d, i) => {
                            const isSelected = selectedDay === d.day && !d.prevMonth && !d.nextMonth;
                            const isClean = d.clean && !d.prevMonth && !d.nextMonth;
                            const isDifficult = d.difficult;
                            const isToday = d.today;
                            const isFaded = d.prevMonth || d.nextMonth;

                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.dayCell}
                                    onPress={() => !isFaded && setSelectedDay(d.day)}
                                >
                                    <View style={[
                                        styles.dayCircle,
                                        isClean && styles.dayCircleClean,
                                        isDifficult && styles.dayCircleDifficult,
                                        isToday && styles.dayCircleToday,
                                    ]}>
                                        <Text style={[
                                            styles.dayText,
                                            isClean && styles.dayTextClean,
                                            isDifficult && styles.dayTextDifficult,
                                            isToday && styles.dayTextToday,
                                            isFaded && styles.dayTextFaded,
                                        ]}>
                                            {d.day}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Leyenda */}
                    <View style={styles.calendarLegend}>
                        <View style={styles.legendItem}>
                            <View style={styles.legendDotOutline} />
                            <Text style={styles.legendText}>Hoy</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#4A7BF7' }]} />
                            <Text style={styles.legendText}>Día limpio</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
                            <Text style={styles.legendText}>Día difícil</Text>
                        </View>
                    </View>

                    {/* Info día seleccionado */}
                    {selectedDay && (
                        <View style={styles.dayInfo}>
                            <Text style={styles.dayInfoRow}>
                                <Text style={styles.dayInfoLabel}>Donde estabas: </Text>
                                <Text style={styles.dayInfoValue}>{SELECTED_DAY_INFO.location}</Text>
                            </Text>
                            <Text style={styles.dayInfoRow}>
                                <Text style={styles.dayInfoLabel}>Con quién estabas: </Text>
                                <Text style={styles.dayInfoValue}>{SELECTED_DAY_INFO.social}</Text>
                            </Text>
                            <Text style={styles.dayInfoRow}>
                                <Text style={styles.dayInfoLabel}>Cómo te sentías: </Text>
                                <Text style={styles.dayInfoValue}>{SELECTED_DAY_INFO.emotion}</Text>
                            </Text>
                        </View>
                    )}
                </View>

                {/* Estado emocional */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Estado emocional</Text>
                    <Text style={styles.cardSubtitle}>Tus emociones se mantuvieron más tranquilas esta semana.</Text>
                    <Text style={styles.cardHint}>Mira cómo han cambiado en los últimos 30 días.</Text>

                    <View style={styles.chartWrapper}>
                        {/* Tooltip */}
                        <View style={styles.tooltip}>
                            <Text style={styles.tooltipText}>Intensidad emocional</Text>
                        </View>

                        <LineChart
                            data={EMOTION_DATA}
                            width={CARD_WIDTH - spacing.lg * 2}
                            height={160}
                            curved
                            color="#7B61FF"
                            startFillColor="#C061FF"
                            endFillColor="rgba(200,150,255,0.1)"
                            thickness={2}
                            hideDataPoints
                            hideYAxisText
                            hideAxesAndRules
                            xAxisColor="transparent"
                            yAxisColor="transparent"
                            areaChart
                        />

                        <View style={styles.chartAxisRow}>
                            <Text style={styles.chartAxisLabel}>Día 1</Text>
                            <Text style={styles.chartAxisLabel}>Día 30</Text>
                        </View>
                    </View>

                    {/* Nivel variación */}
                    <View style={styles.variationRow}>
                        <View style={styles.variationDots}>
                            {[0.9, 0.7, 0.5, 0.35, 0.2].map((op, i) => (
                                <View key={i} style={[styles.variationDot, { opacity: op }]} />
                            ))}
                        </View>
                        <Text style={styles.variationLabel}>Nivel de variación emocional</Text>
                        <TouchableOpacity>
                            <Feather name="more-vertical" size={18} color={colors.textMuted} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.variationPercent}>80%</Text>

                    {/* Leyenda emociones */}
                    <View style={styles.emotionLegend}>
                        {EMOTION_LEGEND.map((e, i) => (
                            <View key={i} style={styles.emotionLegendItem}>
                                <View style={[styles.emotionDot, { backgroundColor: e.color }]} />
                                <Text style={styles.emotionLegendText}>{e.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

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
        gap: spacing.md,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        gap: spacing.sm,
    },
    cardTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '800',
        color: colors.text,
    },
    cardSubtitle: {
        fontSize: fontSizes.sm,
        color: colors.text,
        fontWeight: '500',
    },
    cardHint: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    insightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    insightEmoji: {
        fontSize: 18,
    },
    insightText: {
        flex: 1,
        fontSize: fontSizes.sm,
        color: colors.text,
        textAlign: 'center',
    },
    calendarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    calendarNavButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarTitleWrapper: {
        alignItems: 'center',
    },
    calendarMonth: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.text,
    },
    calendarYear: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    weekRow: {
        flexDirection: 'row',
        marginBottom: spacing.xs,
    },
    weekDay: {
        flex: 1,
        textAlign: 'center',
        fontSize: fontSizes.xs,
        color: colors.textMuted,
        fontWeight: '600',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: `${100 / 7}%`,
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircleClean: {
        backgroundColor: '#4A7BF7',
    },
    dayCircleDifficult: {
        backgroundColor: colors.accent,
    },
    dayCircleToday: {
        borderWidth: 2,
        borderColor: colors.text,
    },
    dayText: {
        fontSize: fontSizes.xs,
        color: colors.text,
        fontWeight: '500',
    },
    dayTextClean: {
        color: colors.white,
        fontWeight: '700',
    },
    dayTextDifficult: {
        color: colors.white,
        fontWeight: '700',
    },
    dayTextToday: {
        fontWeight: '700',
    },
    dayTextFaded: {
        color: colors.border,
    },
    calendarLegend: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.sm,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendDotOutline: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: colors.text,
    },
    legendText: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    dayInfo: {
        marginTop: spacing.sm,
        gap: 4,
    },
    dayInfoRow: {
        fontSize: fontSizes.sm,
    },
    dayInfoLabel: {
        fontWeight: '700',
        color: colors.text,
    },
    dayInfoValue: {
        color: colors.textMuted,
    },
    chartWrapper: {
        marginTop: spacing.sm,
    },
    tooltip: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        marginBottom: spacing.xs,
        marginLeft: spacing.sm,
    },
    tooltipText: {
        fontSize: fontSizes.xs,
        color: colors.white,
        fontWeight: '600',
    },
    chartAxisRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    chartAxisLabel: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    variationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginTop: spacing.sm,
    },
    variationDots: {
        flexDirection: 'row',
        gap: 3,
    },
    variationDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#7B61FF',
    },
    variationLabel: {
        flex: 1,
        fontSize: fontSizes.sm,
        color: colors.text,
        fontWeight: '500',
    },
    variationPercent: {
        fontSize: fontSizes.xl,
        fontWeight: '800',
        color: colors.text,
    },
    emotionLegend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.xs,
    },
    emotionLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    emotionDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    emotionLegendText: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
});