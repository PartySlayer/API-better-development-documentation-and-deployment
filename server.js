import express from "express";
import cors from "cors";
// import studentRoutes from "./routes/students.js";

const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// app.use("/students", studentRoutes)

