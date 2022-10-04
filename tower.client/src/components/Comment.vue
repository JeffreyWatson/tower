<template>
	<div class="card col-10 m-2">
		<div class="card-body d-flex flex-row">
			<div class="">
				<img
					class="rounded"
					:src="comment.creator.picture"
					alt="Commenter name"
				/>
			</div>
			<div class="ms-3">
				<div class="card-title">
					{{ comment.creator.name }}
					<span v-if="comment.isAttending">Is attending this event.</span>
				</div>
				<p class="card-text">
					{{ comment.body }}
				</p>
			</div>
			<div>
				<i class="mdi mdi-delete-forever-outline" @click="deleteComment()"></i>
			</div>
		</div>
	</div>
</template>


<script>
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'


export default {
	props: { comment: { type: Object, required: true } },
	setup(props) {
		return {
			async deleteComment() {
				try {
					await commentService.deleteComment(props.comment.id)
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