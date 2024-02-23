import fg from "fast-glob";
import { filePath, meta, pattern, basePath } from "./buildSite.args";
import { filesToPages } from "./buildSite.filesToPages";
import { writeJsonArrayToFile } from "./buildSite.writeToFile";
import { getTheme } from "./buildSite.getTheme";

/**
    ---------   Entry point for the Dirgory Kirke site builder.
*/
async function main() {
  const files = await fg(pattern);
  const { pages, sidebar } = await filesToPages(files);

  const theme = await getTheme();

  writeJsonArrayToFile(filePath, {
    pages,
    meta,
    sidebar,
    theme,
  })
    .then(() => console.log("JSON array written to file successfully."))
    .catch((error) => console.error(error))
    .finally(process.exit);
}

main();
