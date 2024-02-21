import fg from "fast-glob";
import { promises as fs } from "fs";
import { parse as parseYaml } from "yaml";
import { parse as parseMarkdown } from "marked";

type Page = {
  title: String;
  ordinal?: number | string;
  date?: Date;
  content: String;
  rest: any;
};

type Site = {
  meta: {
    title: String;
  };
  pages: {
    /** key maps to the URL path of the article */
    [key: string]: Page;
  };
};

const basePath = "docs";
const pattern = "docs/**/*.md";

/** looks through each file and finds and builds their meta data */
function markdownToPage(data: string): Page {
  const frontMatterRegex = /^---\n([\s\S]+?)\n---\n([\s\S]*)/;
  const match = data.match(frontMatterRegex);

  let html,
    rest = { title: "", date: null };
  if (match) {
    const frontMatterRaw = match[1];
    html = match[2].trim();
    rest = parseYaml(frontMatterRaw);
  } else {
    html = data;
  }
  return {
    title: rest.title || "",
    blog_order: "@todo",
    date: rest.date ? new Date(rest.date) : undefined,
    content: parseMarkdown(html) as string,
    rest,
  };
}

/** takes an array of local paths and turns them into Pages */
async function filesToPages(files: string[]) {
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

/** writes arbitrary JSON data to file */
async function writeJsonArrayToFile(
  filePath: string,
  json: Site,
): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(json, null, 4), "utf-8");
  } catch (error) {
    console.error("Failed to write file:", error);
  }
}

const files = await fg(pattern);

const meta = {
  title: "Dickory Doc",
};

const pages = await filesToPages(files);

// @todo - need to grab the file contents and map front matter data as well
const filePath = "./docs/site.built.json";

writeJsonArrayToFile(filePath, {
  pages,
  meta,
})
  .then(() => console.log("JSON array written to file successfully."))
  .catch((error) => console.error(error))
  .finally(process.exit);
