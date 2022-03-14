<template>
  <form>
    <h3 class="quiz__questions__title">{{ title }}</h3>
    <question-options
      v-bind:quizId="quizId"
      v-bind:questionId="questionId"
    ></question-options>
  </form>
</template>

<script>
  import QuestionOptions from './QuestionOptions.vue'

  export default {
    name: 'Question',
    props: {
      title: '',
      questionId: 0,
      quizId: 0
    },
    components: {
      'question-options': QuestionOptions
    }
  }

</script>