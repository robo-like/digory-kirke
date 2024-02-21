import type { Page } from './buildSite.types'
import { promises as fs } from "fs";
import { markdownToPage } from './buildSite.mdToPage'
import { basePath } from './buildSite.args'

/** takes an array of local paths and turns them into Pages */
export async function filesToPages(files: string[]) {
  const pages: { [key: string]: Page } = {};
  for (const file of files) {
    const data = await fs.readFile(file, { encoding: "utf-8" });
    //const metaData = findMeta(data); //@todo
    const httpPath = file.replace(basePath, "");
    console.log(`working on ${httpPath}`);
    pages[httpPath.toLowerCase()] = markdownToPage(data);
  }
  return pages;
}
