<template>
  <li 
    :class="{active: isActive}"
    class="select-quiz__list-item">
      <button 
        class="select-quiz__list-item__button"
        @click="loadQuestions(pkey)">
          <span
            class="select-quiz__list-item__button-check-icon"
            v-show="pkey == current_quiz">
              <i class="fa-solid fa-check"></i>
          </span>
        {{ title }}
      </button>
  </li>
</template>

<script>
import { useStore } from 'vuex'
import store from '../store/store.js'
import { ref } from 'vue'
import { computed } from 'vue'

export default {
  name: 'Quiz',
  setup () {
    const store = useStore()
    const selected = ref(false)
    let isActive = false
    return {
      current_quiz: computed(() => store.state.selected_quiz),
      selected,
      isActive
    }
  },
  props: {
    title: '',
    pkey: 0,
  },
  methods: {
    loadQuestions(quizId) {
      this.isActive = !this.isActive;
      store.commit('set_current_quiz', quizId);
      this.selected = true;
      this.$parent.$emit('select');
    }
  }
}
</script>