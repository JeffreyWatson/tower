<template>
	<div class="container-fluid">
		<div class="row">
			<div class="card d-flex flex-row">
				<div class="col-3 p-3 d-flex flex-column justify-content-center">
					<img
						class="img-fluid"
						:src="activeEvent.coverImg"
						alt="Image of the event"
					/>
				</div>
				<div class="col-9 p-3">
					<div class="d-flex flex-row justify-content-between mb-3">
						{{ activeEvent.name }}
						<span>{{ formatDate(activeEvent.startDate) }}</span>
					</div>
					<div class="d-flex flex-row justify-content-between mb-3">
						{{ activeEvent.location }}
						<span>Capacity: {{ activeEvent.capacity }}</span>
					</div>
					<p class="mb-3">{{ activeEvent.description }}</p>
					<p class="d-flex flex-row justify-content-between">
						<span v-if="activeEvent.isCanceled">Status: Cancelled</span>
						<span v-else>Status: Active</span>
						<span>Event Type: {{ activeEvent.type }}</span>
						<span>Button</span>
					</p>
				</div>
			</div>
			<div class="row mt-2">
				<h6>See who is attending...</h6>
				<div class="d-flex flex-row">
					<Attendees v-for="t in tickets" :key="t.id" :tickets="t" />
				</div>
			</div>
			<form @submit.prevent="createComment">
				<textarea
					name="body"
					id="body"
					cols="30"
					rows="10"
					v-model="commentData.body"
				></textarea>
				<button>Comment</button>
			</form>

			<div class="col-12 d-flex flex-row justify-content-center">
				<Comment v-for="c in comment" :key="c.id" :comment="c" />
			</div>
		</div>
	</div>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { towerEventService } from '../services/TowerEventService';
import { AppState } from '../AppState';
import { commentService } from '../services/CommentService';
import { ticketService } from '../services/TicketService';
export default {
	setup() {
		const route = useRoute();
		const commentData = ref({});
		onMounted(async () => {
			try {
				await towerEventService.getEvent(route.params.id)
				await commentService.getComment(route.params.id)
				await ticketService.getAttendees(route.params.id)
			} catch (error) {
				logger.error(error)
				Pop.toast(error.message, 'error')
			}
		})
		return {
			commentData,
			activeEvent: computed(() => AppState.activeEvent),
			comment: computed(() => AppState.comment),
			tickets: computed(() => AppState.ticket),
			formatDate(rawDate) {
				return new Date(rawDate).toLocaleDateString();
			},
			async createComment() {
				try {
					await commentService.createComment(commentData.value)
				} catch (error) {
					logger.error(error)
					Pop.toast(error.message, 'error')
				}
			}
		}
	}
}
</script>


<style lang="scss" scoped>
</style>