<template>
  <div class="">
    <label class="form-label">Jenis Layanan</label>
    <input type="text" v-model="dataform.serv_nm" class="form-control" />
    <label class="form-label">Deskripsi Layanan</label>
    <textarea class="form-control" v-model="dataform.serv_desc"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    dataform: {
      default: {
        id: null,
        serv_nm: "",
        serv_desc: "",
      },
    },
  },
};
</script>

<style></style>
