import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

const facultyDetails = async (req, res) => {
    app.get("/api/faculty/profile", async (req, res) => {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) return res.status(401).json({ message: "Unauthorized" });

      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const faculty = await prisma.facultyPersonalDetails.findUnique({
          where: { id: decoded.id },
        });
        return res.status(200).json({ faculty });
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        return res.status(500).json({ error: "Failed to fetch data" });
      }
    });
}

export default facultyDetails;