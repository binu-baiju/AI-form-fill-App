// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        // Optionally, you can include other fields here if needed
      },
    });

    // const savedUser = await newUser.save();
    console.log(newUser);

    //send verification email

    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
