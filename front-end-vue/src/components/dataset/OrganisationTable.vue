<template>
  <div class="table" :style="{ height: tableheight + 'px' }">
    <div class="table-header p-d-flex">
      <div class="table-data name">
        Name
      </div>
      <div class="table-data ods">
        ODS
      </div>
      <div class="table-data type">
        Type
      </div>
    </div>

    <div
      v-for="(list, listIndex) in lists"
      :key="listIndex"
      class="table-section"
    >
      <div class="table-section-header p-d-flex p-jc-between">
        <div class="p-d-flex">
          <div
            class="section-toggler non-selectable p-d-flex p-jc-center p-ai-center"
            @click="toggleTableSection(listIndex)"
            v-tooltip.bottom="list.title"
          >
            <font-awesome-icon
              style="margin-right: 10px"
              :icon="
                expandedTableSections.includes(listIndex)
                  ? 'chevron-down'
                  : 'chevron-up'
              "
            />
            <div>
              List
            </div>
          </div>
          <FilterChip
            v-if="list.organisationTypes.length > 0"
            title="Organisation Types"
            :totalCount="list.organisationTypes.length"
            v-tooltip.bottom="
             list.organisationTypes.map((org) => orgTypeCodeToName(org)).join('<br>')              
            "
            
          />
          <FilterChip
            v-if="list.ccgs.length > 0"
            title="CCGs"
            :totalCount="list.ccgs.length"
            v-tooltip.bottom="
              ccgDataLoaded && list.ccgs.map((ccg) => ccgODSCodeToName(ccg)).join('<br>')
            "
          />
          <FilterChip
            v-if="list.postcodes.length > 0"
            title="Postcodes"
            :totalCount="list.postcodes.length"
            v-tooltip.bottom="list.postcodes.join('<br>')"
          />
        </div>
        <TextButton class="p-mr-3" title="Edit" />
      </div>
      <div
        v-show="expandedTableSections.includes(listIndex)"
        class="table-section-body"
      >
        <div class="table-row p-d-flex">
          <div class="table-data name">
            Name
          </div>
          <div class="table-data ods">
            ODS
          </div>
          <div class="table-data type">
            Type
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DatasetService from "@/services/DatasetService";
import LoggerService from "@/services/LoggerService";
import FilterChip from "@/components/dataset/FilterChip.vue";
import TextButton from "@/components/dataset/TextButton.vue";

export default defineComponent({
  name: "OrganisationTable",
  props: ["tableheight", "lists"],
  components: {
    FilterChip,
    TextButton,
  },
  data() {
    return {
      organisationData: [] as any,
      ccgData: [] as any,
      expandedTableSections: [] as any,
      orgDataLoaded: false,
      ccgDataLoaded: false,
    };
  },
  async created() {
    this.fetchOrganisationData();
    this.fetchCCGData();    
  },
  methods: {
    async fetchOrganisationData(): Promise<void> {
      await DatasetService.getOrganisations()
        .then((res) => {
          this.organisationData = JSON.parse(res).organisationData;
          this.orgDataLoaded = true;
          console.log(this.organisationData);
        })
        .catch((err) => {
          this.$toast.add(
            LoggerService.error("Failed to fetch table data", err)
          );
        });
    },
    async fetchCCGData(): Promise<void> {
      await DatasetService.getCCGs()
        .then((res) => {
          this.ccgData = JSON.parse(res).ccgData;
          this.ccgDataLoaded = true;
          console.log(this.ccgData);
        })
        .catch((err) => {
          this.$toast.add(
            LoggerService.error("Failed to fetch table data", err)
          );
        });
    },
    toggleTableSection(index: number): void {
      if (this.expandedTableSections.includes(index)) {
        this.expandedTableSections = this.expandedTableSections.filter(function(
          value: any
        ) {
          return value !== index;
        });
      } else {
        this.expandedTableSections = [...this.expandedTableSections, index];
      }
    },
    orgTypeCodeToName(typeCode: number): string {
      switch (typeCode) {
        case 0:
          return "Other";
        case 1:
          return "WIC Practice";
        case 2:
          return "OOH Practice";
        case 3:
          return "WIC + OOH Practice";
        case 4:
          return "GP Practice";
        case 8:
          return "Public Health Service";
        case 9:
          return "= Community Health Service";
        case 10:
          return "Hospital Service";
        case 11:
          return "Optometry Service";
        case 12:
          return "Urgent & Emergency Care";
        case 13:
          return "Hospice";
        case 14:
          return "Care Home / Nursing Home";
        case 15:
          return "Border Force";
        case 16:
          return "Young Offender Institution";
        case 17:
          return "Secure Training Centre";
        case 18:
          return "Secure Children's Home";
        case 19:
          return "Immigration Removal Centre";
        case 20:
          return "Court";
        case 21:
          return "Police Custody";
        case 22:
          return "Sexual Assault Referral Centre";
        case 24:
          return "Other – Justice Estate";
        case 25:
          return "Prison";
        default:
          return "Other";
      }
    },
    ccgODSCodeToName(ODSCode: string): any {
      return this.ccgData.find((ccg: any) => ccg.ODSCode == ODSCode).Name;
    },
  },
  computed: {
    filteredListItems(index: number): any {
      //var filteredItems = this.organisationData;
      console.log(this.lists[index]);

      //filter CCGs
      // if (this.lists[index].ccgs.length > 0) {
      //   console.log("CCGs present");
      //   filteredItems = filteredItems.filter((organisation: any) =>
      //     this.lists[index].ccgs.includes(organisation.Commissioner)
      //   );
      // }
      // return filteredItems;
      return true;
    },
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

div.table {
  overflow-y: auto;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #fff;
}

div.table::v-deep * {
  font-size: 16px !important;
}

div.table::-webkit-scrollbar {
  width: 10px;
}

div.table::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
}
div.table > * {
  overflow-y: auto;
}

.table-header {
  background-color: #f3f3f3;
}

.table-header,
.table-row {
  border-bottom: 1px solid #ced4da;
}

.table-header {
  padding: 15px 10px;
}

.table-row,
.table-section-header {
  padding: 10px;
  background: #fff;
}

.section-toggler,
.table-header .table-data.name,
.table-header .table-data.ods,
.table-header .table-data.type {
  font-weight: bold;
}

.table-data.name {
  width: 60%;
}
.table-data.ods {
  width: 10%;
}
.table-data.type {
  width: 30%;
}

.section-toggler {
  padding: 5px 20px;
  border-radius: 3px;
}

.section-toggler:hover {
  background-color: #f3f3f3;
}

/* .table-section-header:hover {
  box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
    0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  border: solid 0.1px #acacad;
} */
</style>
