<template>
  <!-- General UI -->
  <SideNav />
  <ConfirmDialog></ConfirmDialog>
  <!-- /General UI -->

  <!-- Main Content Wrapper -->
  <main id="main-container">

    <Stepper :activeIndex=activeStepperIndex :items="stepperItems"/>

    <!-- Step 1 -->
    <div
      id="step1"
      v-if="activePage == 'step1'"
      class="content-container"
    ></div>
    <!-- /Step 1-->

    <!-- Step 2 -->
    <div
      id="step2"
      v-if="activePage == 'step2'"
      class="content-container"
    ></div>
    <!-- /Step 12-->

    <!-- /Content  -->

    <!-- /Step 2 -->
  </main>
  <!-- /Main Content Wrapper -->
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import SideNav from "@/components/home/SideNav.vue";
import ConfirmDialog from "primevue/confirmdialog";



import Stepper from "@/components/dataset/Stepper.vue";

export default defineComponent({
  name: "DatasetWizard",
  components: {
    SideNav,
    ConfirmDialog,
    Stepper,
  },
  data() {
    return {
      activePage: "step1",
      pageTitle: "New Query",
      activeStepperIndex: 0,
      stepperItems: [{
                label: 'Details',
            },
            {
                label: 'Data Sources',
            },
            {
                label: 'Dataset',
            },
            {
                label: 'Sharing',
            }]
    };
  },
  created() {
    this.$store.commit("updateSelectedEntityType", "DatasetWizard");
    this.$store.commit("updateSideNavHierarchyFocus", {
      name: "DatasetWizard",
      fullName: "DatasetWizard",
      iri: "http://endhealth.info/im#DatasetWizard",
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
  background-color: #ffffff;
  border: 1px solid #dde1e2;
}

.content-container {
  width: 100%;
  height: 100%;
}

.tab-bar {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: solid 1px #dde1e2;
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

