<template>
  <div class="bugs container-fluid">
    <div class="row">
      <h1 class="col text-center mt-3 text-under font-weight-bold">
        Current Bugs
      </h1>
    </div>
    <div class="row">
      <div class="card col">
        <div class="d-flex border">
          <h2 class="col-3">Title</h2>
          <h2 class="col-3">Reported By</h2>
          <h2 class="col-3">
            Status
            <i class="fa fa-chevron-up cursor" @click="sortBugs" v-if="!sortToggle"></i>
            <i class="fa fa-chevron-down cursor" @click="sortBugs2" v-if="sortToggle"></i>
          </h2>
          <h2 class="col-3">Last Modified</h2>
        </div>
        <div class="d-flex">
          <ul class="col mt-3 border">
            <bug-comp v-for="bug in bugs" :key="bug.id" :bugProp="bug" />
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          class="btn btn-danger"
          v-if="!bugToggle && this.profile.email"
          @click="bugToggle = !bugToggle"
        >
          Report Bug
        </button>
        <form
          class="d-flex justify-content-center mt-3"
          v-if="bugToggle"
          @submit.prevent="addBug"
        >
          <div class="form-group form-inline">
            <input
              type="text"
              class="form-control"
              placeholder="Bug Title"
              v-model="addBugData.title"
            />
            <input
              type="text"
              class="form-control mx-1 d-input"
              placeholder="Description"
              v-model="addBugData.description"
            />
            <button type="submit" class="btn btn-danger">Report Bug</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import BugComp from "../components/BugComp.vue";
export default {
  name: "bugs",
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  data() {
    return {
      bugToggle: false,
      addBugData: {},
      sortToggle: false,
    };
  },
  computed: {
    bugs() {

      return this.$store.state.bugs;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", {
        title: this.addBugData.title,
        description: this.addBugData.description,
      });
      this.addBugData = {};
      this.bugToggle = !this.bugToggle;
    },
    sortBugs(){
      this.bugs.sort((a,b)=> (a.closed > b.closed)? 1: -1)
      this.sortToggle = !this.sortToggle
    },
    sortBugs2(){
      this.bugs.sort((a,b)=> (a.closed < b.closed)? 1: -1)
      this.sortToggle = !this.sortToggle
    }
  },
  components: {
    BugComp,
  },
};
</script>


<style scoped>
.bugs {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.text-under {
  text-decoration: underline;
}
.d-input {
  width: 50vh !important;
}
.cursor {
  cursor: pointer;
}
</style>
