<template>
  <div class="p-d-flex p-flex-column p-jc-start" id="side-bar">
    <span class="p-input-icon-left" id="search-bar">
      <i class="pi pi-search" aria-hidden="true" />
      <InputText
        type="text"
        v-model="searchTerm"
        @input="debounceForSearch"
        @keyup.enter="search"
        placeholder="Search"
        class="p-inputtext-lg search-input"
        autoWidth="false"
      />
    </span>

    <TabView class="p-d-flex p-flex-column p-jc-start" id="side-menu" v-model:activeIndex="active">
      <TabPanel>
        <template #header>
          <i class="fas fa-sitemap icon-header" aria-hidden="true" />
          <span>Hierarchy</span>
        </template>
        <Hierarchy @showTree="active = 0" :active="active" />
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="fas fa-search icon-header" aria-hidden="true" />
          <span>Search results</span>
        </template>

        <div class="p-fluid p-d-flex p-flex-column p-jc-between results-filter-container">
          <SearchResults :loading="loading" />
          <Filters :search="search" />
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="fas fa-history icon-header" aria-hidden="true" />
          <span>History</span>
        </template>
        <History />
      </TabPanel>
    </TabView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hierarchy from "@/components/sidebar/Hierarchy.vue";
import History from "@/components/sidebar/History.vue";
import SearchResults from "@/components/sidebar/SearchResults.vue";
import Filters from "@/components/sidebar/Filters.vue";
import { SearchRequest } from "@/models/search/SearchRequest";
import { SortBy } from "@/models/search/SortBy";
import axios from "axios";
import { mapState } from "vuex";
import { TTIriRef } from "@/models/TripleTree";
import { EntityReferenceNode } from "@/models/EntityReferenceNode";
import { Namespace } from "@/models/Namespace";
import { isArrayHasLength, isObject } from "@/helpers/DataTypeCheckers";

export default defineComponent({
  name: "SidebarControl",
  components: { Hierarchy, History, SearchResults, Filters },
  computed: mapState(["filterOptions", "selectedFilters", "focusHierarchy"]),
  watch: {
    focusHierarchy(newValue) {
      if (newValue) {
        this.active = 0;
        this.$store.commit("updateFocusHierarchy", false);
      }
    }
  },
  data() {
    return {
      loading: false,
      searchTerm: "",
      active: 0,
      debounce: 0,
      request: {} as { cancel: any; msg: string },
      windowHeight: 0,
      windowWidth: 0
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);

    this.setContainerHeights();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize(): void {
      this.setContainerHeights();
    },

    async search(): Promise<void> {
      if (this.searchTerm.length > 2) {
        this.loading = true;
        this.active = 1;
        const searchRequest = new SearchRequest();
        searchRequest.termFilter = this.searchTerm;
        searchRequest.sortBy = SortBy.Usage;
        searchRequest.page = 1;
        searchRequest.size = 100;
        searchRequest.schemeFilter = this.selectedFilters.schemes.map((scheme: Namespace) => scheme.iri);

        searchRequest.statusFilter = [];
        this.selectedFilters.status.forEach((status: EntityReferenceNode) => {
          searchRequest.statusFilter.push(status["@id"]);
        });

        searchRequest.typeFilter = [];
        this.selectedFilters.types.forEach((type: TTIriRef) => {
          searchRequest.typeFilter.push(type["@id"]);
        });
        if (isObject(this.request) && isArrayHasLength(Object.keys(this.request))) {
          await this.request.cancel({ status: 499, message: "Search cancelled by user" });
          this.loading = true;
        }
        const axiosSource = axios.CancelToken.source();
        this.request = { cancel: axiosSource.cancel, msg: "Loading..." };
        await this.$store.dispatch("fetchSearchResults", {
          searchRequest: searchRequest,
          cancelToken: axiosSource.token
        });
        this.loading = false;
      } else {
        this.active = 0;
      }
    },

    debounceForSearch(): void {
      clearTimeout(this.debounce);
      this.debounce = window.setTimeout(() => {
        this.search();
      }, 600);
    },

    setContainerHeights(): void {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      const html = document.documentElement;
      const currentFontSize = parseFloat(window.getComputedStyle(html, null).getPropertyValue("font-size"));
      const sidebar = document.getElementById("side-bar") as HTMLElement;
      if (sidebar) {
        sidebar.style.maxHeight = this.windowHeight - currentFontSize * 2 + "px";
      }
      const fixedSidebar = document.getElementById("side-bar") as HTMLElement;
      const searchBar = document.getElementById("search-bar") as HTMLElement;
      const sideMenu = document.getElementById("side-menu") as HTMLElement;
      if (searchBar && fixedSidebar && sideMenu) {
        sideMenu.style.maxHeight = fixedSidebar.getBoundingClientRect().height - searchBar.getBoundingClientRect().height + "px";
      }
    }
  }
});
</script>

<style scoped>
#side-bar {
  /* padding: 7px; */
  max-height: 100%;
  grid-area: sidebar;
  height: 100%;
  width: 30vw;
}

#side-menu {
  /* max-height: calc(100% - 41px); */
  flex-grow: 100;
}

#side-menu ::v-deep(.p-tabview-panels) {
  flex-grow: 6;
  overflow-y: auto;
}

#side-menu ::v-deep(.p-tabview-panel) {
  height: 100%;
  /* overflow-y: auto; */
}

.results-filter-container {
  height: 100%;
}

#search-bar {
  width: 100%;
}

.search-input {
  width: 100%;
}

.icon-header {
  margin: 0 4px 0 0;
}

.p-tabview-panel {
  overflow-x: hidden;
}
</style>
