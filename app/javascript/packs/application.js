require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import axios from 'axios';

require("../index")

console.log(1234)

axios.get('/posts.json')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error)
  });

axios.interceptors.request.use((config) => {
  console.log(5678)
  if(config.method == 'post' || config.method == 'put' ||
      config.method == 'patch' || config.method == 'delete') {
    const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    config.headers['X-CSRF-Token'] = csrf_token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});