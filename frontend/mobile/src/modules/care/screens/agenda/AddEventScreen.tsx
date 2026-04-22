import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import EventForm from './components/EventForm';

const COLORS = {
  primary: '#D38A58',
  white: '#FFFFFF',
  darkGray: '#404040',
  background: '#FAFAFA',
};

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
};

export default function AddEventScreen({ navigation, route }: any) {
  const existing = route.params?.event as AgendaEvent | undefined;
  const defaultDate: Date = route.params?.defaultDate || new Date();

  const [title, setTitle] = useState(existing?.title || '');
  const [selectedDate, setSelectedDate] = useState<Date>(existing?.date || defaultDate);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [timeFrom, setTimeFrom] = useState(existing?.timeFrom || '8:00 am');
  const [timeTo, setTimeTo] = useState(existing?.timeTo || '9:00 am');
  const [category, setCategory] = useState(existing?.category || 'Reunion');
  const [reminder, setReminder] = useState(existing?.reminder || false);
  const [reminderMinutes, setReminderMinutes] = useState(existing?.reminderMinutes || 30);
  const [repeat, setRepeat] = useState(existing?.repeat || 'none');

  const handleSave = () => {
    // TODO: Integrar con backend
    console.log({
      title,
      selectedDate,
      timeFrom,
      timeTo,
      category,
      reminder,
      reminderMinutes,
      repeat,
    });
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

      {/* Form */}
      <EventForm
        title={title}
        onTitleChange={setTitle}
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
        timeFrom={timeFrom}
        onTimeFromChange={setTimeFrom}
        timeTo={timeTo}
        onTimeToChange={setTimeTo}
        category={category}
        onCategorySelect={setCategory}
        repeat={repeat}
        onRepeatSelect={setRepeat}
        reminder={reminder}
        onReminderToggle={setReminder}
        reminderMinutes={reminderMinutes}
        onReminderMinutesSelect={setReminderMinutes}
      />

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