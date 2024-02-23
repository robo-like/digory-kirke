import type { TreeNode } from "./buildSite.genSidebar";

export type Page = {
  title: String;
  ordinal?: number | string;
  date?: Date;
  content: string;
  rest: any;
};

export type Site = {
  meta: {
    title: String;
  };
  sidebar: TreeNode;
  theme: {
    layout: string;
    css: string;
  };
  pages: {
    /** key maps to the URL path of the article */
    [key: string]: Page;
  };
};
