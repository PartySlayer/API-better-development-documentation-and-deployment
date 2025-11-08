import express from "express";
import path from "path";
import { students } from "../data/students.js"

const router = express.Router();
const dataPath = path.resolve("./data/students")

// GET all students (/)
router.get("/", (req, res) => {
    const students = loadStudents();
    res.json(students);
});

// GET students by (/id)
router.get("/:id", (req, res) => {
    const students = loadStudents()
    const student = students.find((s) => s.id === req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error:"Student not found" });
    }
});

// POST /students add a new student

router.post("/", (req, res) => {
  const students = loadStudents();
  const { id, name, grades } = req.body;

  if (!isValidStudentId(id)) {
    return res.status(400).json({ error: "Invalid student ID format. Use S2029XXXX" });
  }
  if (!id || !name || !grades) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (students.some((s) => s.id === id)) {
    return res.status(400).json({ error: "Student ID already exists" });
  }
  if (!Array.isArray(grades) || !grades.every(g => g.subject && typeof g.subject === "string" && typeof g.score === "number" && g.score >= 0 && g.score <= 105)) {
    return res.status(400).json({ error: "Invalid grades format" });
  }  
  const newStudent = { id, name, grades };
  students.push(newStudent);
  saveStudents(students);

  res.status(201).json(newStudent);
});
