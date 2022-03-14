import { createStore } from 'vuex'

const state = {
  count: 0,
  selected_quiz: 0,
  player_name: '',
  answers: []
}

const mutations = {
  select_quiz (state, id) {
    state.selected_quiz = id
  },
  set_current_quiz (state, id) {
    state.selected_quiz = id
  },
  set_player_name (state, name) {
    state.player_name = name.length > 0  ? name : ''
  },
  append_answer (state, answer) {
    state.answers.push(answer)
  },
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  get_answers: state => state.answers,
  get_player_name: state => state.player_name
}

export default createStore({
  state,
  getters,
  mutations
})