import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { authenticateUser } from "./middlewares/authentication.js";

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = "MISFIS"; // Same secret used in middleware

app.use(cors());
app.use(express.json());
app.use(authenticateUser);

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch users from the database
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header
    // console.log(token);

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.facultyId = decoded.facultyId; // Attach facultyId to request for later use
        req.username = decoded.username; // Attach facultyId to request for later use
        req.password = decoded.password; // Attach facultyId to request for later use
        console.log(req.facultyId, req.username, req.password);
        next();
    });
};

// Decode the token to get facultyId
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

// Protect the faculty profile route
app.use(verifyToken); // Use the token verification middleware for all /api routes

// app.get("/faculty/profile", async (req, res) => {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     const decoded = decodeToken(token);

//     if (!decoded) {
//         return res.status(401).json({ message: "Invalid token" });
//     }

//     try {
//         const facultyDetails = await prisma.facultyPersonalDetails.findFirst({
//             where: { facultyId: decoded.facultyId }, // Use facultyId from the decoded token
//         });
//         if (facultyDetails) {
//             res.status(200).json({ facultyDetails });
//         } else {
//             res.status(404).json({ error: "No faculty details found" });
//         }
//     } catch (error) {
//         console.error("Error fetching faculty details:", error);
//         res.status(500).json({ error: "Failed to fetch faculty details" });
//     }
//     console.log("Fetching faculty profile");
// });



app.get("/faculty/profile", async (req, res) => {
  //   const token = req.headers.authorization?.split(" ")[1];

  //   if (!token) return res.status(401).json({ message: "Unauthorized" });

  //   try {
  //     const decoded = jwt.verify(token, SECRET_KEY);
  //     const faculty = await prisma.facultyPersonalDetails.findUnique({
  //       where: { username: decoded.username },
  //     });
  //     return res.status(200).json({ faculty });
  //   } catch (error) {
  //     console.error("Error fetching faculty data:", error);
  //     return res.status(500).json({ error: "Failed to fetch data" });
  //   }
  res.send("Hello from faculty profile");
});


app.listen(5000, () => console.log("App listening on port 5000!"));
