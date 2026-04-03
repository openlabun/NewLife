import React, { useState } from 'react';
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

const MOCK_EVENTS: AgendaEvent[] = [
  { id: '1', title: 'Asistir a grupo virtual', date: new Date(), timeFrom: '8:00 am', timeTo: '9:00 am', category: 'Grupo AA', reminder: true, reminderMinutes: 30, repeat: 'weekly' },
  { id: '2', title: 'Visitar la fundación Shalom y hablar con el psicólogo Juan', date: new Date(), timeFrom: '9:30 am', timeTo: '11:00 am', category: 'Fundación', reminder: false, reminderMinutes: 0, repeat: 'none' },
  { id: '3', title: 'Comprar libro de solo por hoy', date: new Date(Date.now() + 86400000), timeFrom: '10:00 am', timeTo: '12:00 am', category: 'Otro', reminder: true, reminderMinutes: 60, repeat: 'none', isReminder: true },
  { id: '4', title: 'Reunión mensual', date: new Date(Date.now() + 86400000), timeFrom: '10:00 am', timeTo: '12:00 am', category: 'Reunion', reminder: false, reminderMinutes: 0, repeat: 'none', isReminder: true },
];

const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function AgendaScreen({ navigation }: any) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState(MOCK_EVENTS);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isToday = (date: Date) => isSameDay(date, today);

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
    Alert.alert('Eliminar evento', '¿Estás seguro de que deseas eliminar este evento?', [
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#3D3D3D" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mi Agenda</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Feather name="search" size={20} color="#3D3D3D" />
        </TouchableOpacity>
      </View>

      {/* Calendario Card */}
      <View style={styles.calendarCard}>
        {/* Month Picker */}
        <View style={styles.monthPicker}>
          <TouchableOpacity onPress={prevMonth} style={styles.monthArrow}>
            <Feather name="chevron-left" size={20} color="#3D3D3D" />
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{MONTHS[currentMonth]} {currentYear}</Text>
          <TouchableOpacity onPress={nextMonth} style={styles.monthArrow}>
            <Feather name="chevron-right" size={20} color="#3D3D3D" />
          </TouchableOpacity>
        </View>

        {/* Days Scroll */}
        <ScrollView
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
                {hasEv && (
                  <View style={[styles.eventDot, isSelected && styles.eventDotSelected]} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Selected Date Header */}
      <View style={styles.dateHeader}>
        <View style={styles.dateHeaderLeft}>
          <View style={styles.dateIconCircle}>
            <Feather name="calendar" size={16} color="#D38A58" />
          </View>
          <Text style={styles.dateHeaderText}>{formatSelectedDate()}</Text>
        </View>
        <Text style={styles.eventCount}>
          {todayEvents.length} {todayEvents.length === 1 ? 'evento' : 'eventos'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Events List */}
        {todayEvents.length > 0 && (
          <View style={styles.eventsSection}>
            {todayEvents.map((event, index) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={[styles.eventColorBar, { backgroundColor: CATEGORY_COLORS[event.category] }]} />
                <View style={styles.eventContent}>
                  <View style={styles.eventTop}>
                    <View style={[styles.eventCategoryBadge, { backgroundColor: `${CATEGORY_COLORS[event.category]}15` }]}>
                      <Feather name={CATEGORY_ICONS[event.category] as any} size={12} color={CATEGORY_COLORS[event.category]} />
                      <Text style={[styles.eventCategoryText, { color: CATEGORY_COLORS[event.category] }]}>
                        {event.category}
                      </Text>
                    </View>
                    <View style={styles.eventActions}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('AddEventScreen', { event })}
                        style={styles.eventActionBtn}
                      >
                        <Feather name="edit-2" size={14} color="#8B7355" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(event.id)}
                        style={styles.eventActionBtn}
                      >
                        <Feather name="trash-2" size={14} color="#E57373" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventTimeRow}>
                    <Feather name="clock" size={14} color="#A3A3A3" />
                    <Text style={styles.eventTimeText}>{event.timeFrom} - {event.timeTo}</Text>
                    {event.reminder && (
                      <View style={styles.reminderBadge}>
                        <Feather name="bell" size={10} color="#D38A58" />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Reminder Section */}
        {reminderEvents.length > 0 && (
          <View style={styles.reminderSection}>
            <View style={styles.reminderHeader}>
              <Feather name="sunrise" size={18} color="#D38A58" />
              <Text style={styles.reminderHeaderText}>Para manana</Text>
            </View>
            {reminderEvents.map((event) => (
              <View key={event.id} style={styles.reminderCard}>
                <View style={[styles.reminderIconCircle, { backgroundColor: `${CATEGORY_COLORS[event.category]}20` }]}>
                  <Feather name={CATEGORY_ICONS[event.category] as any} size={18} color={CATEGORY_COLORS[event.category]} />
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderTitle} numberOfLines={1}>{event.title}</Text>
                  <Text style={styles.reminderTime}>{event.timeFrom}</Text>
                </View>
                <TouchableOpacity style={styles.reminderArrow}>
                  <Feather name="chevron-right" size={18} color="#A3A3A3" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {todayEvents.length === 0 && reminderEvents.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Feather name="calendar" size={32} color="#D38A58" />
            </View>
            <Text style={styles.emptyTitle}>Sin eventos</Text>
            <Text style={styles.emptyText}>No tienes eventos programados para este dia</Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEventScreen', { defaultDate: selectedDate })}
      >
        <Feather name="plus" size={20} color="#FFF" />
        <Text style={styles.addButtonText}>Nuevo evento</Text>
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
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Calendar Card
  calendarCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
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
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: { fontSize: 16, fontWeight: '600', color: '#3D3D3D' },
  daysScroll: { gap: 8 },
  dayItem: {
    width: 48,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#F9F9F9',
    gap: 4,
  },
  dayItemSelected: { backgroundColor: '#D38A58' },
  dayItemToday: { borderWidth: 1.5, borderColor: '#D38A58' },
  dayName: { fontSize: 11, fontWeight: '500', color: '#A3A3A3' },
  dayNumber: { fontSize: 18, fontWeight: '700', color: '#3D3D3D' },
  dayTextSelected: { color: '#FFF' },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D38A58',
  },
  eventDotSelected: { backgroundColor: '#FFF' },

  // Date Header
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dateHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dateIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateHeaderText: { fontSize: 15, fontWeight: '600', color: '#3D3D3D' },
  eventCount: { fontSize: 13, color: '#A3A3A3', fontWeight: '500' },

  scroll: { paddingHorizontal: 20 },

  // Events Section
  eventsSection: { gap: 12 },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  eventColorBar: { width: 4 },
  eventContent: { flex: 1, padding: 16 },
  eventTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  eventCategoryText: { fontSize: 11, fontWeight: '600' },
  eventActions: { flexDirection: 'row', gap: 4 },
  eventActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3D3D3D',
    marginBottom: 8,
    lineHeight: 22,
  },
  eventTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventTimeText: { fontSize: 13, color: '#A3A3A3', fontWeight: '500' },
  reminderBadge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },

  // Reminder Section
  reminderSection: {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  reminderHeaderText: { fontSize: 15, fontWeight: '600', color: '#3D3D3D' },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    gap: 12,
  },
  reminderIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: 14, fontWeight: '600', color: '#3D3D3D' },
  reminderTime: { fontSize: 12, color: '#A3A3A3', marginTop: 2 },
  reminderArrow: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(211, 138, 88, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#3D3D3D', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#A3A3A3', textAlign: 'center', lineHeight: 20 },

  // Add Button
  addButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    backgroundColor: '#D38A58',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#D38A58',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});