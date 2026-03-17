import fs from "fs";
import * as kiinteisto from "./../interface/kiinteisto.js";
import data from "./../data.json" with { type: "json" };

let kiinteistot: kiinteisto.kiinteisto[] = [];

export function getData(): kiinteisto.kiinteisto[] {
  return kiinteistot;
}

export function getDataById(id: number): kiinteisto.kiinteisto | null {
  for (const k of kiinteistot) {
    if (k.id === id) {
      return k;
    }
  }
  return null;
}

export function addData(newData: kiinteisto.kiinteisto): void {
  // This is a placeholder function. In a real application, you would implement logic to add data to your data source.
  console.log("Data received:", newData);
}

export function updateData(
  id: number,
  updatedData: kiinteisto.kiinteisto,
): void {
  // This is a placeholder function. In a real application, you would implement logic to update data in your data source.
  console.log(`Data with ID ${id} updated:`, updatedData);
}

export function deleteData(id: number): void {
  for (let i = 0; i < kiinteistot.length; i++) {
    if (Number(kiinteistot[i]?.id) === id) {
      kiinteistot.splice(i, 1);
      break;
    }
  }

  updateDataFile();
  console.log(`Data with ID ${id} deleted`);
}

export async function initializeData(): Promise<number> {
  try {
    await fs.promises.writeFile("../tmpdata.json", JSON.stringify(data, null, 2));
    console.log("Data source initialized successfully");
    kiinteistot = JSON.parse(JSON.stringify(data));
    return 1;
  } catch (err) {
    console.error("Error initializing data source:", err);
    return 0;
  }
}

export async function checkLocalDataFile(): Promise<void> {
  try {
    if (fs.existsSync("../tmpdata.json")) {
      console.log("Data file exists");
      try {
        const fileData = await fs.promises.readFile("../tmpdata.json", "utf-8");
        kiinteistot = JSON.parse(fileData);
        console.log("Data loaded from file successfully");
      } catch (err) {
        console.error("Error reading data file:", err);
      }
    } else {
      console.log("Data file does not exist");
    }
  } catch (err) {
    console.error("Error checking data file:", err);
  }
}

function updateDataFile(): void {
  fs.writeFile("../tmpdata.json", JSON.stringify(kiinteistot, null, 2), (err) => {
    if (err) {
      console.error("Error updating data file:", err);
    } else {
      console.log("Data file updated successfully");
    }
  });
}