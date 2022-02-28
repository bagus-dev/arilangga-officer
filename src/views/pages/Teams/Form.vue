<template>
  <div class="d-flex flex-column text-center">
    <div @click="chooseimg" style="cursor: pointer" class="text-center position-relative">
      <img
        v-if="!url && !datateam.id"
        ref="image"
        src="../../../assets/img/user.png"
        class="img-thumbnail editeduser"
        width="90px"
      />
      <img
        v-else
        class="img-thumbnail editeduser"
        width="90px"
        :src="datateam.id && !url ? servername + datateam.photo : url"
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
      <input type="text" v-model="datateam.nama" class="form-control" />
    </div>
    <div>
      <label>JABATAN</label>
      <input type="text" v-model="datateam.jabatan" class="form-control" />
    </div>
    <div>
      <label>WHATS APPS</label>
      <input type="text" v-model="datateam.wa" class="form-control" />
    </div>
    <div>
      <label>INSTAGRAM</label>
      <input type="text" v-model="datateam.ig" class="form-control" />
    </div>
    <div>
      <label>FACEBOOK</label>
      <input type="text" v-model="datateam.fb" class="form-control" />
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    datateam(val) {
      alert(JSON.stringify(val));
    },
  },
  props: {
    datateam: {
      default: {
        nama: "",
        jabatan: "",
        wa: "",
        ig: "",
        fb: "",
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
      this.datateam.files = file;
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
.editeduser {
  border-radius: 100%;
  width: 90px;
  height: 90px;
}
.custom-file-input {
  display: none;
}
</style>
