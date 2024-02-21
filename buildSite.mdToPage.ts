import { parse as parseYaml } from "yaml";
import { parse as parseMarkdown } from "marked";
import type { Page } from './buildSite.types'

/** looks through each file and finds and builds their meta data */
export function markdownToPage(data: string): Page {
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
    ordinal: "@todo",
    date: rest.date ? new Date(rest.date) : undefined,
    content: parseMarkdown(html) as string,
    rest,
  };
}
