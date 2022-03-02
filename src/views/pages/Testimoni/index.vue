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
    <Modal title="Form Testimoni" :showmodal.sync="showmodal">
      <template v-slot:modalbody>
        <Form :datatestimoni="dataform" />
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
    <div v-for="i in testimonilist" :key="i.id" class="col-lg-6">
      <div class="card-body p-1">
        <ul class="list-group">
          <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0">
            <div class="avatar" v-if="i.photo != ''">
              <img 
                :src="servername + i.photo"
                alt="kal"
                class="border-radius-lg shadow"
                style="left: -1rem; position: relative"
              />
            </div>
            <div class="avatar" v-else>
              <img src="../../../assets/img/icontestimoni.png"/>
            </div>
            <div
              style="margin-top: 1rem"
              class="d-flex align-items-start flex-column justify-content-center"
            >
              <h6 class="mb-0 text-md bold">{{ i.nama }}</h6>
              <h6 class="mb-0 text-xs">{{ i.asal }}</h6>
              <br />
              <p class="mb-0 text-xs p-1">
                <i>{{ i.testimoni }}</i>
              </p>
            </div>
            <div
              @click="edittestimoni(i)"
              class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
            >
              <i class="material-icons"> edit </i>
            </div>
            <div
              @click="deltestimoni(i)"
              class="btn text-danger pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
            >
              <i class="material-icons"> delete_forever </i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-6">
      <div
        @click="addtestimoni(i)"
        class="addbtn d-flex align-items-center justify-content-center"
      >
        +
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
      servername: process.env.VUE_APP_SERVHOST,
      loading: false,
      testimonilist: [],
      showmodal: false,
      dataform: {},
    };
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    addtestimoni() {
      this.showmodal = true;
      this.dataform = {
        nama: "",
        asal: "",
        testimoni: "",
        files: "",
      };
    },
    edittestimoni(i) {
      this.showmodal = true;
      this.dataform = i;
    },
    deltestimoni(obj) {
      this.$swal
        .fire({
          title: `Anda yakin menghapus ${obj.nama} ?`,
          text: "Anda tidak dapat mengembalikan data yang telah di hapus!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Hapus!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$http.delete("testimoni/" + obj.id).then(() => {
              this.doQuery();
              this.$swal.fire("Deleted!", "Your Testimoni Has Been removed.", "success");
            });
          }
        })
        .catch(() => {
          this.$toasted.error("Something Error");
        });
    },
    onsubmit() {
      this.loading = true;
      let data = new FormData();
      for (var p in this.dataform) {
        data.append(p, this.dataform[p]);
      }
      var method = this.dataform.id ? "post" : "post";
      var params = this.dataform.id ? "/" + this.dataform.id : "";

      this.$http[method]("testimoni" + params, data)
        .then(() => {
          this.doQuery();
          this.$toasted.success("Testimoni Updated");
          this.loading = false;
          this.showmodal = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onclose() {
      this.showmodal = false;
      this.doQuery();
    },
    doQuery() {
      this.loading = true;
      this.$http.get("testimoni").then((ret) => {
        this.testimonilist = ret.data.data;
        this.loading = false;
        console.log(this.testimonilist)
      });
    },
  },
};
</script>

<style scoped>
.addbtn {
  width: 100%;
  height: 90%;
  text-align: center;
  padding: rem;
  font-size: 3rem;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border-radius: 1rem;
}
.addbtn:hover {
  background: rgb(187, 187, 187);
}
.avatar {
  height: 80px;
  width: 80px;
  min-height: 70px;
  min-width: 70px;
}
</style>
