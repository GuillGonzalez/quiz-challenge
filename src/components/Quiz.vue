<template>
  <div class="quiz">
    <get-questions
      v-bind:quizId="selected_quiz"
      ref="questions"
    ></get-questions>
  </div>
  <router-link to="/start">
    <i class="fa-solid fa-arrow-rotate-left"></i>
    Choose another quiz
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import store from '../store/store.js'
import GetQuestions from './GetQuestions.vue'

export default {
  setup () {
    const store = useStore()
  },
  components: {
    'get-questions': GetQuestions
  },
  data () {
    return {
      selected_quiz: computed(() => store.state.selected_quiz)
    }
  },
  methods : {
    navigateToStart () {
      this.$router.push('start')
    }
  }
}
</script>