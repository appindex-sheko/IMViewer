<template>
  <div class="p-pt-3">
    <!-- Section: ODS Code  -->

    <InputSection>
      <template v-slot:left>
        <InputDescription :description="inputMeta.odsCode" />
      </template>
      <template v-slot:right>
        <InputTextbox
          class="w-dynamic"
          type="text"
          :placeholder="inputMeta.odsCode.placeholder"
          maxlength="10"
        />
      </template>
    </InputSection>

    <!-- / Section: ODS Code  -->

    <!-- Section: Organisation Type  -->

    <InputSection>
      <template v-slot:left>
        <InputDescription :description="inputMeta.organisationType" />
      </template>
      <template v-slot:right>
        <MultiSelect
          class="w-dynamic"
          v-model="selectedOrganisationTypes"
          :options="organisationTypes"
          optionLabel="brand"
          :placeholder="inputMeta.organisationType.placeholder"
          display="chip"
        />
      </template>
    </InputSection>

    <!-- / Section: Organisation Type  -->
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import InputSection from "@/components/dataset/InputSection.vue";
import InputDescription from "@/components/dataset/InputDescription.vue";
import InputTextbox from "@/components/dataset/InputTextbox.vue";
import InputRadioButtons from "@/components/dataset/InputRadioButtons.vue";
import OrganisationTable from "@/components/dataset/OrganisationTable.vue";
import MultiSelect from "primevue/multiselect";

export default defineComponent({
  name: "OrganisationSearch",
  props: ["prop"],
  components: {
    InputSection,
    InputDescription,
    InputTextbox,
    // InputRadioButtons,
    // OrganisationTable,
    MultiSelect,
  },
  data() {
    return {
      activePage: 1,
      totalPageCount: 2,
      showNewListDialog: false,
      selectedOrganisationTypes: [] as any,
      inputMeta: {
        odsCode: {
          title: "ODS Code",
          explanation:
            "Filter organisations by ODS Code. Use * for wildcard. <br><br> For Example: <br> 'A8*' matches any ODS code starting with 'A8' ",
          placeholder: "Code, use * for wildcard",
        },
        organisationType: {
          title: "Organisation Type",
          explanation:
            "Filter organisations by Type. <br><br> For example: <br> General Practices or Hospital Services",
          placeholder: "Select Organisation Types",
        },
      },
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

.w-dynamic {
  width: 100%;
  max-width: 500px;
}
</style>
