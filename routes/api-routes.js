const express = require('express');
const mongoose = require('mongoose');
const Workout = require('../models/workout.js');

const router = express.Router();

router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// workout data comes from the body, id from the params
router.put('/api/workouts/:id', ({body, params}, res) => {
    console.log(params)
    Workout.findByIdAndUpdate(
        // This does not need req since it is entered as body and params in the argument
        params.id, {
            $push: {
                exercises: body
            }
        }, { new: true}
        // new: true will update the info in the db
    ).then(data => res.json(data))
    .catch(err => {
        res.status(400).json(err);
      });
});

router.get('/api/workouts', (req, res) => {
  Workout.aggregate([{
      $addFields: {
        totalDuration: {
            // Dynamically create column for total duration with sum of exercies @ duration key
            $sum: '$exercises.duration' ,
        }
      }
  },])
    .sort({ date: -1 })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{
        $addFields: {
          totalDuration: {
              // Dynamically create column for total duration with sum of exercies @ duration key
              $sum: '$exercises.duration' ,
          }
        }
    },]).limit(10)
    .then(data => res.json(data))
    .catch(err => {
        res.status(400).json(err);
      });;
})

// Aggregate function to get the total duration for each workout.

// db.scores.aggregate( [
//     {
//       $addFields: {
//         totalHomework: { $sum: "$homework" } ,
//         totalQuiz: { $sum: "$quiz" }
//       }
//     },
//     {
//       $addFields: { totalScore:
//         { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
//     }
//  ] )

module.exports = router;
