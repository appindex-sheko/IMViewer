<template>
  <div>
    <DataTable
      :value="querytable"
      :lazy="true"
      :paginator="true"
      :rows="10"
      v-model:filters="filters"
      ref="querytable"
      :totalRecords="totalRecords"
      :loading="loading"
      @page="onPage($event)"
      @sort="onSort($event)"
      @filter="onFilter($event)"
      filterDisplay="row"
      :globalFilterFields="['name', 'description']"
      responsiveLayout="scroll"
    >
      <Column
        field="name"
        header="Name"
        filterMatchMode="startsWith"
        ref="name"
        :sortable="true"
      >
        <template #filter="{filterModel,filterCallback}">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Name"
          />
        </template>
      </Column>
      <Column
        field="description"
        header="Description"
        filterField="description"
        filterMatchMode="contains"
        ref="description"
        :sortable="true"
      >
        <template #filter="{filterModel,filterCallback}">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            placeholder="Search by Description"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QueryBuilderService from "@/services/QueryBuilderService";

export default defineComponent({
  name: "QueryTable",
  data() {
    return {
      queryBuilderService: null as unknown,
      loading: false,
      totalRecords: 0,
      queries: "" as string,
      filters: {
        name: { value: "", matchMode: "contains" },
        description: { value: "", matchMode: "contains" },
      },
      lazyParams: {},
      columns: [
        { field: "name", header: "Name" },
        { field: "description", header: "Description" },
      ],
    };
  },
  $refs: {
    querytable: HTMLElement,
  },

  created() {
    this.queryBuilderService = new QueryBuilderService();
  },
  mounted() {
    this.loading = true;

    this.lazyParams = {
      first: 0,
      rows: (this.$refs["new-dt"] as any).rows,
      sortField: null,
      sortOrder: null,
      filters: this.filters,
    };

    this.loadLazyData();
  },
  methods: {
    loadLazyData() {
      this.loading = true;

      setTimeout(() => {
        (this.queryBuilderService as QueryBuilderService)
          .getQueries()
          .then((data) => {
            this.queries = data;
          });
      }, 1000);
    },
  },
});
</script>
