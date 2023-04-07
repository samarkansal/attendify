<script setup lang="ts">
const props = defineProps({
  meetingList: {
    type: Array,
    required: true,
  },
});

const getMeetingMinutes = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  return durationInMinutes;
};

const formatDateTime = (input) => {
  const date = new Date(input);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
};

// const meetingList = await getMeetingList();
// const meetingList = [
//   {
//     _id: "642e34f308b7a2624d04e057",
//     name: "test",
//     description: "23112edfa",
//     location: "test 1213",
//     start_time: "2023-04-06T02:54:00.000Z",
//     end_time: "2023-04-08T02:54:00.000Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
//   {
//     _id: "642ee22cfd224b68ad83b584",
//     name: "test loc",
//     description: "test desc",
//     location: "test loc",
//     start_time: "2023-04-06T15:15:38.230Z",
//     end_time: "2023-04-06T15:15:38.230Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
//   {
//     _id: "642ee4be0430e3aec525a2d2",
//     name: "test standup123",
//     description: "test desc 1126",
//     location: "test123",
//     start_time: "2023-04-06T15:26:32.572Z",
//     end_time: "2023-04-06T15:26:32.572Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
//   {
//     _id: "642ee5a30430e3aec525a2d6",
//     name: "test standup123",
//     description: "test desc 1126",
//     location: "test123",
//     start_time: "2023-04-06T15:26:32.572Z",
//     end_time: "2023-04-06T15:26:32.572Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
//   {
//     _id: "642ee6496c695b643db734c9",
//     name: "test standup123",
//     description: "test desc 1126",
//     location: "test123",
//     start_time: "2023-04-06T15:26:32.572Z",
//     end_time: "2023-04-06T15:26:32.572Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
//   {
//     _id: "642ee735366df60c563c6e39",
//     name: "test standup123",
//     description: "test desc 1126",
//     location: "test123",
//     start_time: "2023-04-06T15:26:32.572Z",
//     end_time: "2023-04-06T15:26:32.572Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
//   {
//     _id: "642ee8a2a00498dd2754a528",
//     name: "test standup123",
//     description: "test desc 1126",
//     location: "test123",
//     start_time: "2023-04-06T15:26:32.572Z",
//     end_time: "2023-04-06T15:26:32.572Z",
//     organizer: "sameerkansal27@gmail.com",
//     qr_code: "ABCDE12345",
//     __v: 0,
//   },
// ];
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  padding-bottom: 0;
}

.empty-container {
  padding: 2rem;
  padding-bottom: 0;
  height: 400px;
  color: rgb(28, 28, 28);
}

.empty-container h1 {
  padding: 2rem;
  padding-bottom: 0;
  height: 400px;
}

.empty-container h1 {
  color: rgb(28, 28, 28);
}
.list-container li:last-child {
  margin-bottom: 200px;
}

.meeting-box {
  height: 220px;
  width: 300px;
  border: 2px solid;
  border-top: 8px solid;
  border-top-color: rgb(57, 57, 189);
  border-radius: 8px;
  box-shadow: 4px;
  padding: 2rem 1rem;
  background-color: rgb(255, 255, 255);
  color: rgb(20, 20, 20);
}

.meeting-box h2 {
  font-weight: 500;
  margin-bottom: 1rem;
}
h3 {
  font-weight: 300;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
</style>

<template>
  <section class="catalog-items">
    <ul v-if="props.meetingList.length > 0" class="list-container">
      <li v-for="meeting in props.meetingList" :key="meeting._id">
        <div class="meeting-box">
          <h2>{{ meeting.name }}</h2>
          <h3>
            {{ formatDateTime(meeting.start_time) }}<br />
            {{ getMeetingMinutes(meeting.start_time, meeting.end_time) }}
            minutes
          </h3>

          <h3>{{ meeting.description }}</h3>
        </div>
      </li>
    </ul>
    <div v-else class="empty-container"><h1>You have no events</h1></div>
  </section>
</template>
