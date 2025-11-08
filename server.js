import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import studentRoutes from "./routes/students.js";

const app = express();
const PORT = 3001;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const dataPath = path.join(__dirname, "data", "students.json");


app.use(cors())
app.use(express.json())

// - HELPER FUNCTIONS

// Validate student ID
function isValidStudentId(id) {
  const regex = /^S2029\d{4}$/;
  return regex.test(id);
}

// Load students from JSON
export function loadStudents() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, "utf-8");
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error("Error parsing students data:", err);
      return [];
    }
  } else {
    console.log("No students data file found. Starting with an empty array.");
    return [];
  }
}

// Save students to JSON
export function saveStudents(students) {
  fs.writeFileSync(dataPath, JSON.stringify(students, null, 2), "utf-8");
  console.log("Students saved to file successfully.");
}

// - ROUTES

app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

app.use("/students", studentRoutes);


// - START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

