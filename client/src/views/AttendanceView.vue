<template>
  <div class="attendance-container">
    <h2>Meeting Attendance List for Meeting ID {{ meetingId }}</h2>
    <button class="refresh-list" @click="refreshData">Refresh</button>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Attended</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(attendance, index) in meetingAttendanceList" :key="index">
          <td>{{ attendance.user_id }}</td>
          <td>{{ attendance.attended }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
th {
  margin-right: 30px;
}

td {
  margin-right: 30px;
}
.attendance-container {
  padding: 100px;
  color: rgb(65, 65, 65);
}

.refresh-list {
  border: none;
  width: 230px;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  background-color: rgb(78, 51, 255);
  color: rgb(220, 220, 220);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 30px 0;
  font-weight: 550;
}

.refresh-list:hover {
  background-color: rgb(97, 73, 255);
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-weight: 700;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      meetingId: null,
      meetingAttendanceList: [],
    };
  },
  created() {
    this.meetingId = this.$route.params.meetingId;
    console.log(this.meetingId);
    this.refreshData();
  },
  methods: {
    async refreshData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/meetingAttendance/${this.meetingId}`
        );
        this.meetingAttendanceList = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
