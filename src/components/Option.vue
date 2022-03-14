<template>
  <li
    :class="{ active: isActive }"
    class="quiz__questions__options__item">
      <input type="radio" name="answer" v-bind:id="pkey">
      <label
         class="quiz__questions__options__item-label"
         v-bind:for="pkey">
         {{ title }}
      </label>
  </li>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Option',
  props: {
    title: '',
    pkey: 0,
    answer: 0,
  },
  data () {
    const isActive = ref(false)
    return {
      isActive: false
    }
  }
}

</script>