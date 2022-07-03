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
  limit,
} from "firebase/firestore";
import { async } from "@firebase/util";
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
    async joinChallenge(state, { developerId, challengeId }) {
      return new Promise(async (resolve, reject) => {
        const developerRef = doc(db, "Developer", developerId);
        const challengeRef = doc(db, "Challenges", challengeId);
        await addDoc(collection(db, "Join"), {
          developerRef,
          challengeRef,
          timestamp: Date.now(),
          status: "joined",
        })
          .then((doc) => {
            resolve({ id: doc.id });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async alreadyJoined(state, { developerId, challengeId }) {
      try {
        const developerRef = doc(db, "Developer", developerId);
        const challengeRef = doc(db, "Challenges", challengeId);
        const q = query(
          collection(db, "Join"),
          where("developerRef", "==", developerRef),
          where("challengeRef", "==", challengeRef),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          let join;
          querySnapshot.forEach((doc) => {
            let { status } = doc.data();
            join = { id: doc.id, submitted: status == "submitted" };
          });
          return join;
        }
        return !querySnapshot.empty;
      } catch (e) {
        console.log(e);
      }
    },
    async getAllJoinedChallenges({ commit }, developerId) {
      try {
        const developerRef = doc(db, "Developer", developerId);
        const q = query(
          collection(db, "Join"),
          where("developerRef", "==", developerRef)
        );
        const querySnapshot = await getDocs(q);
        let joins = [];
        querySnapshot.forEach(async (doc) => {
          let join = doc.data();
          joins.push({ ...join });
        });
        let challenges = [];
        joins.forEach((j) => {
          let challenge = getDoc(j.challengeRef);
          challenges.push(challenge);
        });
        challenges = await Promise.all(challenges).then((docs) => {
          return docs.map((doc, i) => {
            return {
              ...doc.data(),
              ...joins[i],
              id: joins[i].challengeRef.id,
            };
          });
        });
        challenges.sort((a, b) => {
          const aTimestamp = a.timestamp;
          const bTimestamp = b.timestamp;

          if (aTimestamp > bTimestamp) {
            return -1;
          } else if (aTimestamp < bTimestamp) {
            return 1;
          }
          return 0;
        });
        commit("SET_CHALLENGES", challenges);
      } catch (e) {
        console.log(e);
      }
    },
    async leaveChallenge(state, { developerId, challengeId }) {
      return new Promise(async (resolve, reject) => {
        try {
          const developerRef = doc(db, "Developer", developerId);
          const challengeRef = doc(db, "Challenges", challengeId);
          const q = query(
            collection(db, "Join"),
            where("developerRef", "==", developerRef),
            where("challengeRef", "==", challengeRef),
            limit(1)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    },
    submitSolution(state, { joinId, solution }) {
      return new Promise((resolve, reject) => {
        const docRef = doc(db, "Join", joinId);
        setDoc(
          docRef,
          {
            status: "submitted",
            solution,
          },
          { merge: true }
        ).then(() => {
          resolve("Document updated successfully");
        });
      }).catch((err) => {
        reject("An error occurred during updating solution");
      });
    },
    async getParticipants(state, { challengeId }) {
      console.log("This is executeds");
      const challengeRef = doc(db, "Challenges", challengeId);
      const q = query(
        collection(db, "Join"),
        where("challengeRef", "==", challengeRef)
      );
      const querySnapshot = await getDocs(q);
      let submissions = [];
      let joins = [];
      if (querySnapshot.empty) {
        return { submissions, joins };
      }
      querySnapshot.forEach((doc) => {
        joins.push(doc.data());
      });
      let persons = [];
      joins.map((join) => {
        let person = getDoc(join.developerRef);
        persons.push(person);
        return join;
      });
      persons = await Promise.all(persons).then((res) => {
        return res.map((per) => per.data());
      });
      joins = joins.map((join, i) => {
        return { ...join, ...persons[i] };
      });
      submissions = joins.filter((join) => join.status == "submitted");
      return { joins, submissions };
    },
  },
};
