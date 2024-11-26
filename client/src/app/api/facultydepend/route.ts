// import prisma from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     // Parse the JSON data from the request body
//     const requestBody = await req.json();
//     console.log("Request Body:", requestBody);

//     // Destructure dependentsData from requestBody
//     const { 
//       dependentsData: {
//         facultyId,
//         motherName,
//         fatherName,
//         spouseName,
//         children
//       }
//     } = requestBody;

//     console.log("Received faculty dependants data:", requestBody);

//     // Set default values for missing fields and create faculty dependants record
//     const newFacultyDependants = await prisma.facultyDependants.create({
//       data: {
//         facultyId: facultyId ?? 1456, // Required field
//         motherName: motherName ?? 'Unknown', // Default if missing
//         fatherName: fatherName ?? 'Unknown', // Default if missing
//         spouseName: spouseName ?? 'Unknown', // Default if missing
//         children: children && children.length > 0 ? children : [], // Default to empty array if no children
//       },
//     });

//     // Return a success response with the new record
//     return NextResponse.json({ success: true, data: newFacultyDependants });
//   } catch (error) {
//     console.error("Error creating faculty dependants data:", error);
//     return NextResponse.json({ success: false, error: "Failed to create faculty dependants data" }, { status: 500 });
//   }
// }
// export async function GET() {
//   try {
//     // Fetch all faculty dependants records
//     const allFacultyDependants = await prisma.facultyDependants.findFirst({
//       where: {
//         facultyId: 1455,
//       },
//     });

//     // Return a success response with the fetched records
//     return NextResponse.json({ success: true, data: allFacultyDependants });
//   } catch (error) {
//     console.error("Error fetching faculty dependants data:", error);
//     return NextResponse.json({ success: false, error: "Failed to fetch faculty dependants data" }, { status: 500 });
//   }
// }

