import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/User";

// Define the IUser interface if not already defined in the User model
interface IUser {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, email, password }: IUser = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    console.log(username, email, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User has been created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
