<template>
  <div class="row">
    <div
      class="col-6"
      :style="`background-image: url(${towerEvent.coverImg})`"
    ></div>
    <div class="col-6"></div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvent),
    }
  }
}

</script>


<style lang="scss" scoped>
</style>