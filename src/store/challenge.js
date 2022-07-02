import { db } from "../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
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
    REMOVE_CHALLENGE(state, id) {
      state.challenges = state.challenges.filter(
        (challenge) => challenge.id != id
      );
    },
  },
  actions: {
    async createChallenge({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        const docRef = await addDoc(collection(db, "Challenges"), {
          ...payload,
        })
          .then((doc) => {
            //TODO ADD Challenge to array of challenges

            commit("ADD_CHALLENGE", { ...payload, id: doc.id });

            resolve("Challenge has been added!");
          })
          .catch((err) => {
            reject("An error occurred while try to add a challenge", err);
          });
      });
    },
    updatedChallenge(state, { title, description, enviroment, id }) {
      return new Promise((resolve, reject) => {
        setDoc(
          doc(db, "Challenges", id),
          {
            title,
            description,
            enviroment,
          },
          { merge: true }
        )
          .then((res) => {
            resolve("We have successfully updated the document!");
          })
          .catch((err) => {
            reject("An error occured while trying to update document!", err);
          });
      });
    },
    async getAllChallenges({ commit }, payload) {
      const q = query(
        collection(db, "Challenges"),
        orderBy("createdOn", "desc")
      );
      const querySnapshot = await getDocs(q);
      let challenges = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        challenges.push({ id: doc.id, ...doc.data() });
      });
      commit("SET_CHALLENGES", challenges);
    },
    async getAllCompChallenges({ commit }, payload) {
      const q = query(
        collection(db, "Challenges"),
        orderBy("createdOn", "desc"),
        where("createdBy", "==", payload)
      );
      const querySnapshot = await getDocs(q);
      let challenges = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        challenges.push({ id: doc.id, ...doc.data() });
      });
      commit("SET_CHALLENGES", challenges);
    },
    async getChallengeById(state, id) {
      const docRef = doc(db, "Challenges", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    },
    async deleteChallengeById({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        await deleteDoc(doc(db, "Challenges", id))
          .then((res) => {
            commit("REMOVE_CHALLENGE", id);
            resolve("Document successfully has been deleted!");
          })
          .catch((err) => {
            reject("An error occurred while deleting the document", err);
          });
      });
    },
  },
};
