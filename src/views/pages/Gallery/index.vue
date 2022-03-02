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
        <Modal title="Form Gallery" :showmodal.sync="showmodal">
            <template v-slot:modalbody>
                <Form :datagalerry="dataform" />
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
        
      <div v-for="i in gallerylist" :key="i.id" class="col-lg-3 box-gallery">
        <div class="card-body p-1">
        <ul class="list-group addbtn1" style="border:solid 0px;background-color: transparent;">
          <li class="list-group-item addbtn1 d-flex align-items-center px-0" style="border:solid 0px;background-color: transparent;">
          <div class=" align-items-center addbtn d-flex-col align-items-center justify-content-center" @mouseleave="cancHover(i)" @mouseover="onHover(i)" :style="hovertem && i.id == acctive? 'height:auto' : 'height:20vw;overflow:hidden'">
            <img class="addbtn1" style="border-bottom-left-radius:0rem;border-bottom-right-radius:0rem;height:15vw" :src="servername + i.url"/>
            <h5 style="line-height:1.8vw"> {{i.title}}</h5>
            <p style="margin:0vw;font-size:1vw"> {{i.photo_desc}} </p>
          </div>
          </li>
        </ul></div>
      </div>
      <div class="col-lg-3 box-gallery">
        <div
          @click="addgallery(i)"
          class=" align-items-center addbtn d-flex align-items-center justify-content-center" style="height:20vw"
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
        gallerylist: [],
        showmodal: false,
        dataform: {},
        hovertem: false,
        acctive:0,
        selected:""
        };
    },
    mounted() {
        this.doQuery();
    },
    methods: {
  //     getImgUrl(pet) {
  //   var images = require.context("pet")
  //   return images('./' + pet + ".png")
  // },
      onHover(i){
        this.hovertem = true
        this.acctive = i.id
      },
      cancHover(i){
        this.acctive = i.id
        this.hovertem = false
      },
        doQuery(){
            this.loading = true;
            this.$http.get("gallery").then((ret) => {
                this.gallerylist= ret.data.data;
                this.loading = false;
                console.log(this.gallerylist)
            });
        },
        editgallery(i) {
            this.showmodal = true;
            this.dataform = i;
        },
        delgallery(obj) {
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
                this.$http.delete("gallery/" + obj.id).then(() => {
                this.doQuery();
                this.$swal.fire("Deleted!", "Your gallery Has Been removed.", "success");
                });
            }
            })
            .catch(() => {
            this.$toasted.error("Something Error");
            });
        },
        onclose() {
            this.showmodal = false;
            this.doQuery();
        },
        onsubmit() {
            this.loading = true;
            let data = new FormData();
            for (var p in this.dataform) {
                data.append(p, this.dataform[p]);
            }
            var method = this.dataform.id ? "post" : "post";
            var params = this.dataform.id ? "/" + this.dataform.id : "";

            this.$http[method]("gallery" + params, data)
                .then(() => {
                this.doQuery();
                this.$toasted.success("Gallery Updated");
                this.loading = false;
                this.showmodal = false;
                })
                .catch(() => {
                this.loading = false;
            });
        },
        addgallery() {
            this.showmodal = true;
            this.dataform = {
                title: "",
                photo_desc: "",
                files: "",
            };
        },
    }
}
</script>

<style scoped>
.addbtn1 {
  width: 100%;
  height: 90%;
  text-align: center;
  padding: rem;
  font-size: 3rem;
  cursor: pointer;
  background: rgb(255, 255, 255);
  border-radius: 1rem;
}

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


.avatar {
  height: 80px;
  width: 80px;
  min-height: 70px;
  min-width: 70px;
}

.box-gallery{
  height: 20vw;
  margin-top:3vw;
}
.addbtn:hover{
  box-shadow: 0px 0px 15px 0px #888888;
  height:auto;
}

.centered {
  /* position: absolute; */
  /* top: 0%;
  left: 0%; */
  transform: translate(-50%, -50%);
  margin-top:50px;
  margin-left:20px;
}
.congallery{
 padding: 100px 0 100px 0;
}

.test {
  border: solid 1px;
}
</style>
