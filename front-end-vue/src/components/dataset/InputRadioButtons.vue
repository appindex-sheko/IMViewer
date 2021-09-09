<template>
  <ul class="radio-button-list non-selectable">
    <li v-for="item in items" :key="item.id" class="radio-button-list__item">
      <input
        type="radio"
        :value="item.id"
        class="radio-button"
        :checked="selectedItems.includes(item.id)"
        ref="radioButton"
      />
      <label
        class="radio-button__label p-d-flex p-jc-between"
        @click="handleClick(item.id)"
        ref="radioLabel"
      >
        {{ item.title }}
        <div style="margin-left: 5px" v-tooltip="item.explanation">
          <font-awesome-icon icon="question-circle" />
        </div>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "InputRadioButtons",
  props: ["items", "multiselect"],
  $refs: {
    input: HTMLElement,
    label: HTMLElement,
  },
  data() {
    return {
      selectedItems: [0],
    };
  },
  methods: {
    handleClick(id: number): void {
      //if multiselection enabled, add/remove radiobutton id from selectItems
      if (this.multiselect) {
        if (this.selectedItems.includes(id)) {
          this.selectedItems = this.selectedItems.filter(function(value: any) {
            return value !== id;
          });
        } else {
          this.selectedItems = [...this.selectedItems, id];
        }
      } else {
        //if multiselection disabled
        this.selectedItems = [id];
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

ol,
ul {
  list-style: none;
  padding: 0;
}

.radio-button {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.radio-button__label {
  font-size: 16px;
  font-weight: 700;
  padding: 16px 16px 16px 56px;
  border: 1px solid #0d89ec; /*purple #9b6fb6 */
  border-radius: 4px;
  color: #0d89ec; /* purple #554565 */
  width: 100%;
  cursor: pointer;
  position: relative;
  margin: 0 0 10px;
}

.radio-button:checked + .radio-button__label {
  background-color: #edf7ff; /* light purple #f6f3f9 */
  color: #0d89ec; /*purple  #590f85 */
  border: 2px solid #0d89ec; /* purple #590f85*/
}

.radio-button__label,
.radio-button__label:after,
.radio-button__label:before {
  box-sizing: border-box;
  background-color: #fff;
  display: block;
  transition: all 0.2s ease-in-out;
}
.radio-button__label {
  font-size: 16px;
  font-weight: 700;
  padding: 16px 16px 16px 56px;
  border: 1px solid #ced4da; /* purple #9b6fb6 */

  border-radius: 4px;
  color: #112950; /* ligher black #554565 */
  width: 100%;
  cursor: pointer;
  position: relative;
  margin: 0 0 10px;
}

.radio-button:checked + .radio-button__label:before {
  border: 2px solid #0d89ec; /* purple #590f85 */
}

.radio-button__label:before {
  border: 1px solid #ced4da; /*purple  #9b6fb6 */
  height: 24px;
  left: 16px;
  width: 24px;
  transition: border 0.1s ease-in-out;
}

.radio-button__label:after,
.radio-button__label:before {
  border-radius: 50%;
  content: "";
  position: absolute;
  transform-origin: center;
  top: 0;
  bottom: 0;
  margin: auto;
}

.radio-button__label,
.radio-button__label:after,
.radio-button__label:before {
  box-sizing: border-box;
  background-color: #fff;
  display: block;
  transition: all 0.2s ease-in-out;
}

.radio-button:checked + .radio-button__label:after {
  background-color: #0d89ec; /*purple #9237cd */
  transform: scale(0.4);
}

.radio-button__label:after {
  height: 22px;
  left: 17px;
  width: 22px;
}

.radio-button__label:hover:before {
  border: 1px solid #0d89ec !important; /*purple #590f85 */
}

.radio-button__label:hover {
  border: 1px solid #0d89ec;
  background-color: #edf7ff; /*#f6f3f9*/
}
</style>
