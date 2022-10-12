<template>
	<div class="col-12">
		<img class="img-fluid" src="..assets/img/GetAheadOf.png" alt="" />
	</div>
	<div class="d-flex justify-content-around">
		<button @click="getEventsByType('')" class="btn btn-outline-dark">
			All
		</button>
		<button @click="getEventsByType('concert')" class="btn btn-outline-dark">
			Concert
		</button>
		<button @click="getEventsByType('convention')" class="btn btn-outline-dark">
			Convention
		</button>
		<button @click="getEventsByType('sport')" class="btn btn-outline-dark">
			Sport
		</button>
		<button @click="getEventsByType('digital')" class="btn btn-outline-dark">
			Digital
		</button>
	</div>
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
			towerEvent: computed(() => AppState.towerEvent),
			async getEventsByType(type) {
				try {
					await towerEventService.getEvents(type)
				} catch (error) {
					Pop.error(error, '[Get events by type]')
				}
			}
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
