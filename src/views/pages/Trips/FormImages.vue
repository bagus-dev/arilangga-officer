<template>
  <div class="">
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
    <div
      @click="onselect"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      class="upload-container justify-content-center d-flex align-items-center"
    >
      <h6>Select/Drag Gambar disini</h6>
      <input
        ref="images"
        @change="previewFiles()"
        class="custom-file-input"
        name="images[]"
        multiple
        type="file"
      />
    </div>
    <div class="d-flex flex-wrap" style="width: 100%">
      <div v-for="(image, index) in images" class="img-con" :key="index">
        <i @click="delimage(image, index)" class="material-icons btndelimg">
          remove_circle
        </i>
        <img
          v-if="image.id"
          class="img-thumbnail rounded"
          width="200px"
          height="100px"
          :src="servername + image.url"
        />
        <img
          v-else
          class="img-thumbnail rounded"
          width="200px"
          height="100px"
          v-bind:ref="'image' + parseInt(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      servername: process.env.VUE_APP_SERVHOST,
      previewImage: null,
      countimg: 0,
      existimgcount: 0,
      loading: false,
    };
  },
  mounted() {
    this.countingexist();
  },
  methods: {
    countingexist() {
      var count = 0;
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].id) {
          count++;
        }
      }
      this.existimgcount = count;
    },
    delimage(data, i) {
      if (!data.id) {
        var file = this.images;
        file.splice(i, 1);
        this.applyImage();
      } else {
        this.loading = true;
        this.$http
          .delete("tripimage/" + data.id)
          .then(() => {
            this.loading = false;
            var file = this.images;
            file.splice(i, 1);
            this.applyImage();
            this.$toasted.success("Gambar Telah di hapus");
          })
          .catch(() => {
            this.loading = false;
            this.$toasted.error("something wrong");
          });
      }
    },
    dragover(event) {
      event.preventDefault();
      event.currentTarget.classList.add("drag");
    },
    previewFiles() {
      this.countimg = 0;
      let input = this.$refs.images;
      let file = input.files;
      for (let i = 0; i < file.length; i++) {
        this.images.push(file[i]);
      }
      this.applyImage();
    },
    applyImage() {
      this.countimg = 0 + this.existimgcount;
      for (var j = 0; j < this.images.length; j++) {
        if (!this.images[j].id) {
          let reader = new FileReader(); //instantiate a new file reader
          reader.onload = (e) => {
            this.$refs["image" + this.countimg][0].src = e.target.result;
            this.countimg++;
          };
          reader.readAsDataURL(this.images[j]);
        }
      }
    },
    dragleave(event) {
      event.preventDefault();
      event.currentTarget.classList.remove("drag");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.previewFiles();
      event.currentTarget.classList.remove("drag");
    },
    onselect() {
      this.$refs.images.click();
    },
  },
};
</script>

<style scoped>
.btndelimg {
  color: red;
  position: absolute;
  right: -10px;
  top: -10px;
  cursor: pointer;
  font-size: 1.5rem;
}
.btndelimg:hover {
  color: rgb(180, 4, 4);
}
.img-con {
  margin: 1rem;
  position: relative;
}
.custom-file-input {
  display: none;
}
.upload-container {
  border: dashed rgb(0, 81, 255);
  border-radius: 1vw;
  background: rgba(0, 195, 255, 0.39);
  height: 10rem;
  width: 100%;
  cursor: pointer;
}
.drag {
  background: #e8e8e8;
}
</style>
