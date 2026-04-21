import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type EventCategory = 'Reunion' | 'Grupo AA' | 'Fundación' | 'Otro' | 'Lectura';
type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

const COLORS = {
  primary: '#D38A58',
  white: '#FFFFFF',
  gray: '#969696',
  darkGray: '#404040',
  black: '#000000',
  background: '#FAFAFA',
};

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'Reunion': '#D38A58',
  'Grupo AA': '#7FB77E',
  'Fundación': '#00ADB5',
  'Otro': '#969696',
  'Lectura': '#406ADF',
};

const CATEGORIES: EventCategory[] = ['Reunion', 'Grupo AA', 'Fundación', 'Otro', 'Lectura'];
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

const REMINDER_OPTIONS = [
  { label: '5 min', value: 5 },
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
];

const REPEAT_OPTIONS: { label: string; value: RepeatType }[] = [
  { label: 'Una vez', value: 'none' },
  { label: 'Diario', value: 'daily' },
  { label: 'Semanal', value: 'weekly' },
  { label: 'Mensual', value: 'monthly' },
];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

const DAY_ITEM_WIDTH = 44;
const DAY_ITEM_GAP = 8;

export default function AddEventScreen({ navigation, route }: any) {
  const existing = route.params?.event;
  const defaultDate: Date = route.params?.defaultDate || new Date();

  const [title, setTitle] = useState(existing?.title || '');
  const [selectedDate, setSelectedDate] = useState<Date>(existing?.date || defaultDate);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [timeFrom, setTimeFrom] = useState(existing?.timeFrom || '8:00 am');
  const [timeTo, setTimeTo] = useState(existing?.timeTo || '9:00 am');
  const [category, setCategory] = useState<EventCategory>(existing?.category || 'Reunion');
  const [reminder, setReminder] = useState(existing?.reminder || false);
  const [reminderMinutes, setReminderMinutes] = useState(existing?.reminderMinutes || 30);
  const [repeat, setRepeat] = useState<RepeatType>(existing?.repeat || 'none');

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

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Feather name="x" size={20} color={COLORS.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{existing ? 'Editar evento' : 'Nuevo evento'}</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Feather name="check" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

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
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Fecha */}
        <View style={styles.section}>
          <Text style={styles.label}>Fecha</Text>
          <View style={styles.monthPicker}>
            <TouchableOpacity onPress={prevMonth} style={styles.monthArrow}>
              <Feather name="chevron-left" size={18} color={COLORS.darkGray} />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{MONTHS[currentMonth]} {currentYear}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.monthArrow}>
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
                  onPress={() => setSelectedDate(date)}
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
              <TextInput style={styles.timeInput} value={timeFrom} onChangeText={setTimeFrom} />
            </View>
            <Feather name="arrow-right" size={16} color={COLORS.gray} />
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Hasta</Text>
              <TextInput style={styles.timeInput} value={timeTo} onChangeText={setTimeTo} />
            </View>
          </View>
        </View>

        {/* Categoria */}
        <View style={styles.section}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, isActive && { backgroundColor: `${CATEGORY_COLORS[cat]}15`, borderColor: CATEGORY_COLORS[cat] }]}
                  onPress={() => setCategory(cat)}
                >
                  <View style={[styles.categoryDot, { backgroundColor: CATEGORY_COLORS[cat] }]} />
                  <Text style={[styles.categoryLabel, isActive && { color: CATEGORY_COLORS[cat] }]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Repetir */}
        <View style={styles.section}>
          <Text style={styles.label}>Repetir</Text>
          <View style={styles.repeatRow}>
            {REPEAT_OPTIONS.map((opt) => {
              const isActive = repeat === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.repeatChip, isActive && styles.repeatChipActive]}
                  onPress={() => setRepeat(opt.value)}
                >
                  <Text style={[styles.repeatLabel, isActive && styles.repeatLabelActive]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recordatorio */}
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Recordatorio</Text>
            <Switch
              value={reminder}
              onValueChange={setReminder}
              trackColor={{ false: '#E5E5E5', true: `${COLORS.primary}50` }}
              thumbColor={reminder ? COLORS.primary : COLORS.white}
            />
          </View>
          {reminder && (
            <View style={styles.reminderRow}>
              {REMINDER_OPTIONS.map((opt) => {
                const isActive = reminderMinutes === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.reminderChip, isActive && styles.reminderChipActive]}
                    onPress={() => setReminderMinutes(opt.value)}
                  >
                    <Text style={[styles.reminderLabel, isActive && styles.reminderLabelActive]}>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Boton guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.darkGray },
  saveBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },

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

  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  categoryDot: { width: 8, height: 8, borderRadius: 4 },
  categoryLabel: { fontSize: 13, color: COLORS.gray },

  repeatRow: { flexDirection: 'row', gap: 8 },
  repeatChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  repeatChipActive: { backgroundColor: `${COLORS.primary}15` },
  repeatLabel: { fontSize: 12, color: COLORS.gray, fontWeight: '500' },
  repeatLabelActive: { color: COLORS.primary, fontWeight: '600' },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  reminderChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.background,
  },
  reminderChipActive: { backgroundColor: COLORS.primary },
  reminderLabel: { fontSize: 13, color: COLORS.gray },
  reminderLabelActive: { color: COLORS.white, fontWeight: '600' },

  saveButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});