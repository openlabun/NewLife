import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSizes, spacing } from '../../../../constants/theme';
import AgendaCalendar from './components/AgendaCalendar';
import EventCard from './components/EventCard';

const COLORS = {
  primary: '#D38A58',
  white: '#FFFFFF',
  gray: '#969696',
  darkGray: '#404040',
  background: '#FAFAFA',
};

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

type AgendaEvent = {
  id: string;
  title: string;
  date: Date;
  timeFrom: string;
  timeTo: string;
  category: string;
  reminder: boolean;
  reminderMinutes: number;
  repeat: string;
  isReminder?: boolean;
};

const MOCK_EVENTS: AgendaEvent[] = [
  { id: '1', title: 'Asistir a grupo virtual', date: new Date(), timeFrom: '8:00 am', timeTo: '9:00 am', category: 'Grupo AA', reminder: true, reminderMinutes: 30, repeat: 'weekly' },
  { id: '2', title: 'Visitar la fundación Shalom', date: new Date(), timeFrom: '9:30 am', timeTo: '11:00 am', category: 'Fundación', reminder: false, reminderMinutes: 0, repeat: 'none' },
  { id: '3', title: 'Comprar libro', date: new Date(Date.now() + 86400000), timeFrom: '10:00 am', timeTo: '12:00 am', category: 'Otro', reminder: true, reminderMinutes: 60, repeat: 'none', isReminder: true },
];

export default function AgendaScreen({ navigation }: any) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState(MOCK_EVENTS);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const hasEvent = (day: number) => events.some((e) =>
    e.date.getDate() === day &&
    e.date.getMonth() === currentMonth &&
    e.date.getFullYear() === currentYear
  );

  const todayEvents = events.filter((e) => isSameDay(e.date, selectedDate) && !e.isReminder);
  const reminderEvents = events.filter((e) => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(e.date, tomorrow) && e.isReminder;
  });

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar evento', '¿Deseas eliminar este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => setEvents(events.filter((e) => e.id !== id)) },
    ]);
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
      <AgendaCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrevMonth={() => {
          if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
          else setCurrentMonth(currentMonth - 1);
        }}
        onNextMonth={() => {
          if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
          else setCurrentMonth(currentMonth + 1);
        }}
        hasEvent={hasEvent}
      />

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
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                timeFrom={event.timeFrom}
                timeTo={event.timeTo}
                reminder={event.reminder}
                onEdit={() => navigation.navigate('AddEventScreen', { event })}
                onDelete={() => handleDelete(event.id)}
              />
            ))}
          </View>
        )}

        {/* Recordatorios para mañana */}
        {reminderEvents.length > 0 && (
          <View style={styles.reminderSection}>
            <Text style={styles.reminderSectionTitle}>Para mañana</Text>
            {reminderEvents.map((event) => (
              <View key={event.id} style={styles.reminderCard}>
                <View style={[styles.reminderIcon2, { backgroundColor: `#D38A5815` }]}>
                  <Feather name="home" size={16} color="#D38A58" />
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