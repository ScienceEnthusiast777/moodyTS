var router = require("express").Router();
const User = require("../models/User");
const app = require("../app");

// router.get("/",(req, res, next)=> {
//     res.json({test: 'success from the index'});
// });

router.put("/",(req,res,next)=>{
    const {mood, time, amOrPm} = req.body;
    const currentUser = req.user;
    User.findByIdAndUpdate(currentUser, {$push: {registeredMoods: {mood, time, amOrPm}}})
    .then((updatedUser)=>{
        res.status(200).json(updatedUser.registeredMoods);
    })
    .catch((err)=>{res.json(err)})

})

module.exports = router;


