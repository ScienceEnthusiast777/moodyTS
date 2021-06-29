var router = require("express").Router();
const User = require("../models/User");
const app = require("../app");
const { exists } = require("../models/User");

// router.get("/",(req, res, next)=> {
//     res.json({test: 'success from the index'});
// });

router.put("/", (req, res, next) => {
  const { mood, time, amOrPm } = req.body;
  const currentUser = req.user;
  User.findOne(req.user)
    .then((user) => {
      for (let thisMood of user.registeredMoods) {
        if (
          compareDate(new Date(), thisMood.time) &&
          amOrPm === thisMood.amOrPm
        ) {
          return res
            // .status(400)
            .json({
              message: `you have already submitted your mood for ${amOrPm}`,
            });
        } else {
          User.findByIdAndUpdate(currentUser, {
            $push: { registeredMoods: { mood, time, amOrPm } },
          }).then((updatedUser) => {
            res.status(200).json("mood sent to database");
          });
        }
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

const compareDate = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
  console.log(
    first.getFullYear(),
    first.getMonth(),
    first.getDate(),
    second.getFullYear(),
    second.getMonth(),
    second.getDate()
  );
};

module.exports = router;
