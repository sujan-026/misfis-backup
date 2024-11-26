// import prisma from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     // Parse the JSON data from the request body once
//     const { educationField } = await req.json();
    
//     // Assuming educationField is an array of educational entries
//     if (!Array.isArray(educationField) || educationField.length === 0) {
//       return NextResponse.json({ success: false, error: "No education data provided" }, { status: 400 });
//     }

//     // Process each education record in the array
//     const educationRecords = educationField.map(entry => ({
//       facultyId: entry.facultyId ?? 1456, // default if facultyId is not provided
//       classProgram: entry.class ?? 'N/A',
//       usnSsn: entry.usn ?? 'N/A',
//       schoolCollege: entry.institution ?? 'N/A',
//       specialization: entry.specialization ?? 'N/A',
//       mediumOfInstruction: entry.mediumOfInstruction ?? 'N/A',
//       directCorr: entry.directCorr ?? 'N/A',
//       passClass: entry.passClass ?? 'N/A',
//     }));

//     // Create multiple educational records in FacultyEducation table
//     const newEducationData = await prisma.facultyEducation.createMany({
//       data: educationRecords,
//       skipDuplicates: true, // To avoid inserting duplicates if needed
//     });

//     // Return a success response with the new records
//     return NextResponse.json({ success: true, data: newEducationData });
//   } catch (error) {
//     console.error("Error creating faculty education data:", error);
//     return NextResponse.json({ success: false, error: "Failed to create faculty education data" }, { status: 500 });
//   }
// }
// export async function GET() {
//   try {
//     // Fetch all faculty education records
//     const allFacultyEducation = await prisma.facultyEducation.findFirst({
//       where: {
//         facultyId: 1455,
//       },
//     });

//     // Return a success response with the fetched records
//     return NextResponse.json({ success: true, data: allFacultyEducation });
//   } catch (error) {
//     console.error("Error fetching faculty education data:", error);
//     return NextResponse.json({ success: false, error: "Failed to fetch faculty education data" }, { status: 500 });
//   }
// }


import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if(body){
      console.log({body})
    }else{
      console.log("Error");
    }

    const { personalData } = body;

    const newFacultyData = {
      // Personal details
        facultyId: personalData.facultyId,
        program: personalData.program,
        usnSsn: personalData.usnSsn,
        schoolCollege: personalData.schoolCollege,
        specialization: personalData.specialization,
        mediumOfInstruction: personalData.mediumOfInstruction,  
        passClass: personalData.passClass,
    };

    // console.log(`Faculty Data creation: ${newFacultyData}`);
    const newFaculty = await prisma.faccultyEducation.create({
      data: newFacultyData,
    });

    return NextResponse.json({ success: true, data: newFaculty });
  } catch (error) {
    console.error("Error creating faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create faculty" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Extract `facultyId` from query parameters
    const url = new URL(req.url);
    const facultyId = url.searchParams.get("facultyId");
    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: "Faculty ID is required" },
        { status: 400 }
      );
    }

    // Fetch faculty details from the database
    const allFaculty = await prisma.faccultyEducation.findFirst({
      where: {
        facultyId: facultyId,
      },
    });

    if (!allFaculty) {
      return NextResponse.json(
        { success: false, error: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: allFaculty });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}


