<template>
  <div>
    <sidebar />
    <Content />
  </div>
</template>

<script>
import Content from "./content.vue";
import sidebar from "./sidebar.vue";
export default {
  components: { sidebar, Content },
};
</script>

<style></style>
