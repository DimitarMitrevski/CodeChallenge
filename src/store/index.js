import { createStore } from "vuex";
// Create a new store instance or import from module.
import auth from "./auth";
const store = createStore({
  modules: {
    auth,
  },
});

export default store;
