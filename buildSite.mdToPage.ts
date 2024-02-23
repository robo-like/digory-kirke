import { parse as parseYaml } from "yaml";
import { parse as parseMarkdown } from "marked";
import type { Page } from "./buildSite.types";

/** looks through each file and finds and builds their meta data */
export function markdownToPage(data: string, path: string): Page {
  const frontMatterRegex = /^---\n([\s\S]+?)\n---\n([\s\S]*)/;
  const match = data.match(frontMatterRegex);

  let html,
    rest = { title: "", date: null };

  //if there's a heading section we'll know it has some front matter
  if (match) {
    const frontMatterRaw = match[1];
    html = match[2].trim();
    rest = parseYaml(frontMatterRaw);
  }
  //otherwise we know that it's just raw MD
  else {
    html = data;
  }
  return {
    title: rest.title || path.split("/").pop() || "",
    ordinal: "@todo",
    date: rest.date ? new Date(rest.date) : undefined,
    content: parseMarkdown(html) as string,
    rest,
  };
}
