<template>
  <div>
    <loader
      object="#ff9633"
      color1="#ffffff"
      color2="#17fd3d"
      size="17"
      speed="1.1"
      bg="#343a40"
      v-if="loading"
      objectbg="#999793"
      opacity="80"
      disableScrolling="false"
      name="dots"
    ></loader>
    <vue-editor v-model="content" style="background: #ffff"></vue-editor>
    <hr />
    <div class="position-relative">
      <div @click="submitabout" class="btn btn-primary position-absolute top-0 end-0">
        Simpan Perubahan
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },

  data() {
    return {
      content: "",
      loading: false,
    };
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    doQuery() {
      this.loading = true;
      this.$http
        .get("about")
        .then((ret) => {
          this.content = ret.data.data.content;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submitabout() {
      this.loading = true;
      this.$http
        .put("about", { content: this.content })
        .then(() => {
          this.doQuery();
          this.$toasted.success("Halaman ABout telah di perbarui");
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
