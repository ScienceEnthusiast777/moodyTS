var router = require("express").Router();
router.get("/",(req, res, next)=> {
    res.json({test: 'success from the index'});
});


// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
module.exports = router;


