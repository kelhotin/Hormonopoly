import AsyncStorage from '@react-native-async-storage/async-storage';

export type CycleInfo = {
  /** First day of the last period in YYYY-MM-DD format */
  lastPeriodStart: string;
  /** Typical length of the cycle in days */
  cycleLength: number;
  /** Duration of the period in days */
  periodLength: number;
};

const STORAGE_KEY = 'cycleInfo';

let cycleData: CycleInfo | null = null;

async function load(): Promise<CycleInfo> {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  return saved
    ? JSON.parse(saved)
    : {
        lastPeriodStart: new Date().toISOString().split('T')[0],
        cycleLength: 28,
        periodLength: 5,
      };
}

export async function getCycleInfo(): Promise<CycleInfo> {
  if (!cycleData) {
    cycleData = await load();
  }
  return cycleData;
}

export async function setCycleInfo(info: Partial<CycleInfo>): Promise<void> {
  const current = await getCycleInfo();
  cycleData = { ...current, ...info };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cycleData));
}
