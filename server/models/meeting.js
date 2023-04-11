const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  organizer: { type: String, required: true },
  passkey: { type: String, required: true },
});

Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
