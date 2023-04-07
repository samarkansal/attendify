const { google } = require("googleapis");
const { oAuth2Client } = require("../config/google");

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const insertEvent = async () => {
  const event = {
    summary: "Event summary",
    description: "Event description",
    location: "Event location",
    start: {
      dateTime: "2023-04-07T10:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2023-04-07T12:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    attendees: [
      { email: "sameerkansal27@gmail.com" },
      { email: "samarkansal@vt.edu" },
    ],
    reminders: {
      useDefault: true,
    },
  };
  console.log("BEFORE INSETTInG EVENT");
  try {
    const { data } = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    console.log(`Event created: ${data.htmlLink}`);
  } catch (error) {
    console.log("ERROR INSETTInG EVENT");
    console.error(`Error creating event: ${error}`);
  }
};

module.exports = insertEvent;
