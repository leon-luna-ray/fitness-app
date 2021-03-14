const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// default Date.now will grab the current date if none entered
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            require: true
        },
        name: {
            type: String,
            trim: true,
        },
        duration: {
            type: Number,
            require: true,
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,

        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;