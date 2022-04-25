<style>
body {
  background-color: #081c24;
  margin: 0px;
}
.resultContainer,
.exporterContainer {
  display: flex;
  justify-content: space-evenly;
  margin: 50px 0px;
  flex-wrap: wrap;
}
a {
  text-decoration: none;
}
.popular-comics-container {
  padding: 0 17px;
}

.popular-comics-title {
  margin-top: 44px;
  text-align: left;
  font-size: 20px;
  color: #e3f4fc;
}

.lds-ring {
  display: inline-block;
  position: absolute;
  top: 45%;
  left: 45%;
  width: 100px;
  height: 100px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #dfc;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #dfc transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div v-if="getDataReady">
    <div class="resultContainer">
      <resultTable
        v-bind:key="result"
        v-for="result in Object.keys(getData)"
        :title="result === 'expected' ? 'Expected Output' : 'Output'"
        :headers="getHeaders(result)"
        :body="getBody(result)"
      />
    </div>
    <div class="exporterContainer">
      <exportButton :output="getData.output" />
    </div>
  </div>
  <div v-else class="loading">
    <!-- else Loading  -->
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import resultTable from "./components/resultTable.vue";
import exportButton from "./components/exportButton.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    resultTable,
    exportButton,
  },
  computed: {
    ...mapGetters(["getData", "getDataReady"]),
  },
  methods: {
    ...mapActions(["LOAD_DATA"]),
    getHeaders(result) {
      return Object.keys(this.getData[result][0]);
    },
    getBody(result) {
      return this.getData[result];
    },
  },
  mounted() {
    this.LOAD_DATA();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
