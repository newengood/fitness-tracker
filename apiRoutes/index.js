const router = require("express").Router();
const db = require("../models");

// get workouts in defined range (7)
router.get("/api/workouts/range", async (req, res) => {
    try {
        const workouts = await db.Workout.aggregate([
            {
                $lookup: {
                    from: "exercises",
                    localField: "exercises",
                    foreignField: "_id",
                    as: "exercises"
                }
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            },
            {
                $limit: 7
            },
            {
                $sort: {
                    day: -1
                }
            }
        ]);
        res.json(workouts);
    } catch (error) {
        res.json(error);
    }
});

// update existing workout with new exercise
router.put("/api/workouts/:id", async (req, res) => {
    try {
        const exercise = await db.Exercise.create(req.body);
        const workout = await db.Workout.findByIdAndUpdate(
            req.params.id,
            { $push: { exercises: exercise._id } },
            { new: true }
        ).exec();
        res.json(workout);
    } catch(error) {
        res.json(error);
    }
});

// create new workout
router.post("/api/workouts", async (req, res) => {
    try {
        const workout = await db.Workout.create(req.body);
        res.json(workout);
    } catch (error) {
        res.json(error);
    }
});

// get all workouts
router.get("/api/workouts", async (req, res) => {
    try {
        const workouts = await db.Workout.aggregate([
            {
                $lookup: {
                    from: "exercises",
                    localField: "exercises",
                    foreignField: "_id",
                    as: "exercises"
                }
            },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            },
        ]);
        res.json(workouts);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;