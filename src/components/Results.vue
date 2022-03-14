<template>
  <div class="results">
    <h3 class="results__title" v-show="success <= .25">Oups! Sorry {{ player_name }} 😔</h3>
    <h3 class="results__title" v-show="success > .25 && success < .99">Not that bad, {{ player_name }}</h3>
    <h3 class="results__title" v-show="success == 1">Whoau! Congratulations {{ player_name }}</h3>
    <h3 class="results__description">You have {{ quiz_result.correct }} correct questions from a total of {{ quiz_result.total }}</h3>
    <h2>Choose another quiz</h2>
    <button 
      class="btn"
      @click="navigateToStart()">Go to Start</button>
  </div>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { APISettings } from '../config'

export default {

  setup () {
    const store = useStore()
    const player_name = ref(store.getters.get_player_name)
    const quiz_result = ref('')
    const axiosError = ref('')
    const answers = ref([])
    const success = ref('oli')

    let answers_str = ''
    JSON.parse(JSON.stringify(store.getters.get_answers)).forEach((e)=>{answers_str = answers_str + '&answers[]=' + e.answer})
    
    axios.get(`${APISettings.baseURL}?action=submit&quizId=${store.state.selected_quiz}${answers_str}`)
    .then( function( response ) {
      quiz_result.value = response.data
      success.value = calculin(response.data)
    }.bind(this))
    .catch( function( error ){
      axiosError.value = error;
      success.value = calculin(error)
    }.bind(this));

    const calculin = (e) => {return parseInt(e.correct) / parseInt(e.total)}

    return {
      quiz_result,
      player_name,
      success
    }
  },
  methods: {
    navigateToStart() {
      this.$router.push('start')
    }
  }
}

</script>