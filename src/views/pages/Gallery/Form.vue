<template>
  <div class="d-flex flex-column text-center">
    <div @click="chooseimg" style="cursor: pointer" class="text-center position-relative">
      <img
        v-if="!url && !datagalerry.id"
        ref="image"
        src="../../../assets/img/icontestimoni.png"
        class="img-thumbnail editeduser"
        width="90px"
      />
      <img
        v-else
        class="img-thumbnail editeduser"
        width="90px"
        :src="datagalerry.id && !url ? servername + datagalerry.url : url"
      />
      <input
        ref="file"
        class="custom-file-input"
        @change="previewFiles()"
        name="file"
        type="file"
      />
      <i class="material-icons position-absolute"> edit </i>
    </div>
    <div>
      <label>Title</label>
      <input type="text" v-model="datagalerry.title" class="form-control" />
    </div>
    <div>
      <label>Description</label>
      <input type="text" v-model="datagalerry.photo_desc" class="form-control" />
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    datagalerry(val) {
      alert(JSON.stringify(val));
    },
  },
  props: {
    datagalerry: {
      default: {
        title:"",
        photo_desc: "",
      },
    },
  },
  data() {
    return {
      servername: process.env.VUE_APP_SERVHOST,
      url: null,
    };
  },
  methods: {
    chooseimg() {
      this.$refs.file.click();
    },
    previewFiles() {
      let input = this.$refs.file;
      let file = input.files[0];
      this.datagalerry.files = file;
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
.editeduser {
  width: 200px;
}
.custom-file-input {
  display: none;
}
</style>
