<template>
  <!-- General -->
  <ConfirmDialog></ConfirmDialog>
  <!-- /General -->

  <!-- Content Wrapper -->
  <main id="main-container" class="px-5-md">
    <!-- Page: Home -->
    <div
      id="page-home"
      v-if="activePageName == 'Home'"
      class="page flex flex-col items-center justify-center"
    >
      <!-- Brand  -->
     
      <div
        id="brand"
        class="non-selectable flex items-center justify-center mb-10 text-gray-700 text-5xl font-medium"
      >
       <!-- <img class="im-logo mr-5" src="/img/Logo-object-empty.27c03592.png" alt="IM logo" data-v-098ea5e8=""> -->
       <img class="search-logo mb-10" src="search-icon.png" alt="">
      </div>
      <!-- /Brand  -->

      <!-- Searchbox  -->
      <div id="searchbox-main" class="mx-auto w-full max-w-3xl flex px-5-sm">
        <Searchbox
          v-model="searchString"
          :autocompleteData="autocompleteData"
        
        />
        <button
          class="transition duration-200 ease-in-out w-14 group relative ml-3 py-2 px-4 border border-transparent rounded-md text-white bg-blue-500 hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            @click="activePageName = 'SearchResults'"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
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
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </span>
        </button>
      </div>
      <!-- /Searchbox  -->

      <!-- Examples  -->
      <div
        id="examples"
        class="mx-auto max-w-3xl my-7 px-4 text-gray-900 text-lg"
      >
      <a class="mr-3 font-bold" href="">Try </a>
        <b>Heart rate</b> and <b>blood glucose</b> for patients with
        <b>diabetes</b>
      </div>
      <!-- /Examples  -->
    </div>
    <!-- /Page: Home -->

    <!-- Page: Results -->
    <div id="page-search" v-if="activePageName == 'SearchResults'" class="page">
      <!-- Searchbox  -->
      <div id="searchbox-top" class="mx-auto w-full max-w-4xl flex mb-4">
        <Searchbox
          class="w-full"
          v-model="searchString"
          :autocompleteData="autocompleteData"
        />
        <button
          class="transition duration-200 ease-in-out w-14 group relative ml-3 py-2 px-4 border border-transparent rounded-md text-white bg-blue-500 hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
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
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </span>
        </button>
      </div>
      <!-- /Searchbox  -->

      <!-- Tab Buttons  -->
      <div id="tab-buttons">
        <HorizontalNavbar v-model="activeTabIndex" :items="tabs" />
      </div>
      <!-- /Tab Buttons -->

      <!-- Tabs -->
      <div class="">
        <!-- Tab: Search -->
        <div v-if="activeTabIndex == 0" class="content-tab flex pt-5">
          <!-- <div class="w-full max-w-md">Filters Expanded</div> -->
          <div class="w-full max-w-4xl mx-auto">
            <!-- <div>Filter and sort</div> -->
            <SearchResults
              class="w-full"
              :results="exampleResults"
              :value="searchString"
            />
          </div>
          <!-- <div class="w-full max-w-md">See also, more info on hovered item</div> -->
        </div>
        <!-- /Tab: Search  -->

        <!-- Tab: Data  -->
        <div v-if="activeTabIndex == 1" class="content-tab">
          Data
        </div>
        <!-- /Tab: Data  -->

        <!-- Tab: Explore  -->
        <div v-if="activeTabIndex == 2" class="content-tab">
          Explore
        </div>
        <!-- /Tab: Explore  -->

        <!-- Tab: Organisations  -->
        <div v-if="activeTabIndex == 3" class="content-tab">
          Organisations
        </div>
        <!-- /Tab: Organisations  -->

        <!-- Tab: Dictionary  -->
        <div v-if="activeTabIndex == 4" class="content-tab">
          Dictionary
        </div>
        <!-- /Tab: Dictionary  -->

        <!-- Tab: Resources  -->
        <div v-if="activeTabIndex == 5" class="content-tab">
          Resources
        </div>
        <!-- /Tab: Resources  -->
      </div>
      <!-- /Tabs -->
    </div>
    <!-- /Page: SearchResults-->
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

import OverlayPanel from "primevue/overlaypanel";
import Dialog from "primevue/dialog";
import QueryTable from "@/components/dataset/QueryTable.vue";

import Searchbox from "@/components/search/Searchbox.vue";
import HeroIcon from "@/components/search/HeroIcon.vue";
import SearchResults from "@/components/search/SearchResults.vue";
import HorizontalNavbar from "@/components/search/HorizontalNavbar.vue";

import SearchService from "@/services/SearchService";

export default defineComponent({
  name: "Search",
  components: {
    ConfirmDialog,
    Searchbox,
    SearchResults,
    HorizontalNavbar,
  },
  data() {
    return {
      searchString: "",
      activePageName: "Home", //Options #Home #SearchResults
      activeTabIndex: 0,
      tabs: [
        {
          index: 0,
          name: "Search",
          icon: "search",
          visible: true,
        },
        {
          index: 1,
          name: "Data",
          icon: "table",
          visible: true,
        },
        {
          index: 2,
          name: "Explore",
          icon: "globe",
          visible: true,
        },
        {
          index: 3,
          name: "Organisations",
          icon: "home",
          visible: true,
        },
        {
          index: 4,
          name: "Dictionary",
          icon: "bookOpen",
          visible: true,
        },
        {
          index: 6,
          name: "Resources",
          icon: "newspaper",
          visible: true,
        },
      ],
      actions: [
        {
          id: "im:Search",
          module: "search",
          label: "Search",
          comment: "",
          actions: [
            {
              action: "search",
              label: "Search",
              comment: "Search for data, organisations and other resources",
            },
          ],
        },
        {
          id: "im:DatasetEditor",
          module: "data",
          label: "Data",
          comment: "",
          actions: [
            {
              action: "createDataset",
              label: "Create New Dataset",
              comment:
                "Define the data you want to extract from Health Records",
            },
            {
              action: "viewDatasets",
              label: "View Existing Dataset",
              comment:
                "Browse through existing Datasets and copy it into your library",
            },
          ],
        },
        {
          id: "im:Discover",
          module: "discover",
          label: "Discover",
          comment:
            "Get statistical insight into patients, organisations and Conditions",
          actions: [
            {
              action: "viewConditionProfile",
              label: "View Condition Profile",
              comment:
                "Get statistical insight from the Health Records for a condition by area, sex, age, ethnicity or organisation",
            },
            {
              action: "searchConditionProfile",
              label: "Search for Conditions",
              comment: "Search for conditions",
            },
            {
              action: "viewHealthRecord",
              label: "View Health Record",
              comment:
                "View healthrecords for a patient in your Organisation or in your Dataset.",
            },
          ],
        },
        {
          id: "im:OrganisationBrowser",
          module: "organisations",
          label: "Organisations",
          comment: "",
          actions: [
            {
              action: "view",
              label: "View Organisations",
              comment:
                "View Organisations in the Browser e.g. on a Map, Globe or List",
            },
            {
              action: "createList",
              label: "Create New List",
              comment:
                "Create a New List of Organisations you wish to see data for",
            },
          ],
        },
        {
          id: "im:Dictionary",
          module: "dictionary",
          label: "Dictionary",
          comment: "Interpret your question with a dictionary.",
          actions: [
            {
              action: "analysePhrase",
              label: "Analyse Phrase",
              comment:
                "Analyse one or more words in a phrase using a powerful dictionary that models the structure and content of health records",
            },
          ],
        },
        {
          id: "",
          module: "Resources",
          label: "resources",
          comment: "",
          actions: [
            {
              action: "viewWebpage",
              label: "Visit Website",
              comment: "Open the website in a new window",
            },
            {
              action: "searchResources",
              label: "Search for Resources",
              comment:
                "Search for drugs, calculators, guidelines and research papers",
            },
          ],
        },
      ],
      exampleResults: [
        {
          url:
            "https://im.endeavourhealth.net/#/search?q=comborbidities+associated+with+diabetes+in+east+london",
          title: "Create Dataset",
          description: "Extract data from health records",
          module: "data",
          icon: "tables",
        },
        {
          url:
            "https://im.endeavourhealth.net/#/search?q=comborbidities+associated+with+diabetes",
          title: "Browse Organisations",
          description:
            "View organisations on a map and add them to lists to source data",
          module: "data",
          icon: "tables",
        },
        {
          url:
            "https://im.endeavourhealth.net/#/search?q=comborbidities+associated+with+diabetes",
          title: "View Disease Profile",
          description:
            "Find conditions, symptoms, observations and other health record entries associated with diabetes",
          module: "data",
          icon: "tables",
        },
      ],
      autocompleteData: null,
      tableHeight: 600,
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
  methods: {
    async fetchAutocomplete(): Promise<void> {
      await SearchService.getAutocomplete(this.searchString)
        .then((res: any) => {
          console.log("fetched ", res);
          this.autocompleteData = res.data;
        })
        .catch((err: any) => {
          this.$toast.add(
            LoggerService.error("Could not load autocomplete results", err)
          );
        });
    },
  },
  watch: {
    // whenever question changes, this function will run
    searchString(newSearchString, oldearchString) {
      if (newSearchString && newSearchString != "") {
       this.fetchAutocomplete();
      }
    },
  },
});
</script>



<style scoped>

.search-logo {
  width: 100px;
  height: auto;
}

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
  padding: 1rem 0;
  /* height: calc(100vh - 1rem); */
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  background-color: #ffffff; /* Grey f8f9fb*/
  /* border: 1px solid #dde1e2; */
}

.page {
  width: 100%;
  height: 100%;
}

.tab-content {
  flex: 0 1 auto;
  display: flex;
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
