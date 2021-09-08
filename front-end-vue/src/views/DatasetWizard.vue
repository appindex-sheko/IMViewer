<template>
  <!-- General UI -->
  <SideNav />
  <ConfirmDialog></ConfirmDialog>
  <!-- /General UI -->

  <!-- Main Content Wrapper -->
  <div id="main-container">
    <!-- Header -->
    <header class="p-d-flex">
      <Stepper :activeIndex="activePage - 1" :items="stepperItems" />
      <!-- <div class="p-d-flex p-flex-column p-jc-center p-ai-center">
        <Button
          label="Save"
          icon="pi pi-save"
          class="p-button-primary p-button-outlined button-medium"
          @click="handleSave"
        />
      </div> -->
    </header>
    <!-- /Header -->

    <main>
      <!-- Step 1 -->
      <div id="step1" v-if="activePage == 1" class="page">
        <InputSection>
          <template v-slot:left>
              <InputDescription :description="inputMeta.name"/>
          </template>
          <template v-slot:right>
            <InputTextbox class="w-dynamic" type="text" :placeholder="inputMeta.name.placeholder"  maxlength="35" />
          </template>
        </InputSection>
      </div>
      <!-- /Step 1-->

      <!-- Step 2 -->
      <div id="step2" v-if="activePage == 2" class="page">
        step 2
      </div>
      <!-- /Step 2-->

      <!-- Footer  -->
      <footer class="p-d-flex p-jc-between">
        <Button
          label="Back"
          icon="pi pi-chevron-left"
          class="p-button-primary p-button-outlined button-medium"
          @click="handleBack"
        />
        <Button
          label="Next"
          icon="pi pi-chevron-right"
          class="p-button-primary  button-medium"
          @click="handleNext"
        />
      </footer>

      <!-- Footer  -->
    </main>
  </div>
  <!-- /Main Content Wrapper -->
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import SideNav from "@/components/home/SideNav.vue";
import ConfirmDialog from "primevue/confirmdialog";
import Stepper from "@/components/dataset/Stepper.vue";
import InputSection from "@/components/dataset/InputSection.vue";
import InputDescription from "@/components/dataset/InputDescription.vue";
import InputTextbox from "@/components/dataset/InputTextbox.vue";

export default defineComponent({
  name: "DatasetWizard",
  components: {
    SideNav,
    ConfirmDialog,
    Stepper,
    InputSection,
    InputDescription,
    InputTextbox,
  },
  data() {
    return {
      activePage: 1,
      stepperItems: [
        {
          label: "Details",
        },
        {
          label: "Data Sources",
        },
        {
          label: "Dataset",
        },
        {
          label: "Sharing",
        },
      ],
      inputMeta: {
        name: {
          title: "Name",
          explanation: "Label your dataset with a short name that is memorable and helps you recognise it later. <br><br> For example: <br> • QOF BP002 2021<br>• ABG Audit 2019",
          placeholder: "Enter a Name",
        }
      },
      // validationFunctions: {
      //   name: function(value: any) :any{
      //     return true;
      //   }
      // }  
    };
  },
});
</script>

<style scoped>
.non-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

#main-container {
  margin: 0.5rem;
  padding: 1rem 2rem;
  height: calc(100vh - 1rem);
  width: 100%;
  overflow-y: auto;
  background-color: #f8f9fb;
  border: 1px solid #dde1e2;
}

#main-container::-webkit-scrollbar {
  width: 10px;
}

#main-container::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  /* outline: 1px solid slategrey; */
}

main {
  position: relative;
  max-width: 1160px;
  /* padding: 0 10px; */
  margin: 0 auto;
}


div.page {
  width: 100%;
  padding-top: 30px;
}



footer {
  margin-top: 20px;
}

.button-medium::v-deep * {
  font-size: 16px;
}

.w-dynamic {
  width: 100%;
  max-width: 500px;
}

</style>
