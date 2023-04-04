<script setup>
import axios from "axios";
import { decodeCredential } from "vue3-google-login";
import * as Vue from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { API_URL } = "http://localhost:3000/auth";
const GOOGLE_URL = API_URL + "/google";

const callback = function (response) {
  // This callback will be triggered when user click on the One Tap prompt
  // This callback will be also triggered when user click on login button
  // and selects or login to his Google account from the popup
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential);
  console.log(response);
  localStorage.token = response.credential;
  router.push("/dashboard");
  console.log("Handle the userData", userData);
};
</script>
<script>
export default {
  methods: {
    googlePlus() {
      Vue.googleAuth().directAccess();
      Vue.googleAuth().signIn((authorizationCode) => {
        // things to do when sign-in succeeds
        //      console.log('access_token', authorizationCode.Zi.access_token);
        // You can send the authorizationCode to your backend server for further processing, for example
        fetch(GOOGLE_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            access_token: authorizationCode.Zi.access_token,
          }),
        })
          .then((response) => {
            if (response.ok) return response.json();
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          })
          .then((result) => {
            localStorage.token = result.token;
            this.$router.push("/dashboard");
          })
          .catch((error) => {
            // console.log("error", error);
          });
      });
    },
  },
};
</script>
<style>
.bgimg-inner {
  font-size: larger;
  font-weight: bold;
  color: rgb(226, 226, 226);
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 0;
}

.main-content {
  width: 100%;
  height: 100%;
  padding: 2em;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
}

.sub-content {
  padding: 1em 0.4em 0 1em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* background-image: url("/site-images/sub-content-bg.jpeg"); */
}

.x-large {
  margin-bottom: 0.7em;
  font-size: 1.8rem;
  line-height: 1.2;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.content-img {
  width: 134px;
  height: 200px;
  opacity: 0.65;
  align-self: center;
}

.cta-button-container {
  display: flex;
  justify-content: center;
}

.bg-hero {
  position: relative;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 75vh;
  background-image: url("/site-images/calendar-home.jpeg");
}

.cta-button {
  background-color: #005ab6;
  border-radius: 6px;
  color: #fff;
  border: none;
  padding: 10px;
  margin-top: 10px;
  font-weight: 500;
  font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
}

.dark-overlay {
  height: 100%;
  width: 100%;
  min-height: 650px;
  top: 0;
  left: 0;
  background-color: rgba(6, 6, 6, 0.479);
}

.cta-button:hover {
  background-color: #0069d2;
  cursor: pointer;
  font-weight: 550;
}

GoogleLogin {
  width: 230px;
  padding: 10px;
  font-size: 18px;
  margin-top: 15px;
  border-radius: 4px;
  background-color: rgb(230, 230, 230);
  color: rgb(60, 60, 60);
  border: 1px solid rgb(162, 162, 162);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.google-sign:hover {
  background-color: rgb(244, 244, 244);
  cursor: pointer;
  color: rgb(20, 20, 20);
}

.google-logo {
  height: 24px;
  width: 24px;
}
h5 {
  margin-top: 1em;
}
</style>

<template>
  <section class="bg-hero">
    <div class="dark-overlay">
      <div class="main-content">
        <div class="bgimg-inner">
          <h4>ALL-IN-ONE MEETING MANAGEMENT</h4>
          <h1>Everything you need to organize meeting</h1>
          <p><br /></p>
          <!-- <button class="google-sign" @click="googlePlus">Sign In with Google</button> -->
          <GoogleLogin :callback="callback" />
          <h5>Attendify helps you schedule meetings and track the attendance.</h5>
        </div>
      </div>
    </div>
  </section>
</template>
