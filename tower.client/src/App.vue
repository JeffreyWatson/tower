<template>
	<header>
		<Navbar />
	</header>
	<main class="container-fluid style gx-0">
		<router-view />
	</main>
	<Modal id="createEvent-modal">
		<template #header> Create Your Event </template>
		<template #body>
			<CreateEvent />
		</template>
	</Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
	name: 'App',
	setup() {
		return {
			appState: computed(() => AppState)
		}
	}
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.style {
	background-color: #2a2d3a;
	overflow-x: hidden;
}
</style>
