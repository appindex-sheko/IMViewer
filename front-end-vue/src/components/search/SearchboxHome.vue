<template>
  <form class="" action="" method="">
    <input
      id="searchbox-home"
      class="transition duration-200 ease-in-out appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md hover:shadow-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 focus:shadow-md"
      placeholder="Type to Search"
    />
  </form>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "SearchboxHome",
  props: ["type", "placeholder", "minlength", "maxlength"],
  data() {
    return {
      inputValue: "",
      hasUserInteracted: false,
      autoSuggest: [
        {
          id: 0,
          searchString: "Example 1"
        },
        {
          id: 1,
          searchString: "Example 2"
        },
        {
          id: 2,
          searchString: "Example 3"
        }
      ]
    };
  },
  methods: {
    handleBlur(): void {
      this.hasUserInteracted = true;
    },
  },
  computed: {
    validateMinLength(): boolean {
      if (this.minlength) {
        return this.inputValue.trim().length >= this.minlength;
      } else {
        return true;
      }
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


</style>
