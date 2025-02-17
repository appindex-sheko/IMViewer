<template>
  <div id="usedin-table-container">
    <DataTable
      :value="usages"
      :scrollable="true"
      :scrollHeight="scrollHeight"
      showGridlines
      class="p-datatable-sm"
      :totalRecords="recordsTotal"
      :rowsPerPageOptions="[25, 50, 100]"
      :rows="25"
      :paginator="recordsTotal > 25 ? true : false"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
      currentPageReportTemplate="Displaying {first} to {last} of {totalRecords} concepts"
      selectionMode="single"
      v-model:selection="selected"
      @click="handleSelected"
      :lazy="true"
      @page="handlePage($event)"
      :loading="loading"
    >
      <template #empty>
        No records found.
      </template>
      <template #loading>
        Loading data. Please wait.
      </template>
      <Column field="name" filter-field="name" header="Name">
        <template #body="slotProps">
          {{ slotProps.data.name }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script lang="ts">
import EntityService from "@/services/EntityService";
import LoggerService from "@/services/LoggerService";
import { defineComponent } from "@vue/runtime-core";
import { TTIriRef } from "@/models/TripleTree";
import { isObjectHasKeys } from "@/helpers/DataTypeCheckers";

export default defineComponent({
  name: "UsedIn",
  props: {
    conceptIri: { type: String, required: true }
  },
  watch: {
    async conceptIri(newValue) {
      this.loading = true;
      await this.getUsages(newValue, 0, this.pageSize);
      await this.getRecordsSize(newValue);
      this.loading = false;
    }
  },
  async mounted() {
    this.loading = true;
    window.addEventListener("resize", this.onResize);
    await this.getUsages(this.conceptIri, 0, this.pageSize);
    await this.getRecordsSize(this.conceptIri);
    this.setScrollHeight();
    this.loading = false;
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      usages: [] as TTIriRef[],
      loading: false,
      selected: {} as TTIriRef,
      recordsTotal: 0,
      currentPage: 1,
      pageSize: 25,
      scrollHeight: "500px"
    };
  },
  methods: {
    async getUsages(iri: string, pageIndex: number, pageSize: number): Promise<void> {
      this.usages = await EntityService.getEntityUsages(iri, pageIndex, pageSize);
    },

    async getRecordsSize(iri: string): Promise<void> {
      this.recordsTotal = await EntityService.getUsagesTotalRecords(iri);
    },

    async handlePage(event: any): Promise<void> {
      this.loading = true;
      this.pageSize = event.rows;
      this.currentPage = event.page;
      await this.getUsages(this.conceptIri, this.currentPage, this.pageSize);
      this.scrollToTop();
      this.loading = false;
    },

    handleSelected(): void {
      if (isObjectHasKeys(this.selected, ["@id"])) {
        this.$router.push({
          name: "Concept",
          params: { selectedIri: this.selected["@id"] }
        });
      }
    },

    scrollToTop(): void {
      const resultsContainer = document.getElementById("search-results-container") as HTMLElement;
      const scrollBox = resultsContainer?.getElementsByClassName("p-datatable-wrapper")[0] as HTMLElement;
      if (scrollBox) {
        scrollBox.scrollTop = 0;
      }
    },

    onResize(): void {
      this.setScrollHeight();
    },

    setScrollHeight(): void {
      const container = document.getElementById("usedin-table-container") as HTMLElement;
      const paginator = container?.getElementsByClassName("p-paginator")[0] as HTMLElement;
      if (container && paginator) {
        const height = container.getBoundingClientRect().height - paginator.getBoundingClientRect().height - 1 + "px";
        this.scrollHeight = height;
      } else if (container && !paginator) {
        const height = container.getBoundingClientRect().height - 1 + "px";
        this.scrollHeight = height;
      } else {
        LoggerService.error(undefined, "Failed to set usedIn table scroll height. Required elements not found.");
      }
    }
  }
});
</script>

<style scoped>
#usedin-table-container {
  height: 100%;
}

/* #usedin-table-container ::v-deep(.p-datatable) {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
}

#usedin-table-container ::v-deep(.p-datatable-wrapper) {
  flex-grow: 6;
} */
</style>
