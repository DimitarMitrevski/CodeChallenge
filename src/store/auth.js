import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export default {
  namespaced: true,
  state: {
    account: {},
  },
  getters: {
    account: (state) => state.account,
  },

  mutations: {
    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },
  },
  actions: {
    async signUp({ commit }, { email, password, accountType }) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User has been successfully signed up!", user);
          await setDoc(doc(db, accountType, user.uid), {
            email: user.email,
            registeredOn: Date.now(),
          }).then((res) => {
            commit("SET_ACCOUNT", user);
            this.$router.push("/profile");
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          // ..
        });
    },
    loginIn({ commit }, { email, password }) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          commit("SET_ACCOUNT", user);
          this.$router.push("/profile");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
    },
  },
};
