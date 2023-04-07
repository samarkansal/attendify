const axios = require("axios");
const { Router } = require("express");
const Meeting = require("../../models/Meeting");
const { verifyGoogleToken } = require("../../middleware/auth");
const { insertEvent } = require("../googleCalendar");

const router = Router();

router.get("/:eventType", verifyGoogleToken, async (req, res) => {
  try {
    console.log(req.params.eventType);
    const timeObj =
      req.params.eventType === "upcoming"
        ? { $gt: new Date() }
        : { $lt: new Date() };
    console.log(req.user.email);
    const meetingList = await Meeting.find({
      organizer: req.user.email,
      start_time: timeObj,
    });
    if (!meetingList) throw new Error("No Meeting List found");
    res.status(200).json(meetingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", verifyGoogleToken, async (req, res) => {
  const newMeeting = new Meeting(req.body.meetingDetails);
  try {
    const meeting = await newMeeting.save();
    if (!meeting)
      throw new Error("Something went wrong while saving the Meeting");
    const url = "http://localhost:3000/api/meetingAttendance";
    const response = await axios.post(url, {
      id: meeting._id,
      guestList: req.body.guestList,
    });
    console.log(response.data);
    //const ev = await insertEvent();
    // do something with the response, if needed
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", verifyGoogleToken, async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Meeting.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
