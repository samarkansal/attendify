<template>
  <section class="att-hero">
    <div class="att-dark-overlay">
      <div class="attendance-container">
        <h2>Attendance List for Meeting ID: {{ meetingId }}</h2>
        <button class="refresh-list" @click="refreshData">
          <i class="fas fa-sync-alt"></i>&nbsp;Refresh
        </button>
        <div class="data-container">
          <ul class="attendance-table">
            <li class="table-header">
              <div>User ID</div>
              <div>Attended</div>
            </li>
            <li
              class="table-row"
              v-for="attendance in meetingAttendanceList"
              :key="attendance.id"
            >
              <div>{{ attendance.user_id }}</div>
              <div>{{ attendance.attended }}</div>
            </li>
          </ul>
          <div class="canvas-cont"><canvas id="attendance-chart"></canvas></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.attendance-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.attendance-table {
  flex-direction: column;
  display: flex;
  padding: 0;
  list-style: none;
  width: 45%;
}

.table-row {
  font-size: 1.2rem;
  padding: 10px;
  padding-bottom: 2px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.table-header {
  font-size: 1.4rem;
  font-weight: bold;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
h2 {
  font-size: 1.8rem;
  color: rgb(242, 242, 242);
}
.att-hero {
  position: relative;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: fit-content;
  background-image: url("/site-images/attendance-hero.jpeg");
}

.att-dark-overlay {
  height: 100%;
  width: 100%;
  min-height: 650px;
  top: 0;
  left: 0;
  background-color: rgba(8, 8, 8, 0.633);
}

.data-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.724);
  padding: 1rem 2rem 2rem 2rem;
  border-radius: 12px;
}

.canvas-cont {
  margin-top: 10px;
  height: 300px;
}

.attendance-container {
  padding: 120px 100px;
  color: rgb(228, 228, 228);
}

.refresh-list {
  width: 170px;
  border: none;
  padding: 10px 30px;
  font-size: 20px;
  border-radius: 4px;
  background-color: rgb(78, 51, 255);
  color: rgb(237, 237, 237);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 30px 0px;
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
        this.createChart();
      } catch (error) {
        console.error(error);
      }
    },

    createChart() {
      const canvasElement = document.getElementById("attendance-chart");

      // Check if there is an existing Chart instance
      if (canvasElement.chart) {
        canvasElement.chart.destroy(); // Destroy the existing Chart instance
      }
      const ctx = canvasElement.getContext("2d");
      const chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Attended", "Not Attended"],
          datasets: [
            {
              label: "Attendance",
              data: [this.attendancePercentage, 100 - this.attendancePercentage],
              backgroundColor: ["#0000e6", "#e6e6ff"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: "right",
          },
          centerText: {
            display: true,
            text: this.attendancePercentage + "% attended",
            color: "#ffffff",
            fontStyle: "bold",
            fontSize: 18,
          },
        },
      });
      canvasElement.chart = chart;
    },
  },

  computed: {
    attendancePercentage() {
      const numAttendees = this.meetingAttendanceList.filter(
        (attendance) => attendance.attended
      ).length;
      const totalAttendees = this.meetingAttendanceList.length;
      return Math.round((numAttendees / totalAttendees) * 100);
    },
  },
};
</script>
