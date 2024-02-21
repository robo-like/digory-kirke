import { promises as fs } from "fs";
import type { Site } from './buildSite.types'

/** writes arbitrary JSON data to file */
export async function writeJsonArrayToFile(
  filePath: string,
  json: Site,
): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(json, null, 4), "utf-8");
  } catch (error) {
    console.error("Failed to write file:", error);
  }
}
