<template>
  <div class="text-button non-selectable p-d-flex p-jc-center p-ai-center">
    <div>
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "TextButton",
  props: ["title"],
});
</script>

<style scoped>
.non-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}

div.text-button {
  padding-left: 10px;
  padding-right: 10px;
  color: #0d89ec;
}


</style>
