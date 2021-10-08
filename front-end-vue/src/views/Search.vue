<template>
  <!-- General -->
  <ConfirmDialog></ConfirmDialog>
  <!-- /General -->

  <!-- Content Wrapper -->
  <main id="main-container" class="">
    <!-- Page: Home -->
    <div id="new-query-page" v-if="activePageName == 'Home'" class="page">
      Home
    </div>

    <!-- /Tab: Home -->

    <!-- Page: Results -->
    <div id="home-page" v-if="activePageName == 'Results'" class="page">
      <!-- Searchbar Top -->
      <div id="search-bar-top">
        <InputText
          id="search-bar-input"
          class="shadow-md"
          type="text"
          placeholder="Search"
          v-model="searchInputText"
        />
      </div>
      <!-- /Searchbar Top -->

      <!-- Tab Buttons  -->
      <div id="tab-buttons">
        <template v-for="tab in tabs">
          <div
            v-if="tab.visible"
            :key="tab.id"
            :class="[
              'tab-button',
              'p-d-inline',
              'non-selectable',
              { active: activeTabId == tab.id },
            ]"
            @click="activeTabId = tab.id"
          >
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="p-d-inline"
              fill="none"
              view-box="0 0 24 24"
              stroke="currentColor"
              style="width: 24px; height: 24px; margin-right: 5px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :stroke-width="tab.icon.strokeWidth"
                :d="tab.icon.d"
              />
            </svg>

            <!-- / Icon -->

            {{ tab.name }}
          </div>
        </template>
      </div>
      <!-- /Tab Buttons -->


      <!-- Tab: Search -->
      <div  v-if="activeTabId == 1" class="content-tab">
        Search
      </div>
      <!-- /Tab: Search  -->

      <!-- Tab: Data  -->
      <div  v-if="activeTabId == 2" class="content-tab">
        Data
      </div>
      <!-- /Tab: Data  -->

      <!-- Tab: Explore  -->
      <div  v-if="activeTabId == 3" class="content-tab">
        Explore
      </div>
      <!-- /Tab: Explore  -->

      <!-- Tab: Organisations  -->
      <div  v-if="activeTabId == 4" class="content-tab">
        Organisations
      </div>
      <!-- /Tab: Organisations  -->

      <!-- Tab: Dictionary  -->
      <div  v-if="activeTabId == 5" class="content-tab">
        Dictionary
      </div>
      <!-- /Tab: Dictionary  -->

      <!-- Tab: Resources  -->
      <div v-if="activeTabId == 6" class="content-tab">
        Resources
      </div>
      <!-- /Tab: Resources  -->
      
    </div>
    <!-- /Page: Results-->
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
    InputText,
  },
  $refs: {
    OverlayPanel: HTMLElement,
    QueryTable: HTMLElement,
  },
  data() {
    return {
      activePageName: "Home",
      activeTabId: 1,
      tabs: [
        {
          id: 1,
          name: "Search",
          icon: {
            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            strokeWidth: "2",
          },
          visible: true,
        },
        {
          id: 2,
          name: "Data",
          icon: {
            d:
              "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
            strokeWidth: "2",
          },
          visible: true,
        },
        {
          id: 3,
          name: "Explore",
          icon: {
            d:
              "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            strokeWidth: "2",
          },
          visible: true,
        },
        {
          id: 4,
          name: "Organisations",
          icon: {
            d:
              "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            strokeWidth: "2",
          },
          visible: true,
        },
        {
          id: 5,
          name: "Dictionary",
          icon: {
            d:
              "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            strokeWidth: "2",
          },
          visible: true,
        },
        {
          id: 6,
          name: "Resources",
          icon: {
            d:
              "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
            strokeWidth: "2",
          },
          visible: true,
        },
      ],
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
  /* margin: 0.5rem; */
  padding: 2rem;
  /* height: calc(100vh - 1rem); */
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  background-color: #ffffff; /* Grey f8f9fb*/
  /* border: 1px solid #dde1e2; */
}

#main-container::v-deep * {
  font-size: 14px;
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
  border-bottom: solid 3px transparent;
}

.tab-button:hover {
  color: #2196f3;
}

.tab-button.active {
  color: #2196f3;
  border-bottom: solid 3px #2196f3;
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
