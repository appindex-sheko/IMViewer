<template>
  <!-- General UI -->
  <ConfirmDialog></ConfirmDialog>
  <!-- /General UI -->

  <!-- Content Wrapper -->
  <main id="main-container">
    <!-- Page: Home -->
    <div id="home-page" v-if="activePage == 'home'" class="page">
      <!-- Searchbar -->
      <div id="search-bar">
        <InputText
          id="search-bar-input"
          type="text"
          
          placeholder="Search"
          v-model="searchInputText"
          v-tooltip.bottom="
            'Enter search terms to find queries by name or description'
          "
        />
        <Button
          icon="pi pi-sliders-h"
          class="p-ml-3 p-button-secondary p-button-outlined"
          v-tooltip.bottom="'Filter search results'"
          @click="toggleFilterOverlay"
        />
        <OverlayPanel id="filter-overlay" ref="filter-overlay">
          <div class="overlay-title">Filters</div>

          <div class="filter-container p-d-flex p-flex-column">
            <div class="p-my-2">
              <div>Tags</div>
              <Chips class="p-my-2" v-model="filterTags" />
            </div>
          </div>
        </OverlayPanel>
      </div>
      <!-- /Searchbar -->

      <!-- Tabs Header  -->
      <div id="tab-buttons">
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

          Datasets
        </div>
        <div
          :class="[
            'tab-button',
            'p-d-inline',
            'non-selectable',
            { active: activeTab == 'dataset-library' },
          ]"
          @click="activeTab = 'dataset-library'"
        >
          <font-awesome-icon style="margin-right: 10px" icon="book" />
          Dataset Library
        </div>
      </div>
      <!-- /Tabs Header -->

      <!-- Tab: My Queries  -->
      <div
        id="tab-my-queries"
        v-if="activeTab == 'my-queries'"
        class="content-tab"
      >

      Tab My Query

      </div>
      <!-- . Tab: My Queries  -->

      <!-- Tab: Query Library  -->
      <div
        id="tab-dataset-library"
        v-if="activeTab == 'dataset-library'"
        class="content-tab"
      >
        Tab: Query Library
      </div>
      <!-- /Tab: Query Library  -->
    </div>
    <!-- /Page: Home -->

    <!-- Page: New Query -->
    <div id="new-query-page" v-if="activePage == 'new-query'" class="page">
      <!-- Header -->
      <div class="button-toolbar p-d-flex p-jc-between p-ai-center">
        <div class="p-d-inline"></div>

        <div class="title p-d-inline">
          Alternative Page 2 - Empty / Not in use Yet
        </div>

        <Button
          icon="pi pi-check"
          class="p-mr-3 button-medium"
          type="button"
          label="Save"
        />
      </div>
      <!-- /Header -->
    </div>

    <!-- /Tab: New Query -->
  </main>
  <!-- /Content Wrapper -->
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import ConfirmDialog from "primevue/confirmdialog";
import LoggerService from "@/services/LoggerService";
import Tooltip from "primevue/tooltip";

import Chips from "primevue/chips";
import MegaMenu from "primevue/megamenu";

import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
import Dialog from "primevue/dialog";
import QueryTable from "@/components/dataset/QueryTable.vue";

export default defineComponent({
  name: "Search",
  components: {
    ConfirmDialog,
    OverlayPanel,
    QueryTable,
    InputText,
    Chips,
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
      searchInputText: "",
      filterTags: null,
    };
  },
  async mounted() {
    this.$store.commit("updateSelectedEntityType", "Search");
    this.$store.commit("updateSideNavHierarchyFocus", {
      name: "Search",
      fullName: "Search",
      iri: "http://endhealth.info/im#Search",
    });
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

#main-container {
  margin: 0.5rem;
  padding: 2rem;
  height: calc(100vh - 1rem);
  width: 100%;
  overflow-y: auto;
  background-color: #f8f9fb;
  border: 1px solid #dde1e2;
}

.page {
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

#tab-buttons {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: solid 1px #dde1e2;
}

#query-table {
  margin-top: 20px;
  margin-bottom: 10px;
}

.filter-container {
  max-width: 300px;
}

.button-medium::v-deep * {
  font-size: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #4b5563d1; /*darker: #4B5563*/
}

.overlay-title {
  font-size: 18px;
  font-weight: bold;
  color: #4b5563d1; /*darker: #4B5563*/
}
</style>
