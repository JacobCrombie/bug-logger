<template>
  <div class="note-comp">
    <li class="d-flex mt-2">
      <h5 class="col-3 p-0">{{ noteProp.creatorEmail }}</h5>
      <h5 class="col-9 p-0">{{ noteProp.content }}</h5>
      <h5 class="col-1 p-0">
        <i
          class="fa fa-trash cursor text-danger"
          @click="deleteNote"
          v-if="noteProp.creatorEmail == profile.email"
        ></i>
      </h5>
    </li>
  </div>
</template>


<script>
export default {
  name: "note-comp",
  props: ["noteProp"],
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.noteProp);
    },
  },
  components: {},
};
</script>


<style scoped>
.cursor {
  cursor: pointer;
}
</style>