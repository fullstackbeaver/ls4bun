import { ContentType } from "./httpServer_constants";
/**
 * Returns the content type of a file based on its extension
 *
 * @param {string} fileName - Path of the file
 *
 * @returns {ContentType} - The content type of the file
 */
export declare function defineContentType(fileName: string): ContentType;
