const oAuth2Client = require("../config/google");
module.exports = {
  verifyGoogleToken: async function (req, res, next) {
    const token = req.headers.authorization.replace(/^Bearer\s/, "");
    try {
      // const ticket = await oAuth2Client.verifyIdToken({
      //   idToken: token,
      //   audience: process.env.CLIENT_ID,
      // });
      const resp = await oAuth2Client.getTokenInfo(token);
      // const payload = ticket.getPayload();
      req.user = {
        email: resp.email,
      };
      console.log(resp.user);
      next();
      //return payload;
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Token is not valid" });
    }
  },
};
