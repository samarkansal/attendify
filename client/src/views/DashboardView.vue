<script setup>
import { getUserName } from "../utils/userDetail";
</script>

<style>
.dashboard-container {
  padding-top: 100px;
  margin-left: 3rem;
  min-height: 600px;
  font-size: larger;
  font-weight: bold;
  color: rgb(35, 35, 35);
}
</style>

<template>
  <div class="dashboard-container">
    <h1>Hi {{ getUserName() }}</h1>
  </div>
</template>
