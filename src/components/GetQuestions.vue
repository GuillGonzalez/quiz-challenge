<template>
  <div class="quiz__questions">
    <item-question 
      v-for="(item, key) in questions"
      v-bind:key="item.id"
      v-bind:questionId="item.id"
      v-bind:title="item.title"
      v-bind:quizId="quizId"
      v-show="currentQuestion === key"
    ></item-question>

    <nav class="quiz__questions__nav">
    <button 
      class="btn"
      :disabled="currentQuestion == 0"
      @click="decrement">
        <i class="fa-solid fa-chevron-left"></i> Back
    </button>
    
    <button
      class="btn"
      @click="increment"
      v-show="questions.length != currentQuestion + 1"> 
        Next <i class="fa-solid fa-chevron-right"></i>
    </button>

      <button 
        class="btn quiz__questions__btn-results"
        v-show="currentQuestion == questions.length -1"
        @click="navigateToResults()">Show Results</button>
    </nav>
    <progress-bar
      :progress="progress"
    ></progress-bar>
    <p class="quiz__questions-progress">
      {{ currentQuestion + 1}} of {{ questions.length }}
    </p>

  </div>
</template>

<script>
import axios from 'axios';
import Question from './Question.vue';
import { APISettings } from '../config';
import { ref } from 'vue'
import ProgressBar from './ProgressBar.vue';

export default {
  setup (props) {
    const questions = ref([])
    const axiosError = ref('')
    const progress = ref({'cur': 0})
    axios.get(APISettings.baseURL + '?action=questions&quizId=' + props.quizId)
      .then( function( response ){
        questions.value = response.data;
      }.bind(this))
      .catch( function( error ){
        axiosError.value = error;
    }.bind(this));
    return {
      axiosError,
      questions,
      progress
    }
  },
  data() {
    return {
      axiosError: '',
      currentQuestion: 0,
    }
  },
  props: {
    quizId: 0
  },
  components: {
    'item-question': Question,
     'progress-bar': ProgressBar,
  },
  methods: {
    increment() {
      ++this.currentQuestion > (this.questions.length-1)
      ? this.currentQuestion = (this.questions.length-1)
      : this.currentQuestion;
      this.progress.cur = 100 * this.currentQuestion / (this.questions.length-1); 
    },
    decrement() {
      --this.currentQuestion < 0
      ? this.currentQuestion = 0
      : this.currentQuestion
      this.progress.cur = 100 * this.currentQuestion / (this.questions.length-1);
    },
    navigateToResults() {
      this.$router.push('results')
    }
  }
}

</script>