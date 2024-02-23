import type { Page } from "./buildSite.types";
import { promises as fs } from "fs";
import { markdownToPage } from "./buildSite.mdToPage";
import { basePath } from "./buildSite.args";
import { buildSidebar } from "./buildSite.genSidebar";

/** takes an array of local paths and turns them into Pages */
export async function filesToPages(files: string[]) {
  const pages: { [key: string]: Page } = {};
  const paths: string[] = [];

  //let's start by grabbing the top level readme
  for (const file of files) {
    const data = await fs.readFile(file, { encoding: "utf-8" });
    //const metaData = findMeta(data); //@todo
    let httpPath = file.replace(basePath, "").toLowerCase();

    if (false) {
      console.log(`working on ${httpPath}`);
    }
    pages[httpPath] = markdownToPage(data, httpPath);
    paths.push(httpPath);
  }
  // build sidebar
  const sidebar = buildSidebar(paths);
  console.log(JSON.stringify(sidebar, null, 3));

  return { pages, sidebar };
}
