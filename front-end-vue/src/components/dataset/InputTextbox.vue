<template>
  <div>
    <!-- <InputText
      :type="type"
      class="p-inputtext-lg w-100"
      :placeholder="placeholder"
      @blur="validateInput"
      v-model="inputValue"
    /> -->
    <input :type="type" class="w-100" :placeholder="placeholder" @blur="handleBlur" v-model="inputValue" :maxlength="maxlength"/>
    
    <div class="message">
      <Message v-if="hasUserInteracted && !validateMinLength" severity="error" :closable="false"
        >The minimum character count is {{ minlength }}</Message
      >

    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "InputTextbox",
  props: ["type", "placeholder", "minlength", "maxlength"],
  methods: {
    handleBlur(): void {
      this.hasUserInteracted = true;
    },  
  },
  data() {
    return {
      inputValue: "",
      hasUserInteracted: false,
    };
  },
  computed: {
    validateMinLength(): boolean {
       if (this.minlength) {
          return this.inputValue.trim().length >= this.minlength;    
      } else {
        return true;
      } 
    }
  }
});
</script>



<style scoped>

input {
  font-size: 1.25rem;
    padding: 0.625rem 0.625rem; /*for large size */
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    font-size: 1rem;
    color: #495057;
    background: #ffffff;
    /* padding: 0.5rem 0.5rem; */ /*for default size */
    border: 1px solid #ced4da;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    border-radius: 3px;

    

}

input:hover {
    border-color: #2196F3;
}

input:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #a6d5fa;
    border-color: #2196F3;
}

.w-100 {
  width: 100%;
}

.non-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}


</style>
