import fg from "fast-glob";
import { pattern, filePath, meta } from './buildSite.args'
import { writeJsonArrayToFile } from './buildSite.writeToFile'
import { filesToPages } from './buildSite.filesToPages'

/**
--------------- Entry point for the Dirgory Kirke site builder.
*/
async function main() {
  const files = await fg(pattern);
  const pages = await filesToPages(files);

  writeJsonArrayToFile(filePath, {
    pages,
    meta,
  })
    .then(() => console.log("JSON array written to file successfully."))
    .catch((error) => console.error(error))
    .finally(process.exit);
}

main()
