<template>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <!-- Navbar -->
    <navbar />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <slot></slot>
    </div>
  </main>
</template>

<script>
import navbar from "./navbar.vue";
export default {
  components: { navbar },
};
</script>

<style></style>
