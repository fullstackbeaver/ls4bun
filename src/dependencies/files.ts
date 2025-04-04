import { ContentType } from "../../ununsed/core/httpServer_constants";
import fs              from "node:fs";
import path            from "node:path";

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

export function defineContentType(fileName:string){
  switch (fileName.split(".").pop()) {
    case "html":
      return ContentType.HTML;
    case "css":
      return ContentType.CSS;
    case "js":
      return ContentType.JS;
    case "json":
      return ContentType.JSON;
    case "jpg":
      return ContentType.JPG;
    case "svg":
      return ContentType.SVG;
    default:
      return ContentType.TEXT;
  }
}