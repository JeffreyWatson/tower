<template>
  <div class="row flex-row justify-content-center bg-black rounded m-4">
    <form
      class="col-10 p-3 d-flex flex-column"
      action=""
      @submit.prevent="createEvent"
    >
      <p class="text-center">Create an Event</p>
      <label class="mt-3" for="Name"></label>
      <input
        placeholder="Name of event"
        type="text"
        v-model="towerEventData.name"
      />
      <label class="mt-3" for="description"></label>
      <input
        placeholder="Description"
        type="text"
        v-model="towerEventData.description"
      />
      <label class="mt-3" for="coverImg"></label>
      <input
        placeholder="Post an image"
        type="text"
        v-model="towerEventData.coverImg"
      />
      <label class="mt-3" for="location"></label>
      <input
        placeholder="Location"
        type="text"
        v-model="towerEventData.location"
      />
      <label class="mt-3" for="capacity"></label>
      <input
        placeholder="Capacity"
        type="text"
        v-model="towerEventData.capacity"
      />
      <label class="mt-3" for="startDate"></label>
      <input
        placeholder="Start Date"
        type="text"
        v-model="towerEventData.startDate"
      />
      <label class="mt-3" for="type"></label>
      <input
        placeholder="concert, convention, sport, digital"
        type="text"
        v-model="towerEventData.type"
      />
      <button class="btn btn-success create">create</button>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { towerEventService } from "../services/TowerEventService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRouter } from "vue-router";
export default {
  setup() {
    const towerEventData = ref({});
    const router = useRouter();
    return {
      towerEventData,
      async createEvent() {
        try {
          const newEvent = await towerEventService.createEvent(towerEventData.value);
          router.push({
            name: "EventDetails",
            params: { id: newEvent.id },
          });
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>