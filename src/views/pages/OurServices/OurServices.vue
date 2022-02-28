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
    <Modal :showmodal.sync="showmodal">
      <template v-slot:modalbody>
        <Form :dataform.sync="dataform" />
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
              <h6 class="text-white text-capitalize ps-3">Pengaturan Layanan</h6>
              <div @click="onshow" style="margin-right: 1vw" class="btn bg-gradient-dark">
                <i class="material-icons">add</i>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body px-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr class="text-center">
                  <th>No</th>
                  <th>Jenis Layanan</th>
                  <th>Deksripsi Layanan</th>
                  <th>Seq</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in rows" :key="i.id">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-center">{{ i.serv_nm }}</td>
                  <td>{{ i.serv_desc }}</td>
                  <td class="text-center">{{ i.seq }}</td>
                  <td class="text-center">
                    <div
                      @click="onEditLayanan(i)"
                      class="btn btn-outline-primary tbl-btn"
                    >
                      <i class="material-icons">edit</i>
                    </div>
                    <div @click="ondelete(i)" class="btn btn-outline-primary tbl-btn">
                      <i class="material-icons">delete_forever</i>
                    </div>
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
export default {
  components: { Modal, Form },
  data() {
    return {
      dataform: {
        id: null,
        serv_nm: "",
        serv_desc: "",
      },
      loading: false,
      showmodal: false,
      rows: [],
    };
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    onEditLayanan(obj) {
      this.showmodal = true;
      this.dataform = obj;
    },
    onSwal() {
      console.log(this.$swal);
    },
    ondelete(obj) {
      this.$swal
        .fire({
          title: "Anda yakin menghapus layanan ini?",
          text: "Anda tidak dapat mengembalikan data yang telah di hapus!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Hapus!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("ourservices/" + obj.id).then(() => {
              this.doQuery();
              this.$swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
          }
        });
    },
    onsubmit() {
      this.loading = true;
      var serv = this.dataform.id ? "put" : "post";
      var url = "ourservices" + (this.dataform.id ? "/" + this.dataform.id : "");
      this.$http[serv](url, this.dataform)
        .then(() => {
          this.doQuery();
          this.onclose();
          this.loading = false;
          this.$toasted.success("Data Layanan Berhasil di perbarui");
        })
        .catch(() => {
          this.loading = false;
          this.$toasted.error("Something Error");
        });
    },
    onclose() {
      this.showmodal = false;
    },
    doQuery() {
      this.$http.get("ourservices").then((ret) => {
        this.rows = ret.data.data;
      });
    },
    onshow() {
      this.dataform = {
        id: null,
        serv_nm: "",
        serv_desc: "",
      };
      this.showmodal = true;
    },
  },
};
</script>

<style scoped>
.tbl-btn {
  margin-left: 10px;
}
.tbl-btn:hover {
  color: white;
  background: palevioletred;
}
</style>
