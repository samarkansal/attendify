<script>
import { getUserName } from "../utils/userDetail";
import TheCardList from "@/components/TheCardList.vue";
import axios from "axios";
import { ref, onMounted, watch } from "vue";

export default {
  components: {
    TheCardList,
  },
  setup() {
    const selectedTab = ref("upcoming");
    const meetingList = ref([]);

    const getMeetingList = async (selectedTab) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/meeting/${selectedTab}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        );
        console.log(response.data);
        meetingList.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      getMeetingList(selectedTab.value);
    });

    watch(selectedTab, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        getMeetingList(newVal);
      }
    });

    return {
      getUserName,
      meetingList,
      selectedTab,
    };
  },
};
</script>

<style>
.primary-button {
  background-color: #005ab6;
  border-radius: 6px;
  color: #fff;
  border: none;
  padding: 10px;
  font-weight: 500;
  font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
}

.primary-button:hover {
  background-color: #0069d2;
  cursor: pointer;
  font-weight: 510;
}
.dashboard-container {
  min-height: 600px;
  font-size: larger;
  font-weight: bold;
  color: rgb(35, 35, 35);
}

.top-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8rem 4rem;
  height: 10vw;
  background-color: rgb(215, 215, 215);
}

.dash-hero {
  position: relative;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: fit-content;
  background-image: url("/site-images/calendar-dash.jpeg");
}

.dash-dark-overlay {
  height: 100%;
  width: 100%;
  min-height: 650px;
  top: 0;
  left: 0;
  background-color: rgba(6, 6, 6, 0.752);
}

.greeting {
  color: rgb(44, 44, 44);
}

.tab-container {
  padding: 0 2rem 0 2rem;
  background-color: rgb(255, 255, 255);
}

.tab-list {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  background-color: rgb(164, 164, 164);

  /* border-top: 1px solid; */
}

.tab-list > li {
  border-color: rgb(164, 164, 164);
  padding: 5px 2rem;
  border-radius: 6px;
  border-bottom: none;
  cursor: pointer;
  padding: 0.5rem;
  font-weight: 300;

  background-color: rgb(164, 164, 164);
}

.tab-list li.active {
  background-color: rgb(255, 255, 255);
}

.tab-list li:hover {
  background-color: #ccc;
}
</style>

<template>
  <section class="dash-hero">
    <div class="dash-dark-overlay">
      <div class="dashboard-container">
        <div class="top-box">
          <h1 class="greeting">Hi {{ getUserName() }} !</h1>
          <router-link to="/event">
            <button class="primary-button">Create new event</button>
          </router-link>
        </div>
        <div class="tab-container">
          <ul class="tab-list">
            <li
              :class="{ active: selectedTab === 'upcoming' }"
              @click="selectedTab = 'upcoming'"
            >
              Upcoming events
            </li>
            <li :class="{ active: selectedTab === 'past' }" @click="selectedTab = 'past'">
              Past events
            </li>
          </ul>
          <the-card-list :meetingList="meetingList"></the-card-list>
        </div>
      </div>
    </div>
  </section>
</template>
