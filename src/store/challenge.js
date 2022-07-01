import { db } from "../services/firebase";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
export default {
  namespaced: true,
  state: {
    challenges: [],
  },
  getters: {
    challenges: (state) => state.challenges,
  },
  mutations: {
    SET_CHALLENGES(state, payload) {
      state.challenges = payload;
    },
    ADD_CHALLENGE(state, payload) {
      state.challenges.push(payload);
    },
  },
  actions: {
    async createChallenge({ commit }, payload) {
      console.log("The payload recived by the NewChallenge page is", payload);
      const docRef = await addDoc(collection(db, "Challenges"), {
        ...payload,
      })
        .then((res) => {
          //TODO ADD Challenge to array of challenges
          console.log("Challenge has been added!");
        })
        .catch((err) => {
          console.log("An error occurred while try to add a challenge", err);
        });

      //TODO Get all challenges created by a company
    },
  },
};
