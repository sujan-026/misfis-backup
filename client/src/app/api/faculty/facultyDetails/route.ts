import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";


export async function GET(req: NextRequest) {
  try {
    // Parse department from query parameters
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");

    if (!department) {
      return NextResponse.json(
        { success: false, error: "Department is required" },
        { status: 400 }
      );
    }

    // Fetch all faculty details from both tables based on department
    const facultyList = await prisma.facultyAcademicDetails.findMany({
      where: { department },
      select: {
        facultyId: true,
        qualification: true,
        department: true,
        level: true,
        designation: true,
      },
    });

    // Extract facultyIds from facultyList
    const facultyIds = facultyList.map(faculty => faculty.facultyId);

    // Fetch personal details based on facultyIds
    const personalDetails = await prisma.facultyPersonalDetails.findMany({
      where: { facultyId: { in: facultyIds } },
      select: {
        facultyId: true,
        firstName: true,
        middleName: true,
        lastName: true,
      },
    });

    // const academicDetails = await prisma.facultyAcademicDetails.findMany({
    //   where: { department },
    //   select: {
    //     qualification: true,
    //     department: true,
    //     designation: true,
    //   },
    // });

    if (!facultyList.length) {
      return NextResponse.json(
        { success: false, error: "No faculty found for the specified department" },
        { status: 404 }
      );
    }

    // Format and return the combined data
    const formattedData = facultyList.map((faculty) => {
      const personalDetail = personalDetails.find(detail => detail.facultyId === faculty.facultyId);
      return {
        facultyId: faculty.facultyId,
        qualification: faculty.qualification,
        department: faculty.department,
        designation: faculty.designation,
        firstName: personalDetail?.firstName,
        middleName: personalDetail?.middleName,
        lastName: personalDetail?.lastName,
      };
    });

    return NextResponse.json({ success: true, data: formattedData});
  } catch (error) {
    console.error("Error fetching faculty by department:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
