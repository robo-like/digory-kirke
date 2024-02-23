import { promises as fs } from "fs";
import { basePath } from "./buildSite.args";

// Async function to get file contents by path
async function getFileByPath(filePath: string) {
  try {
    const content = await fs.readFile(
      "./" + basePath + "/../" + filePath,
      "utf8",
    );
    return content;
  } catch (error) {
    console.error(`Error reading file from ${filePath}:`, error);
    throw error; // Rethrowing the error is more idiomatic in async functions
  }
}

export async function getTheme() {
  const css = await getFileByPath("theme/theme.css");
  const layout = await getFileByPath("theme/layout.html");

  return {
    layout,
    css,
  };
}
