<template>
  <div>
    <sidebar />
    <Content>
      <router-view />
    </Content>
  </div>
</template>

<script>
import Content from "../components/layout/content.vue";
import sidebar from "../components/layout/sidebar.vue";
export default {
  components: { sidebar, Content },
};
</script>

<style></style>
