import prisma from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {

    const journals = await prisma.conferenceAndJournal.findMany({
      select: { 
 
        facultyId: true, 
        role: true, 
        title: true, 
        journalName: true, 
        issueNo: true, 
        volume: true, 
        yearOfPublication: true, 
        pageNo: true, 
        author1: true, 
        author2: true, 
        author3: true, 
        author4: true, 
        publishedUnder: true, 
        impactFactor: true, 
        quartile: true 
      },
    });

    const conferences = await prisma.conferenceAndJournal.findMany({
      select: { 

        facultyId: true, 
        role: true, 
        title: true, 
        journalName: true, 
        venue: true, 
        fromDate: true, 
        toDate: true, 
        sponsor: true 
      },
    });

    const consultancies = await prisma.consultancy.findMany({
      select: { 

        facultyId: true, 
        projectPeriod: true, 
        principalInvestigator: true, 
        coPrincipalInvestigator: true, 
        status: true, 
        amount: true 
      },
    });

    const patents = await prisma.patent.findMany({
      select: { 

        facultyId: true, 
        areaOfResearch: true, 
        patentPeriod: true, 
        grantedYear: true, 
        author1: true, 
        author2: true, 
        author3: true 
      },
    });

    const publications = await prisma.publication.findMany({
      select: { 
        facultyId: true, 
        publicationType: true, 
        name: true, 
        volume: true, 
        pageNumber: true, 
        doi: true, 
        impactFactor: true 
      },
    });

    const researchGrants = await prisma.researchGrant.findMany({
      select: { 
 
        facultyId: true, 
        name: true, 
        sanctionedDate: true, 
        projectPeriod: true, 
        amountSanctioned: true, 
        fundedBy: true, 
        principalInvestigator: true, 
        coPrincipalInvestigator: true, 
        phdAwarded: true, 
        status: true 
      },
    });

    return NextResponse.json({
      journals,
      conferences,
      consultancies,
      patents,
      publications,
      researchGrants,
    });
  } catch (error) {
    console.error('Error fetching consolidation data:', error);
    return NextResponse.error();
  }
}
