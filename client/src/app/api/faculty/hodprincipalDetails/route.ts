import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Parse facultyId from query parameters
    const { searchParams } = new URL(req.url);
    const facultyId = searchParams.get("facultyId");

    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: "Faculty ID is required" },
        { status: 400 }
      );
    }

    // Fetch data from both tables
    const personalDetails = await prisma.facultyPersonalDetails.findUnique({
      where: { facultyId },
      select: {
        facultyId: true,
        firstName: true,
        middleName: true,
        lastName: true,
      },
    });

    const academicDetails = await prisma.facultyAcademicDetails.findUnique({
      where: { facultyId },
      select: {
        qualification: true,
        department: true,
        designation: true,
      },
    });

    if (!personalDetails || !academicDetails) {
      return NextResponse.json(
        { success: false, error: "Faculty details not found" },
        { status: 404 }
      );
    }

    // Combine the results and return
    return NextResponse.json({
      success: true,
      data: {
        ...personalDetails,
        ...academicDetails,
      },
    });
  } catch (error) {
    console.error("Error fetching faculty details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
