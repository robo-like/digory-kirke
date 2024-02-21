
export type Page = {
  title: String;
  ordinal?: number | string;
  date?: Date;
  content: String;
  rest: any;
};

export type Site = {
  meta: {
    title: String;
  };
  pages: {
    /** key maps to the URL path of the article */
    [key: string]: Page;
  };
};
