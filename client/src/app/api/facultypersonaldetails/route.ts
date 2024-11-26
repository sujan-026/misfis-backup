import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    // 1. Validate that we have a request body
    if (!req.body) {
      return NextResponse.json(
        { success: false, error: "Request body is missing" },
        { status: 400 }
      );
    }

    // 2. Parse JSON with error handling
    let jsonData;
    try {
      jsonData = await req.json();
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid JSON format in request body" },
        { status: 400 }
      );
    }

    // 3. Validate required schema data exists
    if (!jsonData.personalSchema || !jsonData.financialSchema || 
        !jsonData.educationSchema || !jsonData.dependentsSchema || !jsonData.facultyId) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required schema data",
          requiredSchemas: ["personalSchema", "financialSchema", "educationSchema", "dependentsSchema"]
        },
        { status: 400 }
      );
    }

    const { personalSchema, financialSchema, educationSchema, dependentsSchema } = jsonData;

    // 4. Log the received data for debugging
    console.log("Received data:", {
      personal: personalSchema,
      financial: financialSchema,
      education: educationSchema,
      dependents: dependentsSchema
    });

    const newFacultyData = {
      facultyId: jsonData.facultyId ?? "Unknown Faculty ID",
      qualification: personalSchema?.qualification ?? 'N/A',
      photo: null,
      title: personalSchema?.title ?? 'Mr',
      firstName: personalSchema?.firstName ?? 'sharan',
      middleName: personalSchema?.middleName ?? '',
      lastName: personalSchema?.lastName ?? 'Unknown',
      emailId: personalSchema?.emailId ?? 'noemail@example.com',
      contactNo: personalSchema?.contactNo ?? '0000000000',
      alternateContactNo: personalSchema?.alternateContactNo ?? '0000000000',
      emergencyContactNo: personalSchema?.emergencyContactNo ?? '0000000000',
      adharNo: personalSchema?.adharNo ?? '000000000004',
      panNo: personalSchema?.panNo ?? 'XXXXXX1234',
      dob: personalSchema?.dob ? new Date(personalSchema.dob) : new Date(),
      gender: personalSchema?.gender ?? 'Male',
      nationality: personalSchema?.nationality ?? 'India',
      firstAddressLine1: personalSchema?.firstAddressLine1 ?? 'N/A',
      firstAddressLine2: personalSchema?.firstAddressLine2 ?? 'N/A',
      firstAddressLine3: personalSchema?.firstAddressLine3 ?? 'N/A',
      correspondenceAddressLine1: personalSchema?.correspondenceAddressLine1 ?? 'N/A',
      correspondenceAddressLine2: personalSchema?.correspondenceAddressLine2 ?? 'N/A',
      correspondenceAddressLine3: personalSchema?.correspondenceAddressLine3 ?? 'N/A',
      religion: personalSchema?.religion ?? 'Hindu',
      caste: personalSchema?.caste ?? 'General',
      category: personalSchema?.category ?? 'General',
      motherTongue: personalSchema?.motherTongue ?? 'Unknown',
      speciallyChallenged: personalSchema?.speciallyChallenged ?? false,
      remarks: personalSchema?.remarks ?? '',
      languages: {
        toSpeak: personalSchema?.languagesToSpeak ?? ['English'],
        toRead: personalSchema?.languagesToRead ?? ['English'],
        toWrite: personalSchema?.languagesToWrite ?? ['English'],
      },
      bankName: financialSchema?.bankName ?? 'N/A',
      accountNo: financialSchema?.accountNo ?? '321321321321',
      accountName: financialSchema?.accountName ?? 'Unknown',
      accountType: financialSchema?.accountType ?? 'Savings',
      branch: financialSchema?.branch ?? 'Unknown Branch',
      ifsc: financialSchema?.ifsc ?? 'UNKNOWN000000',
      pfNumber: financialSchema?.pfNumber ?? 'N/A',
      uanNumber: financialSchema?.uanNumber ?? 'N/A',
      pensionNumber: financialSchema?.pensionNumber ?? 'N/A',
      motherName: dependentsSchema?.motherName ?? 'Unknown',
      fatherName: dependentsSchema?.fatherName ?? 'Unknown',
      spouseName: dependentsSchema?.spouseName ?? 'Unknown',
      children: dependentsSchema?.children ?? [],
    };
    
    // 5. Create faculty with proper error handling
    const newFaculty = await prisma.facultyPersonalDetails.create({
      data: newFacultyData,
    });

    // 6. Create faculty education detailsMAMUM00641480000001258
    const newFacultyEducation = await Promise.all(
      (educationSchema || []).map(async (education : any) => {
        return prisma.faccultyEducation.createMany({
          data: {
            facultyId: newFaculty.facultyId,
            Program: education.classProgram ?? 'Unknown Program',
            usnSsn: education.usnSsn ?? 'Unknown USN/SSN',
            schoolCollege: education.schoolCollege ?? 'Unknown School/College',
            specialization: education.specialization ?? 'Unknown Specialization',
            mediumOfInstruction: education.mediumOfInstruction ?? 'English',
            passClass: education.passClass ?? 'N/A',
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        facultyPersonalDetails: newFaculty,
        facultyEducationDetails: newFacultyEducation,
      },
    });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
        details: error.message
      },
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
    const allFaculty = await prisma.facultyPersonalDetails.findFirst({
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


