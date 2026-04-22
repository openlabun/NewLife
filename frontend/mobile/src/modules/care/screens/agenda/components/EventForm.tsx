import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CategorySelector from './CategorySelector';
import RepeatSelector from './RepeatSelector';

const COLORS = {
  primary: '#D38A58',
  white: '#FFFFFF',
  gray: '#969696',
  darkGray: '#404040',
  background: '#FAFAFA',
};

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

const DAY_ITEM_WIDTH = 44;
const DAY_ITEM_GAP = 8;

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface EventFormProps {
  title: string;
  onTitleChange: (title: string) => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  currentMonth: number;
  currentYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  timeFrom: string;
  onTimeFromChange: (time: string) => void;
  timeTo: string;
  onTimeToChange: (time: string) => void;
  category: string;
  onCategorySelect: (category: string) => void;
  repeat: string;
  onRepeatSelect: (repeat: string) => void;
  reminder: boolean;
  onReminderToggle: (value: boolean) => void;
  reminderMinutes: number;
  onReminderMinutesSelect: (minutes: number) => void;
}

export default function EventForm({
  title,
  onTitleChange,
  selectedDate,
  onDateSelect,
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
  timeFrom,
  onTimeFromChange,
  timeTo,
  onTimeToChange,
  category,
  onCategorySelect,
  repeat,
  onRepeatSelect,
  reminder,
  onReminderToggle,
  reminderMinutes,
  onReminderMinutesSelect,
}: EventFormProps) {
  const calendarScrollRef = useRef<ScrollView>(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  useEffect(() => {
    const targetDay = currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()
      ? selectedDate.getDate()
      : 1;

    const scrollX = (targetDay - 1) * (DAY_ITEM_WIDTH + DAY_ITEM_GAP) - 100;

    setTimeout(() => {
      calendarScrollRef.current?.scrollTo({ x: Math.max(0, scrollX), animated: true });
    }, 100);
  }, [currentMonth, currentYear]);

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* Titulo */}
      <View style={styles.section}>
        <Text style={styles.label}>Titulo</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del evento"
            placeholderTextColor={COLORS.gray}
            value={title}
            onChangeText={onTitleChange}
          />
        </View>
      </View>

      {/* Fecha */}
      <View style={styles.section}>
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.monthPicker}>
          <TouchableOpacity onPress={onPrevMonth} style={styles.monthArrow}>
            <Feather name="chevron-left" size={18} color={COLORS.darkGray} />
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{MONTHS[currentMonth]} {currentYear}</Text>
          <TouchableOpacity onPress={onNextMonth} style={styles.monthArrow}>
            <Feather name="chevron-right" size={18} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={calendarScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysScroll}
        >
          {days.map((day) => {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = isSameDay(date, selectedDate);
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayItem, isSelected && styles.dayItemSelected]}
                onPress={() => onDateSelect(date)}
              >
                <Text style={[styles.dayName, isSelected && styles.dayTextSelected]}>
                  {WEEK_DAYS[date.getDay()]}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Hora */}
      <View style={styles.section}>
        <Text style={styles.label}>Hora</Text>
        <View style={styles.timeRow}>
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>Desde</Text>
            <TextInput
              style={styles.timeInput}
              value={timeFrom}
              onChangeText={onTimeFromChange}
            />
          </View>
          <Feather name="arrow-right" size={16} color={COLORS.gray} />
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>Hasta</Text>
            <TextInput
              style={styles.timeInput}
              value={timeTo}
              onChangeText={onTimeToChange}
            />
          </View>
        </View>
      </View>

      {/* Categoria */}
      <View style={styles.section}>
        <Text style={styles.label}>Categoria</Text>
        <CategorySelector selected={category} onSelect={onCategorySelect} />
      </View>

      {/* Repetición y Recordatorio */}
      <RepeatSelector
        repeat={repeat}
        onRepeatSelect={onRepeatSelect}
        reminder={reminder}
        onReminderToggle={onReminderToggle}
        reminderMinutes={reminderMinutes}
        onReminderMinutesSelect={onReminderMinutesSelect}
      />

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, gap: 16 },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.darkGray, marginBottom: 12 },
  inputBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  input: { fontSize: 16, color: COLORS.darkGray, paddingVertical: 14 },
  monthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  monthArrow: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: { fontSize: 15, fontWeight: '600', color: COLORS.darkGray },
  daysScroll: { gap: DAY_ITEM_GAP },
  dayItem: {
    width: DAY_ITEM_WIDTH,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.background,
    gap: 4,
  },
  dayItemSelected: { backgroundColor: COLORS.primary },
  dayName: { fontSize: 10, fontWeight: '500', color: COLORS.gray },
  dayNumber: { fontSize: 16, fontWeight: '700', color: COLORS.darkGray },
  dayTextSelected: { color: COLORS.white },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeBox: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  timeLabel: { fontSize: 11, color: COLORS.gray, marginBottom: 4 },
  timeInput: { fontSize: 16, fontWeight: '600', color: COLORS.darkGray, textAlign: 'center' },
});