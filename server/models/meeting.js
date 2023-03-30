const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  qr_code: { type: String, required: true },
});

module.exports.Meeting = mongoose.model("Meeting", meetingSchema);
