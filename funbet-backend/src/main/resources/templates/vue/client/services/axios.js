var axios = require('axios');

var axiosInstance = axios.create({
  /*baseURL: 'http://localhost:9111',
  crossDomain: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',

  },
  withCredentials: true,
  proxy: {
    host: 'http://localhost',
    port: 9111,
    auth: {
      username: 'user',
      password: '1'
    }
  }*/
});

// axiosInstance.defaults.baseURL = 'http://localhost:9111';

/*axiosInstance.interceptors.response.use((response) => {
  console.log("axios response", response)

  if(response.data.indexOf('<html><head><title>Login Page</title></head>') > -1){
    window.location = "http://localhost:9111/login";
  }
  return response
}, (error) => {
  console.log("axios error", error)
  if (error.response && error.response.data && error.response.data.location) {
    window.location = error.response.data.location; // "https://localhost:4001/login";
  } else {
    return Promise.reject(error)
  }
})*/

module.exports = axiosInstance;