import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the JSON data from the request body
    const requestBody = await req.json();
    console.log("Request Body:", requestBody);

    // Destructure financialData from requestBody
    const { 
      facultyId, 
      financialData: {
        bankName,
        accountNo,
        accountName,
        typeOfAccount: accountType, // Mapped to match JSON
        branch,
        ifscCode: ifsc, // Mapped to match JSON
        pfNumber,
        uanNumber,
        pensionNumber
      }
    } = requestBody;

    console.log("Received faculty financial data:", requestBody);

    // Set default values for missing fields and create financial data
    const newFinancialData = await prisma.facultyFinancialData.create({
      data: {
        facultyId: facultyId ?? 4237, // Default facultyId if missing
        bankName: bankName ?? 'N/A', // Default bankName if missing
        accountNo: accountNo ?? '000000000000', // Default accountNo if missing
        accountName: accountName ?? 'Unknown', // Default accountName if missing
        accountType: accountType ?? 'Savings', // Default accountType if missing
        branch: branch ?? 'Unknown Branch', // Default branch if missing
        ifsc: ifsc ?? 'UNKNOWN000000', // Default ifsc if missing
        pfNumber: pfNumber ?? 'N/A', // Default PF number if missing
        uanNumber: uanNumber ?? 'N/A', // Default UAN number if missing
        pensionNumber: pensionNumber ?? 'N/A', // Default pension number if missing
      },
    });

    // Return a success response with the new record
    return NextResponse.json({ success: true, data: newFinancialData });
  } catch (error) {
    console.error("Error creating faculty financial data:", error);
    return NextResponse.json({ success: false, error: "Failed to create faculty financial data" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch all faculty financial records
    const allFacultyFinancialData = await prisma.facultyFinancialData.findFirst({
      where: {
        facultyId: 1446,
      },
    });

    // Return a success response with the fetched records
    return NextResponse.json({ success: true, data: allFacultyFinancialData });
  } catch (error) {
    console.error("Error fetching faculty financial data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch faculty financial data" }, { status: 500 });
  }
}