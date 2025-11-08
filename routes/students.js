import express from "express";
import { students } from "../data/students.js"

consts = router = express.Router();

// GET all students (/)
router.get("/", (req, res) => {
    res.json(students);
});

// GET students by (/id)
router.get("/:id", (req, res) => {
    const student = students.find((s) => s.id === req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error:"Student not found" });
    }
});

// POST /students add a new student
