<template>
  <div>
  <div class="progress-bar">
    <div 
      id="progressBarFill"
      class="progress-bar-fill"
      :style="{ width: progress.cur +'%'} "
    ></div>
  </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: ['progress'],
  setup (props) {
    let progress = props.progress
    return {
      progress
    }
  },
  compute: {
    current(_progress){
      return _progress.cur
    }
  }
}

</script>