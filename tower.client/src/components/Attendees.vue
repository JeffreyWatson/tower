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
	height: 40px;
	width: 40px;
	border-radius: 25px;
}
</style>