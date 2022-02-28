<template>
  <div class="row">
    <div class="col-6">
      <label class="form-label">Nama Perjalanan</label>
      <input type="text" v-model="dataform.trip_nm" class="form-control" />
      <label class="form-label">Kota</label>
      <input type="text" v-model="dataform.city" class="form-control" />
      <label class="form-label">Jenis</label>
      <select v-model="dataform.isgroup" class="form-control">
        <option value="N">Non Group</option>
        <option value="Y">Group</option>
      </select>
      <label class="form-label">Min Order</label>
      <input type="number" v-model="dataform.min_qty" class="form-control" />
      <label class="form-label">Harga</label>
      <input type="number" v-model="dataform.price" class="form-control" />
      <label class="form-label">Deskripsi Trip</label>
      <textarea class="form-control" v-model="dataform.trip_desc"></textarea>
    </div>
    <div class="col-6">
      <div @click="addfacilities" class="btn btn-primary">+ Tambah Fasilitas</div>
      <div class="fac-con">
        <div v-for="(i, index) in dataform.facilities" :key="index">
          <label class="form-label">Nama Fasilitas</label>
          <div class="d-flex">
            <input type="text" v-model="i.facility" class="form-control" />
            <i @click="removefac(index)" class="material-icons btnicon">
              remove_circle
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataform: {
      default: {
        id: null,
        trip_nm: "",
        trip_desc: "",
        min_qty: 1,
        city: "",
        price: 0,
        isgroup: "N",
        facilities: [],
      },
    },
  },
  methods: {
    addfacilities() {
      this.dataform.facilities.push({
        facility: "",
      });
    },
    removefac(i) {
      this.dataform.facilities.splice(i, 1);
    },
  },
};
</script>

<style scoped>
.fac-con {
  max-height: 25rem;
  overflow: auto;
}
.btnicon {
  font-size: 2.5rem;
  cursor: pointer;
  color: red;
}
.btnicon:hover {
  color: brown;
}
</style>
