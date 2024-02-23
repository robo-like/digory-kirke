import type { Page, Site } from "./buildSite.types";
import type { TreeNode } from "./buildSite.genSidebar";

export function generatePage(path: string, site: Site): String {
  const page: Page = site.pages[path];

  const layout = site.theme.layout;
  const css = site.theme.css;
  const sidebar = `<ul>${sidebarTreeToHtml(site.sidebar)}</ul>`;
  const content = page.content;
  const title = page.title;

  return renderTemplate(layout, { sidebar, content, title, css });
}

function sidebarTreeToHtml(node: TreeNode): String {
  if (!node || node.children.length === 0) {
    return `<li><a href="${node.path}">${node.title}</a></li>`;
  } else {
    let childHtml = node.children.map(sidebarTreeToHtml).join("");
    return `<li><a href="${node.path}">${node.title}</a><ul>${childHtml}</ul></li>`;
  }
}

/** function that takes a HTML template and replaces the templated variables */
function renderTemplate(template: string, state: any) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, variableName: string) => {
    return state.hasOwnProperty(variableName) ? state[variableName] : match;
  });
}
