<template>
  <div class="table" :style="{ height: tableheight + 'px' }">


  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DatasetService from "@/services/DatasetService";
import LoggerService from "@/services/LoggerService";

import Checkbox from "primevue/checkbox";

export default defineComponent({
  name: "OrganisationTable",
  props: ["tableheight", ],
  data() {
    return {
      tableData: [] as any,
    };
  },
  async mounted() {
    this.fetchQueryData();
  },
  methods: {
    async fetchQueryData(): Promise<void> {
      await DatasetService.getOrganisation()
        .then((res) => {
          this.tableData = JSON.parse(res).organisationData;
          console.log(this.tableData);
        })
        .catch((err) => {
          this.$toast.add(
            LoggerService.error("Failed to fetch table data", err)
          );
        });
    },
  },
});
</script>

<style scoped>
div.table {
  padding: 10px 0;
  overflow-y: auto;
}

div.table::v-deep * {
  font-size: 16px !important;
}

div.table::-webkit-scrollbar {
  width: 10px;
}

div.table::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
}

div.table::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  /* outline: 1px solid slategrey; */
}

div.table > * {
  border-bottom: solid 1px #dde1e2;
  overflow-y: auto;
}


.table-row {
  padding-right: 20px;
  margin-right: 10px;
  /* padding: 15px 0 15px 15px; */
}

.table-row:hover {
  box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
    0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  /* border: solid 0.1px #dde1e2; */
  background: #fefefe;
  z-index: 2;
}

.row-checkbox {
  margin-left: 15px;
  margin-right: 20px;
}


</style>
