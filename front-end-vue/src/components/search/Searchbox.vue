<template>
  <template v-if="modelValue == '' && autocompleteHits.length == 0">
    <div class="w-full">
      <input
        type="text"
        class="searchbox transition duration-500 ease-in-out appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md hover:shadow-md focus:outline-none focus:z-10 focus:shadow-md focus:border-gray-300 "
        placeholder="Type to Search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  <template v-else>
    <!-- Wrapper   -->
    <div
      class="searchbox w-full relative transition duration-500 ease-in-out appearance-none rounded-none border border-gray-300 shadow-md relative rounded-md hover:shadow-md focus:z-10 focus:shadow-md focus:border-gray-300"
    >
      <!-- Searchbox  -->
      <div>
        <input
          type="text"
          class="relative w-full px-4 py-3 placeholder-gray-400 text-gray-900 font-medium rounded-md  focus:outline-none"
          placeholder="Type to Search"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
      <!-- / Searchbox  -->

      <!-- Autocomplete  -->
      <div
       v-if="autocompleteData && autocompleteData.hits.length > 0"
        class="autocomplete w-full rounded-t-none rounded-b-md  border border-gray-300 hover:border-gray-300 non-selectable shadow-md "
      >
        <div
          v-for="item in autocompleteData.hits"
          :key="item.id"
          class="transition duration-500 ease-in-out appearance-none relative w-full px-4 py-3 text-gray-400 font-medium hover:text-gray-900 hover:bg-gray-100 focus:z-10"
          v-html="item.searchString"
        >      
        
         
        </div>
      </div>
      <!-- / Autocomplete -->
    </div>
    <!-- Wrapper   -->
  </template>
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
  watch: {
    // a computed getter
    initialAutocompleteData(): any {
      // `this` points to the vm instance
      if (this.initialAutocompleteData) {
        // this.autocompleteHits = this.initialAutocompleteData.data.hits;
        console.log("new autocomplete", this.initialAutocompleteData);
      }
    },
  },
  // computed: {
  //   filteredAutocompleteHits(): any {
  //     if (this.autocompleteData) {
  //       return this.initialAutocompleteData;

  //     } else {
  //       return this.exampleAutocompleteHits;
  //     }
  //   }
  // }
});
</script>

<style scoped>
.non-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

.searchbox {
  font-size: 16px !important;
}

.searchbox .autocomplete {
  position: absolute;
  background: #fff;
  margin-top: -3px;
  margin-left: -1px;
  width: calc(100% + 2px);
  z-index: 989;
  cursor: default;
}
</style>
