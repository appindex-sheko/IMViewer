<template>
  <template v-if="results.length > 0">
    <div
      v-for="result in searchResults"
      :key="result.id"
      class="non-selectable transition duration-500 ease-in-out appearance-none rounded-none relative block w-full px-4 py-3 border border-white hover:border-gray-300 focus:border-gray-400 placeholder-gray-400 rounded-md  focus:outline-none focus:z-10 hover:shadow-md my-5"
    >
      <div v-if="result.module == ''">
        <div class="text-sm flex row-col items-center">
          <div class="inline text-xs text-gray-700">
            {{ urlDomain(result.url) + "/" }}
          </div>
          <div class="inline text-xs text-gray-400">
            {{ urlParams(result.url) }}
          </div>
        </div>
      </div>

      <div v-else>
        <div class="text-sm flex row-col items-center">
          <div class="inline text-xs text-gray-900">
            {{ urlDomain(result.url) + "/" }}
          </div>
          <div class="inline text-xs text-gray-400">
            {{ urlParams(result.url) }}
          </div>
        </div>

        <!-- <div class="text-sm flex row-col items-center">
          <TailwindIcon class="mr-2" strokewidth="1.5" width="16" height="16"  :icon="result.icon" />
          <div class="inline text-xs text-gray-700">
            {{ result.module }}
          </div>
        </div> -->
      </div>



      <div class="text-2xl text-blue-500 font-semibold">
        {{ result.title }}
      </div>
      <div class="text-lg text-gray-900">
        {{ result.description }}
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import TailwindIcon from "@/components/search/TailwindIcon.vue";

export default defineComponent({
  name: "SearchResults",
  //components: {TailwindIcon},
  props: ["results", "searchstring"],
  data() {
    return {
      searchResults: this.results,
    };
  },
  methods: {
    urlDomain(url: string): string {
      return url
        .split("/")
        .slice(0, 3)
        .join("/");
    },
    urlParams(url: string): string {
      return url
        .split("/")
        .slice(4, 100)
        .join(" > ");
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
