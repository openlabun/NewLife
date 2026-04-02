import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type EventCategory = 'Reunion' | 'Grupo AA' | 'Fundación' | 'Otro' | 'Lectura';
type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'Reunion': '#D38A58',
  'Grupo AA': '#8B7355',
  'Fundación': '#E8B89D',
  'Otro': '#A3A3A3',
  'Lectura': '#7DA87B',
};

const CATEGORY_ICONS: Record<EventCategory, string> = {
  'Reunion': 'users',
  'Grupo AA': 'heart',
  'Fundación': 'home',
  'Otro': 'grid',
  'Lectura': 'book-open',
};

const CATEGORIES: EventCategory[] = ['Reunion', 'Grupo AA', 'Fundación', 'Otro', 'Lectura'];
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

const REMINDER_OPTIONS = [
  { label: '5 min', value: 5 },
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '1 dia', value: 1440 },
];

const REPEAT_OPTIONS: { label: string; value: RepeatType; icon: string }[] = [
  { label: 'Una vez', value: 'none', icon: 'circle' },
  { label: 'Diario', value: 'daily', icon: 'sun' },
  { label: 'Semanal', value: 'weekly', icon: 'calendar' },
  { label: 'Mensual', value: 'monthly', icon: 'repeat' },
];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

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

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="x" size={20} color="#3D3D3D" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {existing ? 'Editar evento' : 'Nuevo evento'}
          </Text>
        </View>
        <TouchableOpacity style={styles.saveHeaderBtn} onPress={handleSave}>
          <Feather name="check" size={20} color="#D38A58" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Title Input */}
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Feather name="edit-3" size={18} color="#A3A3A3" />
            <TextInput
              style={styles.titleInput}
              placeholder="Titulo del evento"
              placeholderTextColor="#C4C4C4"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Date Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="calendar" size={16} color="#D38A58" />
            <Text style={styles.sectionTitle}>Fecha</Text>
          </View>
          
          {/* Month Picker */}
          <View style={styles.monthPicker}>
            <TouchableOpacity onPress={prevMonth} style={styles.monthArrow}>
              <Feather name="chevron-left" size={18} color="#3D3D3D" />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{MONTHS[currentMonth]} {currentYear}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.monthArrow}>
              <Feather name="chevron-right" size={18} color="#3D3D3D" />
            </TouchableOpacity>
          </View>

          {/* Days Grid */}
          <ScrollView
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

        {/* Time Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="clock" size={16} color="#D38A58" />
            <Text style={styles.sectionTitle}>Hora</Text>
          </View>
          
          <View style={styles.timeRow}>
            <View style={styles.timeCard}>
              <Text style={styles.timeLabel}>Desde</Text>
              <TextInput
                style={styles.timeInput}
                value={timeFrom}
                onChangeText={setTimeFrom}
              />
            </View>
            <View style={styles.timeArrow}>
              <Feather name="arrow-right" size={16} color="#D38A58" />
            </View>
            <View style={styles.timeCard}>
              <Text style={styles.timeLabel}>Hasta</Text>
              <TextInput
                style={styles.timeInput}
                value={timeTo}
                onChangeText={setTimeTo}
              />
            </View>
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="tag" size={16} color="#D38A58" />
            <Text style={styles.sectionTitle}>Categoria</Text>
          </View>
          
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryCard,
                    isActive && { backgroundColor: `${CATEGORY_COLORS[cat]}15`, borderColor: CATEGORY_COLORS[cat] },
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <View style={[
                    styles.categoryIcon,
                    { backgroundColor: isActive ? CATEGORY_COLORS[cat] : '#F5F5F5' },
                  ]}>
                    <Feather 
                      name={CATEGORY_ICONS[cat] as any} 
                      size={16} 
                      color={isActive ? '#FFF' : '#A3A3A3'} 
                    />
                  </View>
                  <Text style={[
                    styles.categoryLabel,
                    isActive && { color: CATEGORY_COLORS[cat], fontWeight: '600' },
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Repeat Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="repeat" size={16} color="#D38A58" />
            <Text style={styles.sectionTitle}>Repetir</Text>
          </View>
          
          <View style={styles.repeatGrid}>
            {REPEAT_OPTIONS.map((opt) => {
              const isActive = repeat === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.repeatCard, isActive && styles.repeatCardActive]}
                  onPress={() => setRepeat(opt.value)}
                >
                  <Feather 
                    name={opt.icon as any} 
                    size={18} 
                    color={isActive ? '#D38A58' : '#A3A3A3'} 
                  />
                  <Text style={[styles.repeatLabel, isActive && styles.repeatLabelActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Notification Section */}
        <View style={styles.section}>
          <View style={styles.notificationRow}>
            <View style={styles.notificationLeft}>
              <View style={styles.notificationIcon}>
                <Feather name="bell" size={16} color="#D38A58" />
              </View>
              <View>
                <Text style={styles.notificationTitle}>Recordatorio</Text>
                <Text style={styles.notificationSubtitle}>Recibe una notificacion</Text>
              </View>
            </View>
            <Switch
              value={reminder}
              onValueChange={setReminder}
              trackColor={{ false: '#E5E5E5', true: 'rgba(211, 138, 88, 0.3)' }}
              thumbColor={reminder ? '#D38A58' : '#FFF'}
            />
          </View>
          
          {reminder && (
            <View style={styles.reminderOptions}>
              {REMINDER_OPTIONS.map((opt) => {
                const isActive = reminderMinutes === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.reminderChip, isActive && styles.reminderChipActive]}
                    onPress={() => setReminderMinutes(opt.value)}
                  >
                    <Text style={[styles.reminderChipText, isActive && styles.reminderChipTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#3D3D3D' },
  saveHeaderBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { paddingTop: 8 },

  // Sections
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#3D3D3D' },

  // Title Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#3D3D3D',
    paddingVertical: 12,
  },

  // Month Picker
  monthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 14,
  },
  monthArrow: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: { fontSize: 15, fontWeight: '600', color: '#3D3D3D', minWidth: 80, textAlign: 'center' },

  // Days
  daysScroll: { gap: 8 },
  dayItem: {
    width: 44,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    gap: 4,
  },
  dayItemSelected: { backgroundColor: '#D38A58' },
  dayName: { fontSize: 10, fontWeight: '500', color: '#A3A3A3' },
  dayNumber: { fontSize: 16, fontWeight: '700', color: '#3D3D3D' },
  dayTextSelected: { color: '#FFF' },

  // Time
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  timeLabel: { fontSize: 11, color: '#A3A3A3', marginBottom: 4 },
  timeInput: { fontSize: 18, fontWeight: '700', color: '#3D3D3D', textAlign: 'center' },
  timeArrow: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: { fontSize: 13, color: '#6B6B6B' },

  // Repeat
  repeatGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  repeatCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    gap: 6,
  },
  repeatCardActive: {
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
  },
  repeatLabel: { fontSize: 11, color: '#A3A3A3', fontWeight: '500' },
  repeatLabelActive: { color: '#D38A58', fontWeight: '600' },

  // Notification
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTitle: { fontSize: 14, fontWeight: '600', color: '#3D3D3D' },
  notificationSubtitle: { fontSize: 12, color: '#A3A3A3', marginTop: 2 },
  reminderOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  reminderChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  reminderChipActive: {
    backgroundColor: '#D38A58',
  },
  reminderChipText: { fontSize: 13, color: '#6B6B6B', fontWeight: '500' },
  reminderChipTextActive: { color: '#FFF', fontWeight: '600' },

  // Save Button
  saveButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    backgroundColor: '#D38A58',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#D38A58',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});