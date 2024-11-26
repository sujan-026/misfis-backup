import prisma from "@/app/lib/db";
import { NextResponse } from 'next/server';

interface adminDetails {
    facultyId: number,
    role: string,
    username: string,
    password: string,
    // Add other fields as per your schema
}

export async function POST(request: Request): Promise<Response> {
    try {
        const body: adminDetails = await request.json();
        const { facultyId, role, username, password } = body;

        // Ensure all fields are provided
        if (!facultyId || !role || !username || !password) {
            return new Response("All fields are required.", { status: 400 });
        }

        // Insert data into the database
        const faculty = await prisma.User.create({
            data: {
                facultyId,
                role,
                username,
                password,
            },
        });

        return new Response(JSON.stringify({ message: "Faculty details submitted successfully!", faculty }), { status: 200 });
    } catch (error) {
        console.error("Error submitting faculty details:", error);
        return new Response("Failed to submit faculty details.", { status: 500 });
    }
}

export async function GET(): Promise<NextResponse> {
    try {
        const details: adminDetails[] = await prisma.User.findMany();
        return new NextResponse(JSON.stringify(details), { status: 200 });
    } catch (error) {
        console.error("Error fetching faculty details:", error);
        return new NextResponse("Failed to fetch faculty details.", { status: 500 });
    }
}
