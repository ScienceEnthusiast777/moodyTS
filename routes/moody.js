var router = require("express").Router();

router.get("/",(req, res, next)=> {
    res.json({test: 'success from the index'});
});

router.post("/",(req,res,next)=>{
    const {mood} = req.body;
    console.log(req.user._id, mood)
})


// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
module.exports = router;


