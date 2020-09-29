<template>
  <div class="active-bug container">
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
        <div class="col border mt-2 card bg-light text-dark">
          <h5 class="indent">{{ bug.description }}</h5>
        </div>
        <div class="col d-flex justify-content-between">
          <button
            class="btn btn-warning mt-2"
            @click="editToggle = !editToggle"
            v-if="
              bug.creatorEmail == profile.email && !bug.closed && !editToggle
            "
          >
            Edit Bug
          </button>
          <form @submit.prevent="editBug" v-if="editToggle">
            <div class="form-group form-inline mt-2">
              <input
                type="text"
                class="form-control"
                placeholder="New title..."
                v-model="editData.title"
              />
              <input
                type="text"
                class="form-control mx-1"
                placeholder="New description..."
                v-model="editData.description"
              />
              <button class="btn btn-warning" type="submit">Edit Bug</button>
            </div>
          </form>
          <button
            class="btn btn-danger mt-2"
            @click="closeBug"
            v-if="
              bug.creatorEmail == profile.email && !bug.closed && !editToggle
            "
          >
            Close Bug
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col mt-5">
        <div class="col">
          <h2>Notes</h2>
        </div>
        <div class="justify-content-center d-flex">
          <div class="col-11 mt-3">
            <div class="col border card bg-secondary text-light">
              <div class="d-flex border-bottom">
                <h3 class="col-3 p-0">Name</h3>
                <h3 class="col-7 p-0">Message</h3>
                <h3 class="col-2 p-0">Delete</h3>
              </div>
              <div class="d-flex">
                <ul class="col">
                  <note-comp
                    v-for="note in notes"
                    :key="note.id"
                    :noteProp="note"
                  />
                </ul>
              </div>
            </div>
            <div class="col d-flex justify-content-end mt-2">
              <button
                class="btn btn-success"
                @click="noteToggle = !noteToggle"
                v-if="!noteToggle && this.profile.email"
              >
                Add Note
              </button>
              <form @submit.prevent="addNote" v-if="noteToggle">
                <div class="form-group form-inline">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Add Note..."
                    v-model="noteData.content"
                  />
                  <button class="btn btn-success" type="submit">
                    Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NoteComp from "../components/NoteComp.vue";
export default {
  name: "active-bug",
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
    this.$store.dispatch("getNotesByBugId", this.$route.params.id);
  },
  data() {
    return {
      noteToggle: false,
      noteData: {},
      editToggle: false,
      editData: {},
    };
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    closeBug() {
      this.$store.dispatch("closeBug", {
        closed: true,
        id: this.$route.params.id,
      });
    },
    addNote() {
      this.$store.dispatch("addNote", {
        bug: this.$route.params.id,
        content: this.noteData.content,
      });
      this.noteData = {};
      this.noteToggle = !this.noteToggle;
    },
    editBug() {
      this.$store.dispatch("editBugData", {
        title: this.editData.title,
        description: this.editData.description,
        id: this.$route.params.id,
      });
      this.editData = {};
      this.editToggle = !this.editToggle;
    },
  },
  components: {
    NoteComp,
  },
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
  color: darkred;
  text-shadow: 2px 3px 6px red;
}
.t-green {
  color: green;
  text-shadow: 2px 3px 6px chartreuse;
}
.border {
  border-color: black !important;
  border-width: medium !important;
}
.border-bottom {
  border-color: rgb(104, 0, 0) !important;
  border-width: medium !important;
}
.indent {
  text-indent: 8%;
}
</style>