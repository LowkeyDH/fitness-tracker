const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workouts");

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/api/test", (req, res) => {
   res.json({ message: "Backend is working!" });
});

app.listen(PORT, () => {
   console.log(` Server running on http://localhost:${PORT}`);
});
