<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-12"
        :style="`background-image: url(${activeEvent.coverImg})`"
      ></div>
      <div>{{ activeEvent.name }}</div>
      <div>{{ activeEvent.description }}</div>
      <div>{{ activeEvent.location }}</div>
      <div>{{ activeEvent.Capacity }}</div>
      <div>{{ formatDate(activeEvent.startDate) }}</div>
      <div>{{ activeEvent.type }}</div>
      <div v-if="activeEvent.isCanceled">Cancelled</div>
      <Comment />
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { towerEventService } from '../services/TowerEventService';
import { AppState } from '../AppState';
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await towerEventService.getEvent(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      activeEvent: computed(() => AppState.activeEvent),
      formatDate(rawDate) {
        return new Date(rawDate).toLocaleDateString();
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>