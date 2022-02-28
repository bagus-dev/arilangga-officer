import axios from 'axios';
const API_URL =  process.env.VUE_APP_APIHOST+'auth/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log("Hallo",response.data)
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          axios.interceptors.request.use(function(config) {
            config.headers.Authorization = `Bearer ${response.data.user.token}`;
            return config;
          }, function(err) {
            console.log("Interceptio fails")
            return Promise.reject(err);
          });
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
    alert()
  }
  register(user) {
    return axios.post(API_URL + 'signup', {
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();