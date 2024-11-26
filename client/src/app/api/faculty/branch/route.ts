import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      select: {
        branchName: true,
        branchCode: true,
      },
    });

    if (!branches || branches.length === 0) {
      return NextResponse.json(
        { success: false, error: "No branches found" },
        { status: 404 }
      );
    }

    // Combine the results and return
    return NextResponse.json({
      success: true,
      data: {
        branches,
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
