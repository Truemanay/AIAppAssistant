import { tUserPath } from "./whitelist";

export const userPath: tUserPath[] = [];

export const updateUserPath = (item: tUserPath): void => {
  //   const index = record.findIndex((recordItem) => recordItem.action === item.action);

  //   if (index !== -1) {
  // Update existing item
  // userPath[index] = item;
  //   } else {
  // Add new item
  userPath.push(item);
  //   }

  writeRecordToFile().catch((err) => {
    console.error("Error saving record to file:", err);
  });
};

// export const findRecordByAction = (actionToMatch: string): RecordItem | undefined => {
//   return record.find((item) => item.action === actionToMatch);
// };

import * as FileSystem from "expo-file-system";

const writeRecordToFile = async (): Promise<void> => {
  const path = `${FileSystem.documentDirectory}userPath.json`;

  try {
    await FileSystem.writeAsStringAsync(path, JSON.stringify(userPath, null, 2));
    console.log("Record saved to", path);
  } catch (err) {
    console.error("Error writing the record to file:", err);
  }
};
