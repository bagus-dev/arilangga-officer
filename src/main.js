import Vue from 'vue'
import App from './App.vue'
import "./assets/css/nucleo-icons.css"
import "./assets/css/nucleo-svg.css"
import "./assets/css/material-dashboard.css"
import "./assets/css/mystyle.css"
import store from './store';
import router from './router'
import VeeValidate from 'vee-validate';
import LoadScript from 'vue-plugin-load-script';
import axios from 'axios'
import VueSweetalert2  from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'; 
import Toasted from 'vue-toasted';
import loader from "vue-ui-preloader";

Vue.use(loader);
Vue.use(Toasted, {
  duration: 1500,
  position: 'bottom-center', // ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']
  theme: 'outline', // ['toasted-primary', 'outline', 'bubble']
  iconPack: 'material' // ['material', 'fontawesome', 'mdi', 'custom-class', 'callback']
})
Vue.config.productionTip = false
Vue.use(VeeValidate);
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error&&error.response) {
      Vue.toasted.error(error.response.data.data)
    }
    if (error.response.data.data === "Token is Expired" ) {
      store.dispatch("auth/logout");
      document.location="/login"
    }
    if (error.response.data.data === "Token is Invalid" ) {
      store.dispatch("auth/logout");
      document.location="/login"
    }
   
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(function(config) {
  if(store.state.auth.user){
    const token = store.state.auth.user.token;
    console.log("token",store.state.auth.user.token)
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log("Interceptio ok")
  return config;
}, function(err) {
  console.log("Interceptio fails")
  return Promise.reject(err);
});
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_APIHOST
Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data';
Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json';
Vue.use(VueSweetalert2)
new Vue({
  router,store,LoadScript,
  render: h => h(App)
}).$mount('#app')
