<style scoped>
h3,
table {
  color: rgb(217, 217, 217);
}

h3 {
  text-align: center;
}

td,
th {
  padding: 8px;
}
.resultTable .source {
  text-align: center;
}
</style>
<template>
  <div class="resultTable">
    <h3>{{ this.title }}</h3>
    <table>
      <tr>
        <th v-bind:key="header" v-for="header in headers">
          {{ header }}
        </th>
      </tr>
      <tr v-bind:key="index" v-for="(row, index) in body">
        <td>{{ row.SKU }}</td>
        <td>{{ row.Description }}</td>
        <td class="source">{{ row.Source }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "resultTable",
  props: {
    title: String,
    headers: Array,
    body: Array,
  },
};
</script>
