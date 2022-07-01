import { createStore } from "vuex";
// Create a new store instance or import from module.
import auth from "./auth";
import challenge from "./challenge";
const store = createStore({
  modules: {
    auth,
    challenge,
  },
});

export default store;
