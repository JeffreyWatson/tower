<template>
	<img
		class="special"
		:src="tickets.profile.picture"
		alt="picture of attendee"
	/>
</template>


<script>
export default {
	props: { tickets: { type: Object, required: true } },
	setup() {
		return {}
	}
}
</script>


<style lang="scss" scoped>
.special {
	height: 80px;
	width: 80px;
	border-radius: 50px;
	padding: 0;
	margin: 3px;
}
</style>