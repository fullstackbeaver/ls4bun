import fs   from "node:fs";
import path from "node:path";

function listAllFiles(dirPath:string, arrayOfFiles:string[]):string[] {
  const files = fs.readdirSync(dirPath);
  files.forEach((file:string) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = listAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

export function getFolderContent(folder: string) {
  try {
    return listAllFiles(folder, []) ;
  } catch (err) {
    console.error("Error reading folder:", err);
    throw err;
  }
}