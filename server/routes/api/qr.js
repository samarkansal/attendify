const { Router } = require("express");
const MeetingAttendance = require("../../models/MeetingAttendance");
const qrCodeReader = require("qrcode-reader");
var QRCode = require("qrcode");
const Jimp = require("jimp");

const router = Router();

router.post("/generateQR", async (req, res, next) => {
  const meetingId = req.body.meetingId;
  const userId = req.body.userId;
  const expirationTime = new Date().getTime() + 40000; // 40 seconds from now

  const inputString = `${meetingId},${userId},${expirationTime}`;

  try {
    const code = await QRCode.toDataURL(inputString, { version: 4 });
    console.log(code);
    // Printing the code
    // console.log(code);

    const meetingAttendance = new MeetingAttendance({
      meeting_id: meetingId,
      user_id: userId,
      attended: false,
      qr_code: code,
    });

    const doc = await meetingAttendance.save();

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/checkQR/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const meetingAttendance = await MeetingAttendance.findById(id);
    if (!meetingAttendance) {
      res.status(404).json({ message: "Meeting attendance not found" });
      return;
    }

    const qrCode = meetingAttendance.qr_code;
    const inputString = qrCode.split(","); // Splitting the input string by comma separator
    const meetingId = inputString[0];
    const userId = inputString[1];
    const expirationTime = inputString[2];

    if (new Date().getTime() > expirationTime) {
      res.status(400).json({ message: "QR code has expired" });
      return;
    }

    // QR code is valid
    meetingAttendance.attended = true;
    await meetingAttendance.save();

    res.status(200).json({ message: "QR code is valid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get("/url", (req, res, next) => {
//   res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//  });

router.get("/scanQR", (req, res, next) => {
  const buffer = fs.readFileSync("./file.png");

  // __ Parse the image using Jimp.read() __ \\
  Jimp.read(buffer, function (err, image) {
    if (err) {
      console.error(err);
    }
    // __ Creating an instance of qrcode-reader __ \\

    const qrCodeInstance = new qrCodeReader();

    qrCodeInstance.callback = function (err, value) {
      if (err) {
        console.error(err);
      }
      // __ Printing the decrypted value __ \\
      console.log(value.result);
      res.send(value.result);
    };

    // __ Decoding the QR code __ \\
    qrCodeInstance.decode(image.bitmap);
  });
});

module.exports = router;
