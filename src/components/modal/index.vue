<template>
  <div v-if="showmodal" class="mymodal">
    <div
      class="modal-dialog modal-dialog-centered"
      :style="{ maxWidth: maxwidth }"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-normal" id="exampleModalLabel">
            {{ title }}
          </h5>
          <button @click="onclose" type="button" class="btn-close text-dark">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="modalbody"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modalfooter"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "My Modal",
    },
    showmodal: {
      default: false,
    },
    maxwidth: {
      default: "500px",
    },
  },
  data() {
    return {};
  },
  methods: {
    onclose() {
      this.$emit("update:showmodal", false);
    },
  },
};
</script>

<style scoped>
.mymodal {
  background: rgba(0, 0, 0, 0.678);
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}
</style>
