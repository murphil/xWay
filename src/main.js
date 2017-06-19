import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const socket = io(`http://localhost:6742`);
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
global.socket = socket

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
