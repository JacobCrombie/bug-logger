<template>
  <div class="note-comp">
    <li class="d-flex mt-2 border-bottom">
      <h5 class="col-3 p-0 align-self-center">
        {{ noteProp.creatorEmail }}
      </h5>
      <form
        class="col-8 p-0"
        @submit.prevent="editNote"
        v-if="editToggle && noteProp.creatorEmail == profile.email"
      >
        <div class="form-group form-inline">
          <input
            type="text"
            class="form-control"
            :placeholder="noteProp.content"
            v-model="editNoteData.content"
          />
          <button type="submit" class="btn btn-warning">Edit</button>
        </div>
      </form>
      <h5 class="col-8 p-0" v-if="!editToggle">
        <i
          class="fa fa-user-edit mr-1"
          @click="editToggle = !editToggle"
          v-if="!editToggle && noteProp.creatorEmail == profile.email"
        ></i>
        {{ noteProp.content }}
      </h5>
      <h5 class="col-1 p-0 align-self-center">
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
    return {
      editNoteData: {},
      editToggle: false,
    };
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
    editNote() {
      this.$store.dispatch("editNote", {
        content: this.editNoteData.content,
        id: this.noteProp.id,
        bug: this.noteProp.bug,
      });
      this.editNoteData = {};
      this.editToggle = !this.editToggle;
    },
  },
  components: {},
};
</script>


<style scoped>
.cursor {
  cursor: pointer;
}
input {
  width: 70% !important;
}
.border-bottom{
  border-color: black !important;
  border-width: thin !important;
}
</style>