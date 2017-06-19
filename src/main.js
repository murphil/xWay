import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

var socket = io('http://localhost:6742');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
