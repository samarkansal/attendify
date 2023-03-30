const mongoose = require('mongoose');

const meetingAttendanceSchema = new mongoose.Schema({
  meeting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attended: { type: Boolean, required: true },
});

module.exports.MeetingAttendance = mongoose.model('MeetingAttendance', meetingAttendanceSchema);
