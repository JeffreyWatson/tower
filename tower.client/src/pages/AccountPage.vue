<template>
	<div class="about text-center">
		<TowerEvent v-for="m in myEvents" :key="m.id" />
	</div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { towerEventService } from '../services/TowerEventService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
	name: 'Account',
	setup() {
		onMounted(async () => {
			try {
				await towerEventService.getMyTickets()
			} catch (error) {
				logger.error(error)
				Pop.toast(error.message, 'error')
			}
		});
		return {
			account: computed(() => AppState.account),
			tickets: computed(() => AppState.myEvents)
		}
	}
}
</script>

<style scoped>
img {
	max-width: 100px;
}
</style>
