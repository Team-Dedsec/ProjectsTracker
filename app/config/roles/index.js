const ConnectRoles = require("connect-roles");

const user = new ConnectRoles({
    failureHandler (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorisation
        const accept = req.headers.accept || "";
        res.status(403);
        if (accept.indexOf("html") >= 0) {
            let message = `You don't have permission to ${action}!`;
            let error = new Error(message);
            error.status = 403;
            res.render("error", { message, error });
        } else {
            res.send(`Access Denied - You don't have permission to ${action}!`);
        }
    }
});

user.use((req, action) => {
    if (!req.isAuthenticated()) {
        return action === "access public page";
    }
});

user.use("access admin page", (req) => {
    if (!req.isAuthenticated()) {
        return false;
    }

    if (req.user.role !== "admin") {
        return false;
    }
});

user.use((req) => {
    if (req.user.role === "admin") {
        return true;
    }
});

module.exports = user;