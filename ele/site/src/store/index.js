import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import location from './location/index.js'
import shop from './shop/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	  user,
	  location,
	  shop
  }
})
