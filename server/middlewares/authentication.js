// import express from "express";
// import cors from "cors";
// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";

// const app = express();
// const prisma = new PrismaClient();
// const SECRET_KEY = "MISFIS"; // Use a secure secret for JWT

// app.use(cors());
// app.use(express.json());

// const authenticateUser = async (req, res) => {
//     const { username, password } = req.body;
//     console.log("username:", username, "password:", password);
//     try {
//         const user = await prisma.user.findFirst({
//           where: { username: username },
//         });

//         if (user && user.password === password) {
//             // Ensure password is stored securely in practice
//             const token = jwt.sign({username: user.username, password: user.password }, SECRET_KEY, { expiresIn: "1h" });
//             return res.status(200).json({ token });
//         } else {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

// app.post("/api/login", authenticateUser);


// export { authenticateUser };


import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY = "MISFIS"; // Use a secure secret for JWT

app.use(cors());
app.use(express.json());

// Authentication function
const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("Username:", username, "Password:", password);

  try {
    // Find the user by username
    const userDetails = await prisma.User.findUnique({
      where: { password: password, username: username },
    });

    console.log("User details:", userDetails);

    // Check if user exists and password is correct
    if (userDetails && userDetails.password === password) {
      // Generate JWT token with facultyId
      const token = jwt.sign(
        {
          facultyId: userDetails.facultyId,
          username: userDetails.username,
          password: userDetails.password,
          role: userDetails.role  
        },
        SECRET_KEY,
        { expiresIn: "1h" } // Token expiration time
      );
      console.log("Token generated:", token);

      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Define the login route
app.post("/api/login", authenticateUser);

export { authenticateUser };

