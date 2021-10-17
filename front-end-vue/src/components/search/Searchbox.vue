<template>
  <!-- Wrapper   -->
  <div
    class="searchbox w-full transition duration-500 ease-in-out appearance-none rounded-none border border-gray-200 relative rounded-md focus:z-10 focus:border-gray-200"
  >
    <!-- Searchbox  -->
    <div class="">
      <input
        type="text"
        class="relative transition duration-500 ease-in-out w-full px-4 py-3 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:shadowwlg hover:shadowwlg "
        placeholder="Type to Search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <!-- / Searchbox  -->

    <!-- Autocomplete  -->
    <div
      v-if="filteredHits() && modelValue != ''"
      class="autocomplete w-full rounded-t-none rounded-b-md  border border-gray-200 hover:border-gray-200 non-selectable shadowwlg"
    >
      <div
        v-for="item in filteredHits().hits"
        :key="item.id"
        class="transition duration-500 ease-in-out appearance-none relative w-full px-4 py-3 text-gray-400 font-medium hover:text-gray-900 hover:bg-gray-100 focus:z-10"
        v-html="item._formatted.searchString"
      ></div>
    </div>
    <!-- / Autocomplete -->
  </div>
  <!-- Wrapper   -->
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "Searchbox",
  props: ["modelValue", "autocompleteData"],
  emits: ["update:modelValue"],
  data() {
    return {
      exampleAutocompleteHits: [
        {
          id: 0,
          searchString: "Heart rate",
        },
        {
          id: 1,
          searchString: "Heart rate in patients with chronic heart failure",
        },
        {
          id: 2,
          searchString:
            "Heart rate and blood glucose for patients with diabetes",
        },
      ],
      initialAutocompleteData: this.autocompleteData,
      autocompleteHits: [],
      autocompleteVisible: false,
      componentState: "default", // Options #"default", #"hovered", #"Focus",
    };
  },
  methods: {
    filteredHits(): any {
      /* Todo: instead of overriding <em> globally use _matchedInfo property to highlight text  */
      if (this.autocompleteData && this.autocompleteData.hits.length > 0) {
        return this.autocompleteData;
      }
    },
  },
});
</script>

<style>
/* Perhaps not best to override em */

em {
  font-style: normal !important;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
}


</style>

<style scoped>
.non-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

.searchbox,
.autocomplete {
  font-size: 16px !important;
}

.autocomplete {
  position: absolute;
  background: #fff;
  margin-top: -3px;
  margin-left: -1px;
  width: calc(100% + 2px);
  z-index: 989;
  cursor: default;
  border-bottom: 1px solid rgb(207, 210, 218);
  border-left: 1px solid rgb(207, 210, 218);
  border-right: 1px solid rgb(207, 210, 218);
}

.searchbox:hover,
.searchbox input:focus,
.searchbox:focus {
 border-color: rgb(207, 210, 218);
  box-shadow: rgb(207, 210, 218) 0px 0px 6px;
}

.autocomplete {
  border-color: rgb(207, 210, 218);
  box-shadow: rgb(207, 210, 218) 0px 2px 6px;
}
</style>
