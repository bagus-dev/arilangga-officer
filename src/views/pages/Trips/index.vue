<template>
  <div class="row">
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
    <Modal maxwidth="80%" title="Form Perjalanan" :showmodal.sync="showmodal">
      <template v-slot:modalbody>
        <Form v-if="activekind == 'form'" :dataform.sync="dataform" />
        <form-images v-if="activekind == 'form-images'" :images="dataform.images" />
        <form-dates :trip_dates="dataform.trip_dates" v-if="activekind == 'form-dates'" />
      </template>
      <template v-slot:modalfooter>
        <button
          type="button"
          @click="onclose"
          class="btn bg-gradient-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" @click="onsubmit" class="btn bg-gradient-primary">
          Save changes
        </button>
      </template>
    </Modal>
    <div class="col-12">
      <div class="card my-4">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <div class="d-flex justify-content-between">
              <h6 class="text-white text-capitalize ps-3">Pengaturan Perjalanan</h6>
              <div @click="onshow" style="margin-right: 1vw" class="btn bg-gradient-dark">
                <i class="material-icons">add</i>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table table-striped align-items-center mb-0">
              <thead>
                <tr class="text-center">
                  <th>Publish</th>
                  <th>No</th>
                  <th>Nama Perjalanan</th>
                  <th>Jenis</th>
                  <th>Min Order</th>
                  <th>Lokasi</th>
                  <th>Harga</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in rows" :key="i.id">
                  <td align="center">
                    <i
                      @click="onswitch(i)"
                      class="material-icons btntable"
                      :class="i.use_mk == 'Y' ? 'text-success' : 'text-danger'"
                    >
                      {{ i.use_mk == "Y" ? "toggle_on" : "toggle_off" }}
                    </i>
                  </td>
                  <td align="center">{{ index + 1 }}</td>
                  <td>{{ i.trip_nm }}</td>
                  <td align="center">{{ i.isgroup == "Y" ? "GROUP" : "NON GROUP" }}</td>
                  <td align="center">{{ i.min_qty ? i.min_qty : 1 }}</td>
                  <td align="center">{{ i.city }}</td>
                  <td align="right">
                    {{ "Rp." + i.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
                  </td>

                  <td align="center" style="justify-content: space-between">
                    <i @click="oneditimages(i)" class="material-icons btntable blue">
                      collections
                    </i>
                    <i @click="oneditdates(i)" class="material-icons btntable blue">
                      calendar_month
                    </i>
                    <i @click="onedit(i)" class="material-icons btntable info"> edit </i>
                    <i @click="ondelete(i)" class="material-icons btntable delete">
                      delete_forever
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../../components/modal";
import Form from "./Form.vue";
import FormDates from "./FormDates.vue";
import FormImages from "./FormImages.vue";
export default {
  components: { Modal, Form, FormImages, FormDates },
  data() {
    return {
      dataform: {},
      rows: [],
      loading: false,
      showmodal: false,
      activekind: null,
    };
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    onswitch(i) {
      var url = i.use_mk == "Y" ? "tripdisable" : "tripenable";
      this.loading = true;
      this.$http
        .put(url + "/" + i.id)
        .then(() => {
          this.onsuccess();
        })
        .catch(() => {
          this.onfails();
        });
    },
    oneditdates(obj) {
      this.editact(obj, "form-dates");
    },
    oneditimages(obj) {
      this.editact(obj, "form-images");
    },
    onedit(obj) {
      this.editact(obj, "form");
    },
    editact(obj, kind) {
      this.showmodal = true;
      this.dataform = obj;
      this.activekind = kind;
    },
    onshow() {
      this.onshowserv("form");
    },
    onshowserv(kind) {
      this.dataform = {
        id: null,
        trip_nm: "",
        trip_desc: "",
        min_qty: 1,
        city: "",
        price: 0,
        isgroup: "N",
        facilities: [],
        images: [],
        trip_dates: [],
      };
      this.showmodal = true;
      this.activekind = kind;
    },
    ondelete(obj) {
      this.$swal
        .fire({
          title: "Anda yakin menghapus Perjalanan ini?",
          text: "Anda tidak dapat mengembalikan data yang telah di hapus!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Hapus!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("trip/" + obj.id).then(() => {
              this.doQuery();
              this.$swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
          }
        })
        .catch(() => {
          this.$toasted.error("Something Error");
        });
    },

    onclose() {
      this.showmodal = false;
    },
    onsuccess() {
      this.doQuery();
      this.onclose();
      this.loading = false;
      this.$toasted.success("Data Perjalanan Berhasil di perbarui");
    },
    onfails() {
      this.loading = false;
    },
    saveImages() {
      this.loading = true;
      var obj = new FormData();
      for (var i = 0; i < this.dataform.images.length; i++) {
        obj.append("images[" + i + "]", this.dataform.images[i]);
      }
      this.$http
        .post("tripimage/" + this.dataform.id, obj)
        .then(() => {
          this.onsuccess();
        })
        .catch(() => {
          this.onfails();
        });
    },
    saveForm() {
      this.loading = true;
      var serv = this.dataform.id ? "put" : "post";
      var url = "trip" + (this.dataform.id ? "/" + this.dataform.id : "");
      this.$http[serv](url, this.dataform)
        .then(() => {
          this.onsuccess();
        })
        .catch(() => {
          this.onfails();
        });
    },
    saveDates() {
      this.loading = true;
      this.$http
        .post("tripdates/" + this.dataform.id, { trip_dates: this.dataform.trip_dates })
        .then(() => {
          this.onsuccess();
        })
        .catch(() => {
          this.onfails();
        });
    },
    onsubmit() {
      if (this.activekind == "form") {
        this.saveForm();
      } else if (this.activekind == "form-images") {
        this.saveImages();
      } else if (this.activekind == "form-dates") {
        this.saveDates();
      }
    },
    doQuery() {
      this.loading = true;
      this.$http.get("trip").then((ret) => {
        this.rows = ret.data.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped></style>
