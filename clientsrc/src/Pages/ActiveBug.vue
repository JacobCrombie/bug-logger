<template>
  <div class="active-bug container-fluid">
    <div class="row">
      <div class="col">
        <div>
          <h5 class="col mt-3">Title:</h5>
        </div>
        <div>
          <h1 class="col title">{{ bug.title }}</h1>
        </div>
        <div class="col mt-5 justify-content-between d-flex">
          <div class="d-flex">
            <h5 class="align-self-center mr-2">Reported By:</h5>
            <h1>{{ bug.creatorEmail }}</h1>
          </div>
          <div class="d-flex">
            <h5 class="align-self-center mr-2">Status:</h5>
            <h1 class="t-red" v-if="bug.closed">Closed</h1>
            <h1 class="t-green" v-if="!bug.closed">Open</h1>
          </div>
        </div>
        <div class="col border mt-2">
          <h5>{{ bug.description }}</h5>
        </div>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-danger mt-2" @click="closeBug">
            Close Bug
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "active-bug",
  data() {
    return {};
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
  },
  methods: {
    closeBug() {
      this.$store.dispatch("editBug", {
        closed: true,
        id: this.$route.params.id,
      });
    },
  },
  components: {},
};
</script>


<style scoped>
.active-bug {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.title {
  font: bold;
  font-size: 60pt;
}
.t-red {
  color: red;
}
.t-green {
  color: green;
}
</style>