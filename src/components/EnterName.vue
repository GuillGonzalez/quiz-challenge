<template>
  <form class="form-enter-name">
    <input 
      v-model="player_name"
      type="text"
      name="playerName"
      placeholder="Your Name"
      @focusout="onBlur"
      class="form-enter-name__input"/>
    <label 
     class="form-enter-name__label"
     v-show="alert"
     for="playerName">You need to enter a name
     </label>
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import store from '../store/store.js'
import { defineComponent } from "vue";

export default defineComponent ({
  'name': 'EnterName',
  setup() {
    const store = useStore();
    alert = false
  },
  emits: ['onNameBlur'],
  data() {
    return {
      alert,
      player_name: computed(() => store.state.player_name)
    }
  },
  methods: {
    onBlur(_e) {
      store.commit('set_player_name', _e.target.value)
      this.$emit('onNameBlur');
      if (_e.target.value.length > 0) {
        this.alert = false
      } else {
        this.alert = true
      }  
    }
  }
})

</script>
