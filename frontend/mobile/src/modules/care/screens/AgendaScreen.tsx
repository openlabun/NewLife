import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing, borderRadius } from '../../../constants/theme';

type EventCategory = 'Reunion' | 'Grupo AA' | 'Fundación' | 'Otro' | 'Lectura';
type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

type AgendaEvent = {
  id: string;
  title: string;
  date: Date;
  timeFrom: string;
  timeTo: string;
  category: EventCategory;
  reminder: boolean;
  reminderMinutes: number;
  repeat: RepeatType;
  isReminder?: boolean;
};

const COLORS = {
  primary: '#D38A58',
  white: '#FFFFFF',
  gray: '#969696',
  darkGray: '#404040',
  black: '#000000',
  red: '#FF6B6B',
  background: '#FAFAFA',
};

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'Reunion': '#D38A58',
  'Grupo AA': '#7FB77E',
  'Fundación': '#00ADB5',
  'Otro': '#969696',
  'Lectura': '#406ADF',
};

const CATEGORY_ICONS: Record<EventCategory, string> = {
  'Reunion': 'users',
  'Grupo AA': 'heart',
  'Fundación': 'home',
  'Otro': 'grid',
  'Lectura': 'book-open',
};

const MOCK_EVENTS: AgendaEvent[] = [
  { id: '1', title: 'Asistir a grupo virtual', date: new Date(), timeFrom: '8:00 am', timeTo: '9:00 am', category: 'Grupo AA', reminder: true, reminderMinutes: 30, repeat: 'weekly' },
  { id: '2', title: 'Visitar la fundación Shalom', date: new Date(), timeFrom: '9:30 am', timeTo: '11:00 am', category: 'Fundación', reminder: false, reminderMinutes: 0, repeat: 'none' },
  { id: '3', title: 'Comprar libro', date: new Date(Date.now() + 86400000), timeFrom: '10:00 am', timeTo: '12:00 am', category: 'Otro', reminder: true, reminderMinutes: 60, repeat: 'none', isReminder: true },
];

const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

const DAY_ITEM_WIDTH = 48;
const DAY_ITEM_GAP = 8;

export default function AgendaScreen({ navigation }: any) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState(MOCK_EVENTS);
  
  const calendarScrollRef = useRef<ScrollView>(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isToday = (date: Date) => isSameDay(date, today);

  // Centrar en el dia actual o seleccionado
  useEffect(() => {
    const targetDay = currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()
      ? selectedDate.getDate()
      : currentMonth === today.getMonth() && currentYear === today.getFullYear()
        ? today.getDate()
        : 1;
    
    const scrollX = (targetDay - 1) * (DAY_ITEM_WIDTH + DAY_ITEM_GAP) - 120;
    
    setTimeout(() => {
      calendarScrollRef.current?.scrollTo({ x: Math.max(0, scrollX), animated: true });
    }, 100);
  }, [currentMonth, currentYear]);

  const todayEvents = events.filter((e) => isSameDay(e.date, selectedDate) && !e.isReminder);
  const reminderEvents = events.filter((e) => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(e.date, tomorrow) && e.isReminder;
  });

  const hasEvent = (day: number) => events.some((e) =>
    e.date.getDate() === day &&
    e.date.getMonth() === currentMonth &&
    e.date.getFullYear() === currentYear
  );

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar evento', '¿Deseas eliminar este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setEvents(events.filter((e) => e.id !== id)) },
    ]);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const formatSelectedDate = () => {
    const dayName = WEEK_DAYS[selectedDate.getDay()];
    const day = selectedDate.getDate();
    const month = MONTHS[selectedDate.getMonth()];
    return `${dayName}, ${day} de ${month}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Feather name="chevron-left" size={24} color={COLORS.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Agenda</Text>
      </View>

      {/* Calendario */}
      <View style={styles.calendarCard}>
        <View style={styles.monthPicker}>
          <TouchableOpacity onPress={prevMonth} style={styles.monthArrow}>
            <Feather name="chevron-left" size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{MONTHS[currentMonth]} {currentYear}</Text>
          <TouchableOpacity onPress={nextMonth} style={styles.monthArrow}>
            <Feather name="chevron-right" size={20} color={COLORS.darkGray} />
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
            const isTodayDate = isToday(date);
            const hasEv = hasEvent(day);
            
            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayItem,
                  isSelected && styles.dayItemSelected,
                  isTodayDate && !isSelected && styles.dayItemToday,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dayName, isSelected && styles.dayTextSelected]}>
                  {WEEK_DAYS[date.getDay()]}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected]}>
                  {day}
                </Text>
                {hasEv && <View style={[styles.eventDot, isSelected && styles.eventDotSelected]} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Fecha seleccionada */}
      <View style={styles.dateHeader}>
        <Text style={styles.dateHeaderText}>{formatSelectedDate()}</Text>
        <Text style={styles.eventCount}>{todayEvents.length} eventos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Lista de eventos */}
        {todayEvents.length > 0 && (
          <View style={styles.eventsSection}>
            {todayEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={[styles.eventColorBar, { backgroundColor: CATEGORY_COLORS[event.category] }]} />
                <View style={styles.eventContent}>
                  <View style={styles.eventTop}>
                    <View style={[styles.categoryBadge, { backgroundColor: `${CATEGORY_COLORS[event.category]}15` }]}>
                      <Feather name={CATEGORY_ICONS[event.category] as any} size={12} color={CATEGORY_COLORS[event.category]} />
                      <Text style={[styles.categoryText, { color: CATEGORY_COLORS[event.category] }]}>{event.category}</Text>
                    </View>
                    <View style={styles.eventActions}>
                      <TouchableOpacity onPress={() => navigation.navigate('AddEventScreen', { event })} style={styles.actionBtn}>
                        <Feather name="edit-2" size={14} color={COLORS.gray} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(event.id)} style={styles.actionBtn}>
                        <Feather name="trash-2" size={14} color={COLORS.red} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventTimeRow}>
                    <Feather name="clock" size={13} color={COLORS.gray} />
                    <Text style={styles.eventTime}>{event.timeFrom} - {event.timeTo}</Text>
                    {event.reminder && (
                      <View style={styles.reminderIcon}>
                        <Feather name="bell" size={10} color={COLORS.primary} />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recordatorios para mañana */}
        {reminderEvents.length > 0 && (
          <View style={styles.reminderSection}>
            <Text style={styles.reminderSectionTitle}>Para mañana</Text>
            {reminderEvents.map((event) => (
              <View key={event.id} style={styles.reminderCard}>
                <View style={[styles.reminderIcon2, { backgroundColor: `${CATEGORY_COLORS[event.category]}15` }]}>
                  <Feather name={CATEGORY_ICONS[event.category] as any} size={16} color={CATEGORY_COLORS[event.category]} />
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderTitle} numberOfLines={1}>{event.title}</Text>
                  <Text style={styles.reminderTime}>{event.timeFrom}</Text>
                </View>
                <Feather name="chevron-right" size={18} color={COLORS.gray} />
              </View>
            ))}
          </View>
        )}

        {/* Estado vacio */}
        {todayEvents.length === 0 && reminderEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="calendar" size={48} color={COLORS.gray} />
            <Text style={styles.emptyTitle}>Sin eventos</Text>
            <Text style={styles.emptyText}>No tienes eventos para este dia</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Boton agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEventScreen', { defaultDate: selectedDate })}
      >
        <Feather name="plus" size={20} color={COLORS.white} />
        <Text style={styles.addButtonText}>Nuevo evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.text,
  },

  calendarCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    padding: 16,
  },
  monthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthArrow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: { fontSize: 16, fontWeight: '600', color: COLORS.darkGray },
  
  daysScroll: { gap: DAY_ITEM_GAP, paddingHorizontal: 4 },
  dayItem: {
    width: DAY_ITEM_WIDTH,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.background,
    gap: 4,
  },
  dayItemSelected: { backgroundColor: COLORS.primary },
  dayItemToday: { borderWidth: 1.5, borderColor: COLORS.primary },
  dayName: { fontSize: 11, fontWeight: '500', color: COLORS.gray },
  dayNumber: { fontSize: 18, fontWeight: '700', color: COLORS.darkGray },
  dayTextSelected: { color: COLORS.white },
  eventDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.primary },
  eventDotSelected: { backgroundColor: COLORS.white },

  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dateHeaderText: { fontSize: 15, fontWeight: '600', color: COLORS.darkGray },
  eventCount: { fontSize: 13, color: COLORS.gray },

  scroll: { paddingHorizontal: 20 },

  eventsSection: { gap: 12 },
  eventCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  eventColorBar: { width: 4 },
  eventContent: { flex: 1, padding: 16 },
  eventTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: { fontSize: 11, fontWeight: '600' },
  eventActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 4 },
  eventTitle: { fontSize: 15, fontWeight: '600', color: COLORS.darkGray, marginBottom: 8 },
  eventTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventTime: { fontSize: 13, color: COLORS.gray },
  reminderIcon: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },

  reminderSection: {
    marginTop: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  reminderSectionTitle: { fontSize: 14, fontWeight: '600', color: COLORS.darkGray, marginBottom: 12 },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    gap: 12,
  },
  reminderIcon2: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: 14, fontWeight: '500', color: COLORS.darkGray },
  reminderTime: { fontSize: 12, color: COLORS.gray, marginTop: 2 },

  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.darkGray, marginTop: 16 },
  emptyText: { fontSize: 14, color: COLORS.gray, marginTop: 4 },

  addButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});