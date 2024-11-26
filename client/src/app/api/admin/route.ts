import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";


// Handle GET requests to fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// Handle POST requests to create a new user
export async function POST(request: Request) {
  try {
    const { username, password, role, facultyId } = await request.json();
    const newUser = await prisma.user.create({
      data: { username, password, role, facultyId: facultyId || null },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// Handle PUT requests to update a user
export async function PUT(request: Request) {
  try {
    const { id, username, password, role } = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, password, role },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// Handle DELETE requests to delete a user
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 204 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
