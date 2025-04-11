// // lib/uploadService.ts
// import { v4 as uuid } from "uuid";
// import path from "path";
// import fs from "fs/promises";

// /**
//  * Saves a file to the local file system and returns the file path
//  * @param file The file to upload
//  * @param folder The folder to save the file in
//  * @returns The path to the saved file
//  */
// export async function uploadImage(
//   file: File,
//   folder: string = "uploads"
// ): Promise<string> {
//   try {
//     // Create unique filename
//     const fileExtension = file.name.split(".").pop();
//     const fileName = `${uuid()}.${fileExtension}`;

//     // Create uploads directory if it doesn't exist
//     const uploadDir = path.join(process.cwd(), "public", folder);
//     await fs.mkdir(uploadDir, { recursive: true });

//     // File path where we'll save the file
//     const filePath = path.join(uploadDir, fileName);

//     // Convert File object to Buffer
//     const buffer = Buffer./
