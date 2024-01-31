import * as fs from "expo-file-system";

export interface RecordItem {
  action: string;
  x: number;
  y: number;
}

export const record: RecordItem[] = [
  { action: "test", x: 1, y: 1 },
  // ... other items can be initially added here if needed
];

export const saveOrUpdateRecordItem = (item: RecordItem): void => {
  const index = record.findIndex((recordItem) => recordItem.action === item.action);

  if (index !== -1) {
    // Update existing item
    record[index] = item;
  } else {
    // Add new item
    record.push(item);
  }

  writeRecordToFile().catch((err) => {
    console.error("Error saving record to file:", err);
  });
};

export const findRecordByAction = (actionToMatch: string): RecordItem | undefined => {
  return record.find((item) => item.action === actionToMatch);
};

const writeRecordToFile = async (): Promise<void> => {
  const path = fs.documentDirectory + "record.json";

  try {
    await fs.writeAsStringAsync(path, JSON.stringify(record, null, 2));
    console.log("Record saved to", path);
  } catch (err) {
    console.error("Error writing the record to file:", err);
  }
};
