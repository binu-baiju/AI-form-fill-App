import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // const id = "1";
    const user = await prisma.userDetails.findFirst();
    console.log(user);
    // Retrieve all users from the database
    // const user = await prisma.user.findUnique({ where: { id } });
    return NextResponse.json(user); // Return the users as JSON
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
