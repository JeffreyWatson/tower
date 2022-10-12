<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
		<router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
			<!-- <div class="d-flex flex-column align-items-center">Tower</div> -->
			<img
				class="img-fluid custom"
				src="../assets/img/towerNoBack.png"
				alt=""
			/>
		</router-link>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse justify-content-end" id="navbarText">
			<ul>
				<div
					class="btn text-white lighten-30 selectable text-uppercase mt-3 me-5"
					data-bs-toggle="modal"
					data-bs-target="#createEvent-modal"
				>
					Create Event
				</div>
			</ul>
			<Login />
		</div>
	</nav>
</template>

<script>
export default {
	setup() {
		return {};
	},
};
</script>

<style scoped>
a:hover {
	text-decoration: none;
}
.nav-link {
	text-transform: uppercase;
}
.navbar-nav .-exact-active {
	border-bottom: 2px solid var(--bs-success);
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.custom {
	height: 50px;
	width: 300px;
}

.back {
	background-color: #2a2d3a;
}
</style>
