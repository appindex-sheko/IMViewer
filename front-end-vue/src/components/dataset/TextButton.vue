<template>
  <div :class="['text-button', 'non-selectable', 'p-d-flex', 'p-jc-center', 'p-ai-center', (color == 'primary' ? 'color-primary': (color == 'warning' ? 'color-warning': (color == 'danger' ? 'color-danger' : '')))]">
    <div>
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "TextButton",
  props: ["title", "color"],
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
}

.color-primary {
  color: #0d89ec;
}

.color-warning {
  color: #FBC02D;
}

.color-danger {
  color: #D32F2F;
}

</style>
