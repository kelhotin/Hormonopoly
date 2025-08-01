import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCycleInfo, setCycleInfo, CycleInfo } from '@/lib/menstrual';

export default function CycleScreen() {
  const [info, setInfo] = useState<CycleInfo | null>(null);
  const [marked, setMarked] = useState<any>({});

  useEffect(() => {
    getCycleInfo().then((data) => {
      setInfo(data);
      setMarked(generateMarks(data));
    });
  }, []);

  const onDayPress = (day: DateData) => {
    const newInfo = { ...info!, lastPeriodStart: day.dateString };
    setInfo(newInfo);
    setCycleInfo({ lastPeriodStart: day.dateString });
    setMarked(generateMarks(newInfo));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Cycle Tracker</ThemedText>
      {info && (
        <Calendar
          onDayPress={onDayPress}
          markedDates={marked}
          style={styles.calendar}
        />
      )}
      <ThemedText>
        Tap a date to set the first day of your last period.
      </ThemedText>
    </ThemedView>
  );
}

function generateMarks(info: CycleInfo) {
  const marks: any = {};
  const start = new Date(info.lastPeriodStart);
  for (let i = 0; i < info.periodLength; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const iso = date.toISOString().split('T')[0];
    marks[iso] = { selected: true, selectedColor: '#f06292' };
  }
  const nextStart = new Date(start);
  nextStart.setDate(start.getDate() + info.cycleLength);
  for (let i = 0; i < info.periodLength; i++) {
    const date = new Date(nextStart);
    date.setDate(nextStart.getDate() + i);
    const iso = date.toISOString().split('T')[0];
    marks[iso] = { marked: true, dotColor: '#f06292' };
  }
  return marks;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 16,
  },
});
