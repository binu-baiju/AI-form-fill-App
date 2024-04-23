// // import { NextResponse } from "next/server";
// // import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// // const s3Client = new S3Client({
// //   region: process.env.AWS_S3_REGION,
// //   credentials: {
// //     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
// //     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
// //   },
// // });

// // async function uploadFileToS3(file, fileName) {
// //   const fileBuffer = file;
// //   console.log(fileName);

// //   const params = {
// //     Bucket: process.env.AWS_S3_BUCKET_NAME,
// //     Key: `${fileName}`,
// //     Body: fileBuffer,
// //     ContentType: "image/jpg",
// //   };

// //   const command = new PutObjectCommand(params);
// //   await s3Client.send(command);
// //   return fileName;
// // }

// // export async function POST(request) {
// //   try {
// //     const formData = await request.formData();
// //     const file = formData.get("file");

// //     if (!file) {
// //       return NextResponse.json({ error: "File is required." }, { status: 400 });
// //     }

// //     const buffer = Buffer.from(await file.arrayBuffer());
// //     const fileName = await uploadFileToS3(buffer, file.name);

// //     return NextResponse.json({ success: true, fileName });
// //   } catch (error) {
// //     return NextResponse.json({ error });
// //   }
// // }

// import { NextResponse } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { PrismaClient } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next/types";

// const prisma = new PrismaClient();

// const s3Client = new S3Client({
//   region: process.env.AWS_S3_REGION || "",
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "",
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || "",
//   },
// });

// async function uploadFileToS3(file: any, fileName: string) {
//   const fileBuffer = file;

//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: `${fileName}`,
//     Body: fileBuffer,
//     ContentType: "application/pdf", // Change to the appropriate content type for resumes
//   };

//   const command = new PutObjectCommand(params);
//   await s3Client.send(command);
//   return fileName;
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   console.log("entered post");

//   try {
//     const formData = await req.formData();
//     // const formData = await request;

//     console.log("entered post 2", formData);

//     const file = formData.get("file");
//     console.log("file:", file);

//     if (!file) {
//       return NextResponse.json({ error: "File is required." }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const fileName = await uploadFileToS3(buffer, file.name);

//     // Store other form data in MongoDB
//     const { firstname, lastname, email, bio} = formData;

//     const user = await prisma.user.create({
//       data: {
//         firstname,
//         lastname,
//         email,
//         bio,
//         resumeLink: fileName, // Store the resume link in MongoDB
//         // Optionally, you can also store other form data like URLs
//       },
//     });

//     return NextResponse.json({ success: true, user });
//   } catch (error) {
//     return NextResponse.json({ error, error2: "yes error" });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_S3_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

// endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const response = await Promise.all(
    files.map(async (file) => {
      // not sure why I have to override the types here
      const Body = (await file.arrayBuffer()) as Buffer;
      s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
    }),
  );

  return NextResponse.json(response);
}
