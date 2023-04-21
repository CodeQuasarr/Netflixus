import { createStore } from 'vuex'
import {User} from "@/helpers/types/UserType";

export default createStore({
  state: {
    user: {} as User,
    token: null as string | null,
  },
  getters: {
    isAuthenticated: (state) => {
      return state.token !== null;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
