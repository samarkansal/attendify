<style>
.scan-container {
  padding: 150px;
}

.decode-result {
  color: rgb(54, 54, 54);
  margin-bottom: 50px;
  width: 300px;
}
</style>

<template>
  <div class="scan-container">
    <p class="error">{{ error }}</p>

    <h2 class="decode-result">
      Last result: <b>{{ result }}</b>
    </h2>

    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue3-qrcode-reader";
import axios from "axios";

export default {
  components: { QrcodeStream },

  data() {
    return {
      result: "",
      error: "",
    };
  },

  methods: {
    async onDecode(result) {
      this.result = result + ":\n";
      try {
        const response = await axios.post("http://localhost:3000/api/qr/verifyQR", {
          qrCode: result,
        });
        if (response.status === 200) {
          // Display success message
          console.log("QR code verified");
          this.result += "QR code verified";
        } else {
          // Display error message from server
          console.log(response.data.message);
          this.result += response.data.message;
        }
      } catch (error) {
        if (error.response.status === 400) {
          // Display error message from server
          console.log(error.response.data.message);
          this.result += error.response.data.message;
        } else if (error.response.status === 500) {
          // Display server error message
          console.error(error);
          this.result += "Server error";
        }
      }
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
  },
};
</script>
