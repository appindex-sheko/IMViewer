<template>
  <!-- General UI -->
  <SideNav />
  <ConfirmDialog></ConfirmDialog>
  <!-- /General UI -->

  <!-- Content Wrapper -->
  <main id="query-main-container">

    <!-- Tab: Home -->
    <div id="home-tab" v-if="activeTab == 'home'" class="content-container">

      <!-- Header -->

      <!-- Folder Path  -->
      <Breadcrumb id="folder-path" :home="bcHomeItem" :model="bcItems" />
      <!-- /Folder Path  -->

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
            v-if="selectedItems.length != 0"
            icon="pi pi-pencil "
            class="p-mr-3 p-button-warning button-medium"
            type="button"
            label="Edit"
            @click="editSelected"
          />
          <Button
            v-if="selectedItems.length != 0"
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
            class="p-button-success button-medium p-mr-3"
            @click="importSelected"
          />
          <Button
            label="Export"
            icon="pi pi-upload"
            class="p-button-help button-medium"
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

      <!-- /Header -->


<!-- Content  -->

<QueryTable id="query-table" :tableheight="tableHeight"> </QueryTable>


<!-- /Content  -->


    </div>
    <!-- /Tab: Home -->

    <!-- Tab: New Query -->
    <div id="new-query-tab" v-if="activeTab == 'new-query'" class="content-container">
      
      <!-- Header -->
          <div class="button-toolbar p-d-flex p-jc-between p-ai-center">
       
        <div class="p-d-inline"> 
          
        </div>

        <div class="title p-d-inline"> 
          {{pageTitle}}
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

import Breadcrumb from "primevue/breadcrumb";
import OverlayPanel from "primevue/overlaypanel";
import Dialog from "primevue/dialog";
import QueryTable from "@/components/querybuilder/QueryTable.vue";

export default defineComponent({
  name: "Query",
  components: {
    SideNav,
    ConfirmDialog,
    Breadcrumb,
    OverlayPanel,
    QueryTable
  },
  $refs: {
    OverlayPanel: HTMLElement,
  },
  data() {
    return {
      activeTab: "home",
      pageTitle: "New Query",
      tableHeight: 600,
      selectedItems: [],
      bcHomeItem: { icon: "pi pi-home", to: "/Query/" },
      bcItems: [{ label: "QOF" }, { label: "Diabetes" }],
      displayNewQuery: false,
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
      this.activeTab = "new-query";
      this.pageTitle = "New Query";

    },
    handleSave(): void {
      this.activeTab = "home";
    },
  },
});
</script>

<style scoped>
#query-main-container {
  margin: 0.5rem;
  padding: 2rem;
  height: calc(100vh - 1rem);
  width: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}

.content-container {
  width: 100%;
  height: 100%;

}

#query-table{
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
