<template>
  <div class="select-quiz">
    <h3 class="select-quiz__title">Choose a Game</h3>
      <ul class="select-quiz__list">
        <select-quiz 
          v-for="quiz in quizzes"
          v-bind:key="quiz.id"
          v-bind:pkey="quiz.id"
          v-bind:title="quiz.title"
        ></select-quiz>
      </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
import axios from 'axios';
import { APISettings } from '../config';
import SelectQuiz from '../components/SelectQuiz.vue'

export default {
  name: 'Getquizzes',
 
  components: {
    'select-quiz' : SelectQuiz
  },
  props: {
    id: 0,
  },
  setup (props) {
    const store = useStore()
    const quizzes = ref([])
    const axiosError = ref('')
    const quizId = props.id
    axios.get(`${APISettings.baseURL}?action=quizzes`)
      .then( function( response ) {
        quizzes.value = response.data
      }.bind(this))
      .catch( function( error ){
        axiosError.value = error;
      }.bind(this));
      
    return {
      current_quiz: computed(() => store.state.selected_quiz),
      quizzes,
      axiosError
    }
  }
}
</script>