<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">Tower</div>
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
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'Home' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Home
          </router-link>
        </li>
      </ul>
      <!-- <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'EventDetails' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Event Details
          </router-link>
        </li>
      </ul> -->
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'Account' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Account
          </router-link>
        </li>
      </ul>
      <ul>
        <div
          class="
            btn
            text-success
            lighten-30
            selectable
            text-uppercase
            mt-3
            me-5
          "
          data-bs-toggle="modal"
          data-bs-target="#createEvent-modal"
        >
          Create Event
        </div>
      </ul>
      <!-- <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link>
        </li>
      </ul> -->
      <!-- LOGIN COMPONENT HERE -->
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
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
