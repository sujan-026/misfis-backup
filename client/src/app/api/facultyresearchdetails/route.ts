import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// Helper function to validate and format dates
function validateAndFormatDate(dateString: string): Date | null {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime()) || date.getFullYear() < 1900 || date.getFullYear() > 2100) {
      return null;
    }
    return date;
  } catch { 
    
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();



      const facultyResearchSchema = body.data.facultyResearchSchema;
      const nationalJournalDetailsSchema = body.data.nationalJournalDetailsSchema;
      const internationalJournalDetailsSchema = body.data.internationalJournalDetailsSchema;
      const nationalConferenceDetailsSchema = body.data.nationalConferenceDetailsSchema;
      const internationalConferenceDetailsSchema = body.data.internationalConferenceDetailsSchema;
      const researchGrantsSchema = body.data.researchGrantsSchema;
      const consultancySchema = body.data.consultancySchema;
      const patentsSchema = body.data.patentsSchema;
      const researchScholarDetailsSchema = body.data.researchScholarDetailsSchema;
      const publicationsSchema = body.data.publicationsSchema;
    console.log("research grants", researchGrantsSchema);
    console.log("Received data:", {facultyResearchSchema, nationalJournalDetailsSchema, internationalJournalDetailsSchema, nationalConferenceDetailsSchema, internationalConferenceDetailsSchema, researchGrantsSchema, consultancySchema, patentsSchema, researchScholarDetailsSchema, publicationsSchema});
    const result = await prisma.$transaction(async (tx) => {
      const facultyResearch = await tx.facultyResearchDetails.create({
        data: {
          facultyId: body.facultyId,
          orcidId: facultyResearchSchema.orcId,
          scopusId: facultyResearchSchema.scopusId,
          publonsId: facultyResearchSchema.publonsAndWebOfScienceId,
        },
      });

      if (publicationsSchema?.length > 0) {
        await tx.publication.createMany({
          data: publicationsSchema.map((pub: any) => ({
            publicationType: pub.typeOfPublication,
            name: pub.nameOfJournal,
            volume: pub.volumeAndPage,
            doi: pub.doi,
            impactFactor: pub.impactFactor ? parseFloat(pub.impactFactor) : null,
            facultyId: body.facultyId,
          })),
        });
      }

      const conferenceJournalData = [
        ...(nationalJournalDetailsSchema?.map((item: any) => ({ ...item, type: "National Journal" })) ?? []),
        ...(internationalJournalDetailsSchema?.map((item: any) => ({ ...item, type: "International Journal" })) ?? []),
        ...(nationalConferenceDetailsSchema?.map((item: any) => ({ ...item, type: "National Conference" })) ?? []),
        ...(internationalConferenceDetailsSchema?.map((item: any) => ({ ...item, type: "International Conference" })) ?? []),
      ]
        .filter((item) => item)
        .map((item: any) => ({
          facultyId: body.facultyId,
          role: item.type,
          title: item.titleOfResearchPaper,
          journalName: item.nameOfJournal,
          volume: item.volume,
          issueNo: item.issueNo,
          yearOfPublication: item.yearOfPublication ? parseInt(item.yearOfPublication) : 0,
          pageNo: item.pageNoFrom ? (parseInt(item.pageNoTo) - parseInt(item.pageNoFrom)).toString() : "0",
          author1: item.author01,
          author2: item.author02,
          author3: item.author03,
          author4: item.author04,
          publishedUnder: item.publishedUnder,
          impactFactor: item.impactFactor ? parseFloat(item.impactFactor) : null,
          venue: item.venue ?? "",
          fromDate: item.fromDate ? new Date(item.fromDate).toISOString() : new Date().toISOString(),
          toDate: item.toDate ? new Date(item.toDate).toISOString() : new Date().toISOString(),
        }));

      if (conferenceJournalData.length > 0) {
        await tx.conferenceAndJournal.createMany({
          data: conferenceJournalData,
        });
      }

      if (researchGrantsSchema?.length > 0) {
        await tx.researchGrant.createMany({
          data: researchGrantsSchema.map((grant: any) => {
            const sanctionedDate = validateAndFormatDate(grant.sanctionedDate);
      
            return {
              facultyResearchId: body.facultyId, // Mapping from the body
              facultyId: body.facultyId, // Foreign key
              name: grant.titleOfProject, // Project title
              sanctionedDate: sanctionedDate || new Date(), // Sanctioned date with fallback
              projectPeriod: grant.timePeriodOfProject || "Not Specified", // Time period
              amountSanctioned: parseFloat(grant.sanctionedAmount) || 0, // Sanctioned amount
              fundedBy: grant.fundedBy, // Funding agency
              principalInvestigator: `${grant.principalInvestigatorDesignation} (${grant.principalInvestigatorInstitute})`, // Combined PI details
              coPrincipalInvestigator: grant.coPrincipalInvestigatorDesignation
                ? `${grant.coPrincipalInvestigatorDesignation} (${grant.coPrincipalInvestigatorInstitute})`
                : null, // Combined Co-PI details (if provided)
              phdAwarded: grant.anyPhdAwarded === "Yes", // Boolean for PhD awarded
              status: grant.status || "Pending", // Project status with default
            };
          }),
        });
      }
      
      if (consultancySchema?.length > 0) {
        await tx.consultancy.createMany({
          data: consultancySchema.map((consultancy: any) => {
            const sanctionedDate = validateAndFormatDate(consultancy.sanctionedDate);
            return {
              sanctionedDate: sanctionedDate || new Date(),
              projectPeriod: parseInt(consultancy.timePeriodOfProject) || 0,
              amount: parseFloat(consultancy.sanctionedAmount) || 0,
              principalInvestigator: consultancy.principalInvestigatorDesignation,
              coPrincipalInvestigator: consultancy.coPrincipalInvestigatorDesignation,
              status: consultancy.status,
              facultyId: body.facultyId,
            };
          }),
        });
      }

      if (patentsSchema?.length > 0) {
        await tx.patent.createMany({
          data: patentsSchema.map((patent: any) => ({
            patentTitle: patent.titleOfResearchPatent,
            areaOfResearch: patent.areaOfResearch,
            patentPeriod: patent.patentPeriod || 0,
            grantedYear: parseInt(patent.patentGrantedYear) || new Date().getFullYear(),
            author1: patent.author1,
            author2: patent.author2,
            author3: patent.author3,
            author4: patent.author4,
            facultyId: body.facultyId,
          })),
        });
      }

      // if (researchScholarDetailsSchema?.length > 0) {
      //   await tx.researc.createMany({
      //     data: researchScholarDetailsSchema.map((scholar: any) => {
      //       const dateOfRegistration = validateAndFormatDate(scholar.dateOfRegistration);
      //       return {
      //         NameOfResearchScholar: scholar.nameOfResearchScholar,
      //         UinvertySeatNo: scholar.universitySeatNumber,
      //         AreaOfResearch: scholar.areaOfResearch,
      //         DateOfResearch: dateOfRegistration || new Date(),
      //         UniversityRegestration: scholar.universityOfRegistration,
      //         DesginationOfSupervisor: scholar.designationOfResearcher,
      //         NameOfInstitute: scholar.nameOfInstitute,
      //         ProgessOfResearch: scholar.progressOfResearchWork,
      //         facultyId: body.facultyId,,
      //       };
      //     }),
      //   });
      // }
    });

    return NextResponse.json({ message: "Data submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing research details:", error);
    return NextResponse.json(
      {
        error: "Failed to process research details",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const facultyId = url.searchParams.get("facultyId");

    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: "Faculty ID is required" },
        { status: 400 }
      );
    }

    const researchDetails = await prisma.facultyResearchDetails.findFirst({
      where: { facultyId },
    });

    if (!researchDetails) {
      return NextResponse.json(
        { success: false, error: "Research details not found" },
        { status: 404 }
      );
    }

    const publications = await prisma.publication.findMany({ where: { facultyId } });
    const conferenceAndJournals = await prisma.conferenceAndJournal.findMany({ where: { facultyId } });
    const researchGrants = await prisma.researchGrant.findMany({ where: { facultyId } });
    const consultancies = await prisma.consultancy.findMany({ where: { facultyId } });
    const patents = await prisma.patent.findMany({ where: { facultyId } });

    return NextResponse.json({
      success: true,
      data: {
        facultyId: researchDetails.facultyId,
        orcidId: researchDetails.orcidId,
        googleScholarId: researchDetails.googleScholarId,
        scopusId: researchDetails.scopusId,
        publonsId: researchDetails.publonsId,
        researchId: researchDetails.id,
        patent: patents,
        publications,
        conferenceandjournal: conferenceAndJournals,
        researchGrant: researchGrants,
        consultancy: consultancies,
      },
    });
  } catch (error) {
    console.error("Error fetching research details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch research details" },
      { status: 500 }
    );
  }
}
