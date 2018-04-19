import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state'
import mutations from './mutations'
import actions from './actions'

const state2 = {...state, ...(window.__INIT_DATA__)};

export default new Vuex.Store({
  state: state2,
  mutations,
  actions,
});


