<template>
  <aside
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a
        class="navbar-brand m-0"
        href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
        target="_blank"
      >
        <img src="../../assets/logo.png" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold text-white">Airlangga Officer</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <div
      class="collapse navbar-collapse w-auto max-height-vh-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            class="nav-link text-white"
            :class="{}"
            active-class="active"
            to="/dashboard"
          >
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">DASHBOARD</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link text-white" to="/ourservice">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">OUR SERVICES</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link text-white" to="/testimoni">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">OUR TESTIMONI</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link text-white" to="/gallery">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">OUR GALLERY</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link text-white" to="/trips">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">receipt_long</i>
            </div>
            <span class="nav-link-text ms-1">OUR TRIPS</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link text-white" to="/about">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">view_in_ar</i>
            </div>
            <span class="nav-link-text ms-1">ABOUT US</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link text-white" to="/team">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">format_textdirection_r_to_l</i>
            </div>
            <span class="nav-link-text ms-1">OUR TEAM</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="./pages/notifications.html">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">notifications</i>
            </div>
            <span class="nav-link-text ms-1">Notifications</span>
          </a>
        </li>
        <li class="nav-item mt-3">
          <h6
            class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8"
          >
            Account pages
          </h6>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="./pages/profile.html">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">person</i>
            </div>
            <span class="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="./pages/sign-in.html">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">login</i>
            </div>
            <span class="nav-link-text ms-1">Sign In</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="./pages/sign-up.html">
            <div
              class="text-white text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="material-icons opacity-10">assignment</i>
            </div>
            <span class="nav-link-text ms-1">Sign Up</span>
          </a>
        </li>
      </ul>
    </div>
    
  </aside>
</template>

<script>
export default {
  methods: {},
};
</script>

<style></style>
