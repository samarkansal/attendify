const { Router } = require("express");
const MeetingAttendance = require("../../models/MeetingAttendance");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const meetingAttendanceList = await MeetingAttendance.find();
    if (!meetingAttendanceList) throw new Error("No Meeting List found");
    res.status(200).json(meetingAttendanceList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  let meetingAttendances = [];
  for (var i = 0; i < req.body.guestList.length; i++) {
    console.log(req.body.guestList[i].label);
    meetingAttendances.push({
      meeting_id: req.body.id,
      user_id: req.body.guestList[i].label,
      attended: false,
    });
  }
  //const newMeeting = new MeetingAttendance(req.body.meetingDetails);
  try {
    const result = await MeetingAttendance.insertMany(meetingAttendances);
    if (!result)
      throw new Error(
        "Something went wrong while saving the Meeting Attendance"
      );
    console.log(`${result.length} documents were inserted`);
    // do something with the response, if needed
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Attendance.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
