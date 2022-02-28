<template>
  <div class="container">
    <div @click="adddates" class="btn btn-primary">Tambah Tanggal</div>
    <div class="date-con">
      <table class="table table-striped">
        <thead>
          <tr align="center">
            <th>No</th>
            <th>Day</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in trip_dates" :key="index">
            <td align="center">{{ index + 1 }}</td>
            <td style="vertical-align: 'middle'">{{ getlabel(i) }}</td>
            <td><input type="date" v-model="i.trip_date" class="form-control" /></td>
            <td>
              <i @click="removedate(index)" class="material-icons btntable delete">
                remove_circle
              </i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trip_dates: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listhari: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      listbulan: [
        "Januari",
        "Febuary",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    };
  },
  methods: {
    removedate(i) {
      this.trip_dates.splice(i, 1);
    },
    getlabel(i) {
      if (i.trip_date) {
        var nd = new Date(i.trip_date);
        var date = nd.getDate();
        var day = this.listhari[nd.getDay()];
        var month = this.listbulan[nd.getMonth()];
        var year = nd.getFullYear();
        return day + "," + date + " " + month + " " + year;
      } else {
        return "Tentukan Tanggal";
      }
    },
    adddates() {
      this.trip_dates.push({
        trip_date: "",
      });
    },
  },
};
</script>

<style scoped>
.date-con {
  height: 400px;
  overflow: auto;
}
</style>
