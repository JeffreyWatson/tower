<template>
	<div class="card col-10">
		<div class="card-body d-flex flex-row">
			<div class="col-2">
				<img
					class="rounded"
					:src="comment.creator.picture"
					alt="Commenter name"
				/>
			</div>
			<div class="col-10">
				<h5 class="card-title">
					{{ comment.creator.name }}
					<span v-if="isAttending">Is attending this event.</span>
				</h5>
				<p class="card-text">
					{{ comment.body }}
				</p>
			</div>
		</div>
	</div>
</template>


<script>


export default {
	props: { comment: { type: Object, required: true } },
	setup() {
		return {}
	}
}
</script>


<style lang="scss" scoped>
</style>