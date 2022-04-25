<style scoped>
button {
  color: #2c3e50;
  background-color: lightgreen;
  box-sizing: border-box;

  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border: 2px solid;
  cursor: pointer;
  padding: 0 38px;
  height: 56px;
  border-radius: 8px;
  font-size: 16px;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-style: normal;
  text-decoration: none;
  line-height: 1.5;
  border-color: lightgreen;
}
button:hover {
  background-color: rgb(109, 176, 109);
  border-color: rgb(109, 176, 109);
}
</style>
<template>
  <button v-on:click="exportCSV(output)">Export csv</button>
</template>

<script>
export default {
  name: "exportButton",
  props: {
    output: Array,
  },
  methods: {
    exportCSV(output) {
      let csvTitle = `${Object.keys(output[0])
        .map((value) => value)
        .join(",")}\r\n`;
      let csvContent = "";
      output.forEach((record) => {
        csvContent += `${Object.values(record).join()}\r\n`;
      });

      let csv = csvTitle + csvContent;

      var encodedUri = "data:text/csv;charset=utf-8," + encodeURI(csv);
      var link = document.createElement("a");
      link.href = encodedUri;
      link.download = "output.csv";

      link.click();
    },
  },
};
</script>
