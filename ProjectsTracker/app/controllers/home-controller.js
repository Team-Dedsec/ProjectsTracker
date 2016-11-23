
module.exports = {
    index(req, res) {
        console.log("it works");
        res.render("../views/index.pug", { title: "It works" });
    }
};