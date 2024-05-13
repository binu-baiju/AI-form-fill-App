import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { log } from "console";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
// import PDFParser, { EventMap } from "pdf2json";
import EventEmitter from "events";
import pdf from "pdf-parse";
// import { PDFDocumentParsed } from "pdf-parse";

// import PDFData from "pdf-parse";

// import project from "../../../public/project.pdf";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || "",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.ACCESS_SECRET_KEY_ID || "",
  },
});

async function uploadFileToS3(file: any, fileName: any) {
  const fileBuffer = file;
  console.log(fileName);
  // try {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  // await s3Client.send(command);
  // return fileName;

  try {
    const { ETag } = await s3Client.send(command);
    console.log("response:", ETag);
    return {
      ETag,
      Bucket: params.Bucket,
      Key: params.Key,
      fileName2: fileName,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

export async function POST(request: any) {
  console.log("hrllo");
  let pdfText;

  try {
    const formData = await request.formData();
    console.log("hrllo");

    const file = formData.get("resume");
    console.log(formData, "file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("buffers:", buffer);
    const fileName = `${uuidv4()}-${file.name}`;
    // const fileName2 = await uploadFileToS3(buffer, fileName);
    const { ETag, Bucket, Key, fileName2 } = await uploadFileToS3(
      buffer,
      fileName,
    );
    console.log("filename", fileName2);
    const { firstname, lastname, email, bio } = Object.fromEntries(
      formData.entries(),
    );
    console.log(firstname, lastname, email, bio);
    const location = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.BUCKET_NAME}/${Key}`;

    // await pdf(buffer).then(async (data) => {
    //   // PDF text
    //   console.log("text:", data.text);
    //   pdfText = data.text;
    //   console.log("pdftext:", pdfText);
    //   await createUser(pdfText);

    //   // res.send({ pdfText: data.text });
    // });
    const { text: pdfText } = await pdf(buffer);
    const response = await createUser({
      firstname,
      lastname,
      email,
      bio,
      location,
      pdfText,
    });

    // return response;
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error });
  }
}

async function createUser(userData: any) {
  try {
    const { firstname, lastname, email, bio, location, pdfText } = userData;
    const user = await prisma.userDetails.create({
      data: {
        firstname,
        lastname,
        email,
        bio,
        resumeLink: location,
        pdfText: pdfText, // Assign pdfText here
        // Optionally, you can also store other form data like URLs
      },
    });
    console.log("User created:", user);
    // Handle success if necessary
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error });

    // Handle error if necessary
  }
}

// console.log("user:", user);
// } catch (error) {
//   return NextResponse.json({ error });
// }
// }

// const fileName = `${uuidv4()}-${file.name}`;
// // const fileName2 = await uploadFileToS3(buffer, fileName);
// const { ETag, Bucket, Key, fileName2 } = await uploadFileToS3(
//   buffer,
//   fileName,
// );
// console.log("filename", fileName2);
// const { firstname, lastname, email, bio } = Object.fromEntries(
//   formData.entries(),
// );
// console.log(firstname, lastname, email, bio);
// const location = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.BUCKET_NAME}/${Key}`;
// const user = await prisma.user.create({
//   data: {
//     firstname,
//     lastname,
//     email,
//     bio,
//     resumeLink: location,
//     pdfText: pdfText,
//     // Store the resume link in MongoDB
//     // Optionally, you can also store other form data like URLs
//   },
// });
