import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Validate request body
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

    const facultyId = jsonData.facultyId; 
    console.log(jsonData)
   // You might want to generate this or get it from somewhere
    const employeeId = jsonData.facultyId; // Generating a default employee ID
    console.log('qualification',jsonData.qualification);
    // 3. Create faculty academic details using provided academicSchema data
    const facultyAcademic = await prisma.facultyAcademicDetails.create({
     data: {
    facultyId: facultyId,
    employeeId: jsonData.data.academicSchema?.employeeId || employeeId,
    qualification: jsonData.data.academicSchema?.qualification || "Not Specified",
    department: jsonData.data.academicSchema?.department || "Not Specified",
    designation: jsonData.data.academicSchema?.designation || "Not Specified",
    level: jsonData.data.academicSchema?.level || "Not Specified",
  },
      
    });

    // 4. Create teaching experience at Dr. AIT if provided
    // if (jsonData.teachingExperienceDrAITSchema) {
    //   await prisma.teachingExperienceDrAIT.create({
    //     data: {
    //       facultyId: facultyAcademic.facultyId,
    //       dateOfJoining: new Date(jsonData.teachingExperienceDrAITSchema.dateOfJoining),
    //       designationOnJoining: jsonData.teachingExperienceDrAITSchema.designationOnJoining,
    //     },
    //   });
    // }

    // 5. Create area of specialization if provided
    if (jsonData.areaOfSpecializationSchema) {
      await prisma.specialization.create({
        data: {
          facultyId: facultyAcademic.facultyId,
          subjectsTaught: jsonData.data.areaOfSpecializationSchema.subjectsTaught,
          program: jsonData.data.areaOfSpecializationSchema.program,
          numberOfTimes:
            parseInt(jsonData.data.areaOfSpecializationSchema.numberOfTimes) || 0,
        },
      });
    }

    // 6. Create previous teaching experience
    if (jsonData.data.previousTeachingExperienceSchema?.length > 0) {
      await prisma.previousTeachingExperience.createMany({
        data: jsonData.data.previousTeachingExperienceSchema.map((exp: any) => ({
          facultyId: facultyAcademic.facultyId,
          instituteName: exp.instituteName,
          fromDate: new Date(exp.fromDate),
          toDate: new Date(exp.toDate),
        })),
      });
    }

    // 7. Create industry experiences
    if (jsonData.data.teachingExperienceIndustrySchema?.length > 0) {
      await prisma.industryExperience.createMany({
        data: jsonData.data.teachingExperienceIndustrySchema.map((exp: any) => ({
          facultyId: facultyAcademic.facultyId,
          organization: exp.organization,
          designation: exp.designation,
          fromDate: new Date(exp.fromDate),
          toDate: new Date(exp.toDate),
        })),
      });
    }

    // 8. Create research experiences
    if (jsonData.data.teachingExperienceResearchSchema?.length > 0) {
      await prisma.researchExperience.createMany({
        data: jsonData.data.teachingExperienceResearchSchema.map((exp: any) => ({
          facultyId: facultyAcademic.facultyId,
          organization: exp.organization,
          designation: exp.designation,
          fromDate: new Date(exp.fromDate),
          toDate: new Date(exp.toDate),
        })),
      });
    }

    // 9. Create events attended
    if (jsonData.data.eventsAttendedSchema?.length > 0) {
      await prisma.eventAttended.createMany({
        data: jsonData.data.eventsAttendedSchema.map((event: any) => ({
          facultyId: facultyAcademic.facultyId,
          typeofevent: event.typeOfEvent,
          nameofevent: event.title,
          fromDate: new Date(event.fromDate),
          toDate: new Date(event.toDate),
          organizer: event.organizer,
          venue: event.venueOfEvent,
          sponsor: null,
          targetAudience: null,
        })),
      });
    }

    // 10. Create events organized
    if (jsonData.data.eventsOrganizedSchema?.length > 0) {
      await prisma.eventOrganized.createMany({
        data: jsonData.data.eventsOrganizedSchema.map((event: any) => ({
          facultyId: facultyAcademic.facultyId,
          typeofevent: event.typeOfEvent,
          nameofevent: event.title,
          fromDate: new Date(event.fromDate),
          toDate: new Date(event.toDate),
          organizer: event.organizer || "",
          venue: event.venueOfEvent,
          sponsor: event.sponsor,
          targetAudience: event.targetAudience,
        })),
      });
    }

    // 11. Create invited talks
    if (jsonData.data.invitedTalksSchema?.length > 0) {
      await prisma.invitedTalk.createMany({
        data: jsonData.data.invitedTalksSchema.map((talk: any) => ({
          facultyId: facultyAcademic.facultyId,
          eventType: talk.typeOfEvent,
          topic: talk.title,
          fromDate: new Date(talk.fromDate),
          toDate: new Date(talk.toDate),
          organizer: talk.organizer,
          venue: talk.venueOfEvent,
          targetAudience: talk.targetAudience,
        })),
      });
    }

    // 12. Create additional responsibilities
    if (jsonData.data.responsibilitiesSchema?.length > 0) {
      await prisma.addtionalResponsibility.createMany({
        data: jsonData.data.responsibilitiesSchema.map((resp: any) => ({
          facultyId: facultyAcademic.facultyId,
          additionalResponsibility: resp.additionalResponsibilitiesHeld,
          level: "Department", // Default value
          fromDate: new Date(resp.fromDate),
          toDate: new Date(resp.toDate),
        })),
      });
    }

    // 13. Create extracurricular activities
    if (jsonData.data.extracurricularsSchema?.length > 0) {
      await prisma.extracurricular.createMany({
        data: jsonData.data.extracurricularsSchema.map((extra: any) => ({
          facultyId: facultyAcademic.facultyId,
          eventType: extra.typeOfEvent,
          eventTitle: extra.titleOfEvent,
          fromDate: new Date(extra.fromDate),
          toDate: new Date(extra.toDate),
          organizer: extra.organizer,
          level: extra.level,
          achievement: extra.achievement,
        })),
      });
    }

    // 14. Create outreach activities
    if (jsonData.data.outreachSchema?.length > 0) {
      await prisma.outreachActivity.createMany({
        data: jsonData.data.outreachSchema.map((outreach: any) => ({
          facultyId: facultyAcademic.facultyId,
          activity: outreach.activity,
          role: outreach.role,
          fromDate: new Date(outreach.fromDate),
          toDate: new Date(outreach.toDate),
          place: outreach.place,
        })),
      });
    }

    // 15. Create awards and recognitions
    if (jsonData.data.awardsSchema?.length > 0) {
      await prisma.awardAndRecognition.createMany({
        data: jsonData.data.awardsSchema.map((award: any) => ({
          facultyId: facultyAcademic.facultyId,
          awardReceived: award.awardRecieved,
          recognitionReceived: "", // Default empty string
        })),
      });
    }

    if (jsonData.data.recognitionsSchema?.length > 0) {
      await prisma.awardAndRecognition.createMany({
        data: jsonData.data.recognitionsSchema.map((recognition: any) => ({
          facultyId: facultyAcademic.facultyId,
          recognitionReceived: recognition.recognitionRecieved,
          awardReceived: "", // Default empty string
        })),
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        facultyId: facultyAcademic.facultyId,
        employeeId: facultyAcademic.employeeId,
        message:
          "Faculty academic details and related information created successfully",
      },
    });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
        details: error.message,
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
    const allFaculty = await prisma.facultyAcademicDetails.findFirst({
      where: {
        facultyId: facultyId,
      },
    });

    // Fetch other academic details
    const additionalDetails = await prisma.addtionalResponsibility.findMany({
      where: {facultyId: facultyId,}
    });



    if (!allFaculty || !additionalDetails) {
      return NextResponse.json(
        { success: false, error: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        faculty: allFaculty,
        additionalDetails: additionalDetails,
      },
    });

    // return NextResponse.json({ success: true, data: allFaculty });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}