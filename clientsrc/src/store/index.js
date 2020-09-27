import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    notes: [],
    activeBug: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    }
  },
  actions: {
    //#region  //AUTH0 and Profile
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion


    //#region Bugs 
    async getAllBugs({ commit, dispatch }) {
      try {
        let res = await api.get('bugs')
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async addBug({ commit, dispatch }, bugData) {
      try {
        await api.post('bugs', bugData)
        dispatch("getAllBugs")
      } catch (error) {
        console.error(error);
      }
    },
    async getBugById({ commit, dispatch }, bugId) {
      try {
        let res = await api.get('bugs/' + bugId)
        commit('setActiveBug', res.data)
        router.push({ name: "ActiveBug", params: { id: res.data.id } })
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ commit, dispatch }, bug) {
      try {
        await api.put('bugs/' + bug.id, { closed: bug.closed })
        dispatch('getBugById', bug.id)
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region Notes
    async getNotesByBugId({ commit, dispatch }, bugId) {
      try {
        let res = await api.get('bugs/' + bugId + '/notes')
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({ commit, dispatch }, noteData) {
      try {
        await api.post('notes', noteData)
        dispatch('getNotesByBugId', noteData.bug)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ commit, dispatch }, noteData) {
      try {
        await api.delete('notes/' + noteData.id)
        dispatch('getNotesByBugId', noteData.bug)
      } catch (error) {
        console.error(error);
      }
    }
    //#endregion
  }
});
