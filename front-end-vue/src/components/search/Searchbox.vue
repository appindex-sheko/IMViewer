<template>
  <template v-if="modelValue == '' || autoSuggest.length == 0">
    <div class="w-full">
      <input
        type="text"
        class="searchbox transition duration-500 ease-in-out appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md hover:shadow-md focus:outline-none focus:z-10 focus:shadow-md focus:border-gray-400 "
        placeholder="Type to Search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  <template v-else>
    <div>
      <input
        type="text"
        class="searchbox transition duration-500 ease-in-out appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md hover:shadow-md focus:outline-none focus:z-10 focus:shadow-md focus:border-gray-400 "
        placeholder="Type to Search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "Searchbox",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      autoSuggest: [
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
    };
  },
});
</script>

<style scoped>
.searchbox {
  font-size: 16px !important;
}
</style>
