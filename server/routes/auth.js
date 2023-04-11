const express = require("express");
const passport = require("passport");
const router = express.Router();
const oAuth2Client = require("../config/google");

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

router.post("/google", async (req, res) => {
  console.log("REQ RECEived", req.body);
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    console.log(tokens.access_token);
    console.log(tokens.refresh_token);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
