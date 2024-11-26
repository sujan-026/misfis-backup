import {  NextResponse } from "next/server";
import prisma from "@/app/lib/db";


export async function GET() {
  try {
    // Fetch personal details based on facultyIds
    const branch = await prisma.Branch.findMany({
        select: {
            branchCode: true,
            branchName: true,
        },
    });

    if (!branch.length) {
      return NextResponse.json(
        { success: false, error: "No faculty found for the specified department" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: branch});
  } catch (error) {
    console.error("Error fetching faculty by department:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
