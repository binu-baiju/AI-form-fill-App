import { NextRequest, NextResponse } from "next/server"; // To handle the request and response
import { promises as fs } from "fs"; // To save the file temporarily
import { v4 as uuidv4 } from "uuid"; // To generate a unique filename
// import PDFParser from "pdf2json";
// const pdf = require("pdf-parse");
// const crawler = require("crawler-request");
// const multer = require("multer");

export async function POST(req: NextRequest) {
  //   const formData: FormData = await req.formData();
  //   const uploadedFiles = formData.getAll("filepond");
  //   let fileName = "";
  //   let parsedText = "";
  //   if (uploadedFiles && uploadedFiles.length > 0) {
  //     const uploadedFile = uploadedFiles[1];
  //     console.log("Uploaded file:", uploadedFile);
  //     // Check if uploadedFile is of type File
  //     if (uploadedFile instanceof File) {
  //       // Generate a unique filename
  //       fileName = uuidv4();
  //       // Convert the uploaded file into a temporary file
  //       const tempFilePath = `E:\My Projects\Ai form fill\ai-form-fill\public\project.pdf`;
  //       // Convert ArrayBuffer to Buffer
  //       const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
  //       // Save the buffer as a file
  //       await fs.writeFile(tempFilePath, fileBuffer);
  //       // Parse the pdf using pdf2json. See pdf2json docs for more info.
  //       // The reason I am bypassing type checks is because
  //       // the default type definitions for pdf2json in the npm install
  //       // do not allow for any constructor arguments.
  //       // You can either modify the type definitions or bypass the type checks.
  //       // I chose to bypass the type checks.
  //       //   const pdfParser = new (PDFParser as any)(null, 1);
  //       const pdfParser = new (PDFParser as any)(null, 1);
  //       // See pdf2json docs for more info on how the below works.
  //       pdfParser.on("pdfParser_dataError", (errData: any) =>
  //         console.log(errData.parserError),
  //       );
  //       pdfParser.on("pdfParser_dataReady", () => {
  //         console.log((pdfParser as any).getRawTextContent());
  //         parsedText = (pdfParser as any).getRawTextContent();
  //       });
  //       pdfParser.loadPDF(tempFilePath);
  //     } else {
  //       console.log("Uploaded file is not in the expected format.");
  //     }
  //   } else {
  //     console.log("No files found.");
  //   }
  //   const response = new NextResponse(parsedText);
  //   response.headers.set("FileName", fileName);
  //   return response;
  // console.log(`Request File: ${JSON.stringify(req.file)}`);
  //   let buff = req.file.buffer;
  //   pdf(buff).then((data) => {
  //     // PDF text
  //     console.log(data.text);
  //     res.send({ pdfText: data.text });
  //   });
}
// pages/api/pdf-to-text.js

// import { NextApiRequest, NextApiResponse } from 'next';
// import  {pdf}  from 'pdf-parse';
// import multer from 'multer';

// const upload = multer();

// export default upload.single('file', async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const buffer = req.file.buffer;

//     const pdfData = await extractTextFromPdf(buffer);

//     res.status(200).json({ pdfText: pdfData });
//   } catch (error) {
//     console.error('Error processing PDF:', error);
//     res.status(500).json({ error: 'An error occurred while processing the PDF.' });
//   }
// });

// async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
//   return new Promise((resolve, reject) => {
//     pdf(pdfBuffer).then((data) => {
//       resolve(data.text);
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }
