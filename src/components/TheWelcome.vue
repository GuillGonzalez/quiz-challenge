<template>
  <div class="flex justify-center align-center flex-col">
    <h1 class="text-3xl font-bold">Technical Task</h1>
    <h2 class="text-lg">Please, enter your name and choose a quiz</h2>
    <enter-name @onNameBlur="onNameBlur" />
    <get-quizzes v-show="showQuiz"/>
    <button 
     @click="start"
     class="btn">Start
    </button>
    <p 
      class="alert-inline"
      v-show="alertQuiz"
      >Please choose a quiz</p>
  </div>
</template>

<script>
import GetQuizzes from '../components/GetQuizzes.vue'
import EnterName from '../components/EnterName.vue'
import { defineComponent } from "vue";
import { computed } from 'vue'
import { useStore } from 'vuex'
import store from '../store/store.js'

export default defineComponent ({
  name: 'Start',
  components: {
    'get-quizzes': GetQuizzes,
    'enter-name': EnterName
  },
  setup() {
    const store = useStore()
  }
  ,
  methods: {
    onNameBlur() {
      if (store.state.player_name.length > 0) {
        this.showQuiz = true
      }
    },
    start() {
      if (store.state.player_name.length ==  0) {
        this.hasName = true
        return
      }
      if (store.state.selected_quiz == 0) {
        this.alertQuiz = true
        return
      }
      this.$router.push('questions')
    }
  },
  data() {
    let hasName = false
    let hasQuiz = false
    let showQuiz = false
    let alertQuiz = false
    return {
      player_name: computed(() => store.state.player_name),
      hasName,
      alertQuiz,
      showQuiz,
      alertQuiz
    }
  }
})
</script>