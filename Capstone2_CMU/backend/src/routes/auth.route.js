const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth/authentication.controller");

// router.get("/", auth.getAll);

router.post("/register", auth.register);

router.post("/login", auth.login);

router.post("/forgotpassword", auth.getAll);

module.exports = router;