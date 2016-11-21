let express = require("express");
let router = express.Router();

/* GET home page. */
//  next parameter on router.get function
router.get("/", (req, res) => {
    res.render("index", { title: "Our appp" });
});

router.get("/index", (req, res) => {
    res.render("index", { title: "Our appp" });
});



module.exports = router;