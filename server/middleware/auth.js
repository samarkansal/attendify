const oAuth2Client = require("../config/google");
module.exports = {
  verifyGoogleToken: async function (req, res, next) {
    const token = req.headers.authorization.replace(/^Bearer\s/, "");
    try {
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = payload;
      console.log(payload);
      next();
      //return payload;
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Token is not valid" });
    }
  },
};
