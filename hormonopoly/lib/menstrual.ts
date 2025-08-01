export type CycleInfo = {
  lastPeriodStart: string; // YYYY-MM-DD
  cycleLength: number; // in days
  periodLength: number; // in days
};

let cycleData: CycleInfo = {
  lastPeriodStart: new Date().toISOString().split('T')[0],
  cycleLength: 28,
  periodLength: 5,
};

export async function getCycleInfo(): Promise<CycleInfo> {
  return cycleData;
}

export async function setCycleInfo(info: Partial<CycleInfo>): Promise<void> {
  cycleData = { ...cycleData, ...info };
}
