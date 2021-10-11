<template>
  <div id="tab-buttons" class="font-bold shadow-sm">
    <template v-for="item in items">
      <div
        v-if="item.visible"
        :key="item.index"
        :class="[
          'tab-button non-selectable inline-flex flex-row items-center justify-center transition duration-600 ease-in-out text-gray-600 hover:text-blue-500 ',
          { active: activeItemIndex == item.index },
        ]"
        @click="activeItemIndex = item.index"
      >
        <!-- Icon -->
        <div class="inline-flex mr-2">
          <TailwindIcon  strokewidth="2" width="24" height="24"  :icon="item.icon" />
        </div>

        <!-- / Icon -->

        <div class="inline-flex text-base">
          <div>{{ item.name }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import TailwindIcon from "@/components/search/TailwindIcon.vue";

export default defineComponent({
  name: "HorizontalNavbar",
  props: ["items"],
  components: {
    TailwindIcon,
  },
  data() {
    return {
      activeItemIndex: 0,
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

#tab-buttons {
  width: 100%;
  margin-top: 30px;
  padding-bottom: 5px;
  text-align: center;
  border-bottom: solid 2px #dde1e2;
}

.tab-button {
  font-size: 16px;
  padding: 0 10px 8px 10px;
  margin: 0 20px -20px 0;
  border-bottom: solid 3px transparent;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom: solid 3px #3b82f6;
}

</style>
