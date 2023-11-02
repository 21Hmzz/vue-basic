import { createStore } from "vuex";
import router from "../router/index";
import ToastPlugin, { useToast } from "vue-toast-notification";

export default createStore({
  state: {
    estConnecte: false,
  },
  mutations: {
    setEstConnecte(state, estConnecte) {
      state.estConnecte = estConnecte;
    },
  },
  actions: {
    async connexionUtilisateur({ commit }, { email, password }) {
      const Toast = useToast();

      try {
        await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            commit("setEstConnecte", true);
            sessionStorage.setItem("token", JSON.stringify(data));
            Toast.open({
              message: "Connexion réussie",
              type: "success",
              duration: 5000,
              dismissible: true,
            });
            router.push("/");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (e) {
        console.log(e);
      }
    },
    deconnexionUtilisateur({ commit }) {
      commit("setEstConnecte", false);
    },
  },
  getters: {
    estConnecte: (state) => state.estConnecte,
  },
});
