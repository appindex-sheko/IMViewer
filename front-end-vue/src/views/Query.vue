<template>
  <!-- General UI -->
  <SideNav />
  <ConfirmDialog></ConfirmDialog>
  <!-- /General UI -->

  <!-- Content Wrapper -->
  <main id="query-main-container">
    <!-- Page: Home -->
    <div id="home-page" v-if="activePage == 'home'" class="content-container">
      <!-- Searchbar -->
      <div id="search-bar">
        <InputText
          id="search-bar-input"
          type="text"
          placeholder="Search"
          v-model="searchInputText"
          v-tooltip.bottom="'Enter Search Terms to Find Relevant Queries'"
        />
        <Button
          icon="pi pi-sliders-h"
          class="p-ml-3 p-button-secondary p-button-outlined"
          v-tooltip.bottom="'Filter Search Results'"
        />
      </div>
      <!-- /Searchbar -->

      <!-- Tabs Header  -->
      <div id="tab-bar">
        <div
          :class="[
            'tab-button',
            'p-d-inline',
            'non-selectable',
            { active: activeTab == 'my-queries' },
          ]"
          @click="activeTab = 'my-queries'"
        >
          <font-awesome-icon style="margin-right: 10px" icon="bookmark" />

          My Queries
        </div>
        <div
          :class="[
            'tab-button',
            'p-d-inline',
            'non-selectable',
            { active: activeTab == 'query-library' },
          ]"
          @click="activeTab = 'query-library'"
        >
          <font-awesome-icon style="margin-right: 10px" icon="book" />
          Query Library
        </div>
      </div>
      <!-- /Tabs Header -->

      <!-- Tab: My Queries  -->
      <div
        id="tab-my-queries"
        v-if="activeTab == 'my-queries'"
        class="content-tab"
      >
        <!-- Action buttons + Options -->
        <div class="button-toolbar p-pt-5 p-pb-3 p-d-flex p-jc-between">
          <div class="p-d-inline">
            <Button
              icon="pi pi-plus"
              class="p-mr-3 button-medium"
              type="button"
              label="New"
              @click="toggleNewOverlay"
            />
            <Button
              icon="pi pi-pencil "
              class="p-mr-3 p-button-outlined p-button-warning button-medium"
              type="button"
              label="Edit"
              @click="editSelected"
            />
            <Button
              icon="pi pi-trash "
              class="p-mr-3 p-button-outlined p-button-danger button-medium"
              type="button"
              label="Delete"
              @click="deleteSelected"
            />
          </div>

          <div class="p-d-inline">
            <Button
              label="Import"
              icon="pi pi-plus"
              class="p-button-secondary p-button-outlined button-medium p-mr-3"
              @click="importSelected"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-secondary p-button-outlined button-medium"
              @click="exportSelected"
            />
          </div>
        </div>
        <OverlayPanel id="new-overlay" ref="new-overlay">
          <div class="p-d-flex p-flex-column">
            <Button
              label="Query"
              icon="pi pi-search"
              class="p-button-primary p-button-outlined button-medium p-mx-2 p-mb-2"
              @click="handleCreateNewQuery"
            />
            <Button
              label="Folder"
              icon="pi pi-folder"
              class="p-button-primary p-button-outlined button-medium p-mx-2"
              @click="handleCreateNewFolder"
            />
          </div>
        </OverlayPanel>
        <!-- /Action buttons + Options -->

        <!-- Content  -->

        <QueryTable
          id="query-table"
          tableheight="650"
          ref="querytable"
          :searchstring="searchInputText"
        >
        </QueryTable>

        <!-- /Content  -->
      </div>
      <!-- . Tab: My Queries  -->

      <!-- Tab: Query Library  -->
      <div
        id="tab-query-library"
        v-if="activeTab == 'query-library'"
        class="content-tab"
      >
        Query Library - Empty Currently
      </div>
      <!-- /Tab: Query Library  -->
    </div>
    <!-- /Page: Home -->

    <!-- Page: New Query -->
    <div
      id="new-query-tab"
      v-if="activePage == 'new-query'"
      class="content-container"
    >
      <!-- Header -->
      <div class="button-toolbar p-d-flex p-jc-between p-ai-center">
        <div class="p-d-inline"></div>

        <div class="title p-d-inline">
          {{ pageTitle }}
        </div>

        <Button
          icon="pi pi-check"
          class="p-mr-3 button-medium"
          type="button"
          label="Save"
          @click="handleSave"
        />
      </div>
      <!-- /Header -->
    </div>

    <!-- Content  -->

    <!-- /Content  -->

    <!-- /Tab: New Query -->
  </main>
  <!-- /Content Wrapper -->
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import SideNav from "@/components/home/SideNav.vue";
import ConfirmDialog from "primevue/confirmdialog";
import LoggerService from "@/services/LoggerService";
import Tooltip from "primevue/tooltip";

import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
import Dialog from "primevue/dialog";
import QueryTable from "@/components/querybuilder/QueryTable.vue";

export default defineComponent({
  name: "Query",
  components: {
    SideNav,
    ConfirmDialog,
    OverlayPanel,
    QueryTable,
    InputText,
  },
  $refs: {
    OverlayPanel: HTMLElement,
    QueryTable: HTMLElement,
  },
  data() {
    return {
      activePage: "home",
      activeTab: "my-queries",
      pageTitle: "New Query",
      tableHeight: 600,
      selectedItems: [],
      displayNewQuery: false,
      searchInputText: "",
    };
  },
  mounted() {
    // this.$router.push({ name: "QueryBuilder" });
  },
  methods: {
    toggleNewOverlay(event: any): void {
      (this.$refs["new-overlay"] as any).toggle(event);
    },
    handleCreateNewQuery(): void {
      this.activePage = "new-query";
    },
    handleSave(): void {
      this.activePage = "home";
    },
    deleteSelected(): void {
      (this.$refs["querytable"] as any).deleteSelected();
    },
  },
});
</script>

<style scoped>
.icon {
  padding: 15px;
}

.non-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

#query-main-container {
  margin: 0.5rem;
  padding: 2rem;
  height: calc(100vh - 1rem);
  width: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #dde1e2;
}

.content-container {
  width: 100%;
  height: 100%;
}

#search-bar {
  width: 100%;
  text-align: center;
}

#search-bar-input {
  width: 400px;
  text-align: center;
}

.tab-button {
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px 10px 20px;
  margin: 0 20px 20px 0;
  border-bottom: solid 2px transparent;
}

.tab-button:hover {
  color: #2196f3;
}

.tab-button.active {
  color: #2196f3;
  border-bottom: solid 2px #2196f3;
}

#tab-bar {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 11px;
  text-align: center;
  border-bottom: solid 1px #dde1e2;
}

#query-table {
  margin-top: 20px;
  margin-bottom: 10px;
}

#folder-path::v-deep * {
  font-size: 16px;
}

.button-medium::v-deep * {
  font-size: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #4b5563d1; /*darker: #4B5563*/
}
</style>
