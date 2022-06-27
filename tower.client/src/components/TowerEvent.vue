<template>
  <div class="col-3">
    <div class="card m-3 bg-light text-dark tall">
      <div
        class="card-body"
        @click.stop="goToEventDetails"
        :style="`background-image: url(${towerEvent.coverImg})`"
      >
        <div class="row">
          <div
            class="col-6 fw-bold text-danger text-center"
            v-if="towerEvent.capacity == 0"
          >
            Sold Out
          </div>
          <div
            class="col-6 fw-bold text-danger text-center"
            v-if="towerEvent.isCanceled"
          >
            Cancelled
          </div>
        </div>
        <div class="row justify-content-end special-card align-items-end">
          <div class="card d-flex flex-column align-items-center">
            <div class="text-uppercase">
              {{ towerEvent.name }}
            </div>
            <div>{{ formatDate(towerEvent.startDate) }}</div>
            <div>
              Capacity:
              <span class="text-black fw-bolder">{{
                towerEvent.capacity
              }}</span>
            </div>
            <div>Location: {{ towerEvent.location }}</div>
            <div v-if="towerEvent.creator.id == account.id">
              Need to cancel?
              <button @click.prevent="deleteEvent" class="btn selectable">
                <i class="mdi mdi-cancel text-danger"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { towerEventService } from '../services/TowerEventService';
export default {
  props: { towerEvent: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      goToEventDetails() {
        router.push({
          name: "EventDetails",
          params: { id: props.towerEvent.id },
        });
      },
      async deleteEvent() {
        try {
          await towerEventService.deleteEvent(props.towerEvent.id)
          Pop.toast('Event has been cancelled', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      formatDate(rawDate) {
        return new Date(rawDate).toLocaleDateString();
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.special-card {
  background-color: rgba(245, 245, 245, 1);
  opacity: 0.4;
  font-weight: 900;
}

.tall {
  height: 400px;
  width: 100%;
}
</style>