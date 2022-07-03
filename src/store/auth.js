import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
export default {
  namespaced: true,
  state: {
    account: {},
    accountType: null,
  },
  getters: {
    account: (state) => state.account,
    accountType: (state) => state.accountType,
  },

  mutations: {
    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },
    SET_ACCOUNT_TYPE(state, payload) {
      state.accountType = payload;
    },
  },
  actions: {
    async signUp({ commit }, { email, password, accountType, displayName }) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
              displayName,
            })
              .then(async () => {
                // Profile updated!
                // ...
                await setDoc(doc(db, accountType, user.uid), {
                  email: user.email,
                  registeredOn: Date.now(),
                  displayName,
                });
                commit("SET_ACCOUNT", user);
                commit("SET_ACCOUNT_TYPE", accountType);
              })
              .catch((error) => {
                // An error occurred
                // ...
                throw error;
              });
            resolve("User account has been successfully created!");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            reject(
              "An error occured while account creation, please try again!"
            );
            // ..
          });
      });
    },
    logIn({ dispatch }, { email, password }) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch("checkType", user);
            resolve("User succesfully logged in!");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject("Invalid email/password, please try again.");
          });
      });
    },
    forgotPassword(state, email) {
      return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            // ..
            resolve("Reset password email sent!");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            reject("Failed to sent email for password reset!");
          });
      });
    },
    signingOut({ commit }) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          commit("SET_ACCOUNT", {});
          commit("SET_ACCOUNT_TYPE", null);
          //document.location.href = "/";
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
          alert("An error occured during singing out!");
        });
    },
    async checkType({ commit }, user) {
      const docRef = doc(db, "Employer", user.uid);
      const docSnap = await getDoc(docRef);
      let accountType = null;
      let account = null;
      if (docSnap.exists()) {
        accountType = "Employer";
        account = { ...user, ...docSnap.data() };
      } else {
        // doc.data() will be undefined in this case
        accountType = "Developer";
        const docRef = doc(db, "Developer", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          account = { ...user, ...docSnap.data() };
        }
      }
      if (account && accountType) {
        commit("SET_ACCOUNT", account);
        commit("SET_ACCOUNT_TYPE", accountType);
      }
    },
    async updateAccount({ commit, state }, data) {
      //TODO update the account details
      return new Promise(async (resolve, reject) => {
        await setDoc(
          doc(db, state.accountType, state.account.uid),
          {
            ...data,
          },
          { merge: true }
        )
          .then((res) => {
            updateProfile(auth.currentUser, {
              ...data,
            }).then(async () => {
              console.log("Display name updated");
            });
            commit("SET_ACCOUNT", { ...state.account, ...data });
            resolve("We have successfully updated the documents!");
          })
          .catch((err) => {
            reject("An error occured while trying to update document!", err);
          });
      });
    },
  },
};
