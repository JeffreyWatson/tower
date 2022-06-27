<template>
  <div class="row">
    <TowerEvent v-for="t in towerEvent" :key="t.id" :towerEvent="t" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventService } from '../services/TowerEventService'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await towerEventService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    });
    return {
      towerEvent: computed(() => AppState.towerEvent)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
