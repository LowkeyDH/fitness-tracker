const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// GET all workouts
router.get("/", async (req, res) => {
   try {
      const workouts = await prisma.workoutRecord.findMany({
         where: { userId: req.userId },
         include: { exercises: true },
         orderBy: { date: "desc" },
      });
      res.json(workouts);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
   }
});

// GET single workout
router.get("/:id", async (req, res) => {
   try {
      const workout = await prisma.workoutRecord.findFirst({
         where: { id: req.params.id, userId: req.userId },
         include: { exercises: true },
      });
      if (!workout) {
         return res.status(404).json({ error: "Workout not found" });
      }
      res.json(workout);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
   }
});

// CREATE workout
router.post("/", async (req, res) => {
   try {
      const { date, bodyWeight, notes, exercises } = req.body;
      const workout = await prisma.workoutRecord.create({
         data: {
            userId: req.userId,
            date: new Date(date),
            bodyWeight: parseFloat(bodyWeight),
            notes: notes || "",
            exercises: {
               create: exercises.map((ex) => ({
                  exerciseName: ex.exerciseName,
                  weight: parseFloat(ex.weight),
                  sets: parseInt(ex.sets),
                  reps: parseInt(ex.reps),
               })),
            },
         },
         include: { exercises: true },
      });
      res.status(201).json(workout);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
   }
});

// UPDATE workout
router.put("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const { date, bodyWeight, notes, exercises } = req.body;

      const existingWorkout = await prisma.workoutRecord.findFirst({
         where: { id, userId: req.userId },
      });

      if (!existingWorkout) {
         return res.status(404).json({ error: "Workout not found" });
      }

      await prisma.exercise.deleteMany({ where: { workoutRecordId: id } });

      const workout = await prisma.workoutRecord.update({
         where: { id },
         data: {
            date: new Date(date),
            bodyWeight: parseFloat(bodyWeight),
            notes: notes || "",
            exercises: {
               create: exercises.map((ex) => ({
                  exerciseName: ex.exerciseName,
                  weight: parseFloat(ex.weight),
                  sets: parseInt(ex.sets),
                  reps: parseInt(ex.reps),
               })),
            },
         },
         include: { exercises: true },
      });
      res.json(workout);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
   }
});

// DELETE workout
router.delete("/:id", async (req, res) => {
   try {
      const workout = await prisma.workoutRecord.findFirst({
         where: { id: req.params.id, userId: req.userId },
      });

      if (!workout) {
         return res.status(404).json({ error: "Workout not found" });
      }

      await prisma.workoutRecord.delete({ where: { id: req.params.id } });
      res.json({ message: "Workout deleted successfully" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
   }
});

module.exports = router;
