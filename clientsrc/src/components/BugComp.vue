<template>
  <div class="bug-comp">
    <li class="d-flex border cursor mt-3 grow" @click="setActiveBug">
      <h4 class="col-3">{{ bugProp.title }}</h4>
      <h4 class="col-3">{{ bugProp.creatorEmail }}</h4>
      <h4 class="col-3 t-red" v-if="bugProp.closed">Closed</h4>
      <h4 class="col-3 t-green" v-if="!bugProp.closed">Open</h4>
      <h4 class="col-3 text-center">{{ this.date }}</h4>
    </li>
  </div>
</template>


<script>
export default {
  name: "bug-comp",
  props: ["bugProp"],
  data() {
    return {};
  },
  computed: {
    date() {
      let dateArr = this.bugProp.updatedAt.split("T");
      return dateArr[0];
    },
  },
  methods: {
    setActiveBug() {
      this.$store.dispatch("getBugById", this.bugProp.id);
    },
  },
  components: {},
};
</script>


<style scoped>
.t-red {
  color: red;
}
.t-green {
  color: green;
}
.cursor {
  cursor: pointer;
}
.border {
  border-color: black !important;
}
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.02);
  background-color: cornflowerblue;
}
</style>