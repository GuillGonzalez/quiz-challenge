<template>
  <ul class="quiz__questions__options">
    <question-option
      v-for="option in questionOptions"
      v-bind:key="option.id"
      v-bind:answer="option.id"
      v-bind:title="option.title"
      v-bind:pkey="option.id"
      @click="selectAnswer(quizId, option.id)"
    ></question-option>
  </ul>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
import { APISettings } from '../config';
import Option from './Option.vue'
import store from '../store/store.js'
import { useStore } from 'vuex';

export default {
  name: 'QuestionOptions',
  props: {
    questionId: 0,
    quizId: 0
  },
  components: {
    'question-option': Option
  },
  setup (props) {
    const store = useStore()
    const questionOptions = ref([])
    const axiosError = ref('')
    axios.get(`${APISettings.baseURL}?action=answers&quizId=${props.quizId}&questionId=${props.questionId}`)
      .then( function( response ) {
        questionOptions.value = response.data
      }.bind(this))
      .catch( function( error ){
        axiosError.value = error;
      }.bind(this));
      
    return {
      questionOptions,
      axiosError,
    }
  },
  methods: {
    selectAnswer(quizId, answerId) {
      store.commit('append_answer', {'quizId': quizId, 'answer': answerId});
    }
  }
}

</script>