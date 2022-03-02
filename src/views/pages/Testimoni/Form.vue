<template>
  <div class="d-flex flex-column text-center">
    <div @click="chooseimg" style="cursor: pointer" class="text-center position-relative">
      <img
        v-if="!url && !datatestimoni.id"
        ref="image"
        src="../../../assets/img/icontestimoni.png"
        class="img-thumbnail editeduser"
        width="90px"
      />
      <img
        v-else
        class="img-thumbnail editeduser"
        width="90px"
        :src="datatestimoni.id && !url ? servername + datatestimoni.photo : url"
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
      <label>NAMA</label>
      <input type="text" v-model="datatestimoni.nama" class="form-control" />
    </div>
    <div>
      <label>ASAL</label>
      <input type="text" v-model="datatestimoni.asal" class="form-control" />
    </div>
    <div>
      <label>TESTIMONI</label>
      <input type="text" v-model="datatestimoni.testimoni" class="form-control" />
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    datatestimoni(val) {
      alert(JSON.stringify(val));
    },
  },
  props: {
    datatestimoni: {
      default: {
        nama: "",
        asal: "",
        testimoni: "",
        files: null,
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
      this.datatestimoni.files = file;
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
