const mongoose = require("mongoose");

const meetingAttendanceSchema = new mongoose.Schema({
  meeting_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meeting",
    required: true,
  },
  user_id: { type: String, required: true },
  attended: { type: Boolean, required: true },
});

MeetingAttendance = mongoose.model(
  "MeetingAttendance",
  meetingAttendanceSchema
);
module.exports = MeetingAttendance;
