<template>
  <div>
    <div class="text-h6 mb-2">Comments:</div>

    <v-text-field
      v-model="message"
      :append-outer-icon="message ? 'mdi-send' : ''"
      clear-icon="mdi-close-circle"
      solo
      clearable
      label="Message"
      type="text"
      @click:append-outer="sendMessage"
      @click:clear="clearMessage"
    ></v-text-field>
    <v-divider></v-divider>
    <br />
    <CommentDisplay
      v-for="(comment, idx) in comments"
      :key="idx"
      :user-name="comment.created_by_name"
      :comment="comment.comment"
      :userId="comment.created_by"
    ></CommentDisplay>
  </div>
</template>

<script>
import CommentDisplay from "./comments/CommentDisplay.vue";
export default {
  props: {
    planId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    message: "",
  }),
  async mounted() {
    try {
      await this.$store.dispatch("comments/bindRef", this.planId);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    sendMessage() {
      // TODO limit this
      this.$store
        .dispatch("comments/add", {
          userId: this.$fire.auth.currentUser.uid,
          comment: this.message.trim(),
          planId: this.planId,
          userName: this.$fire.auth.currentUser.displayName,
        })
        .then(() => (this.message = ""));
    },
    clearMessage() {
      this.message = "";
    },
  },
  computed: {
    comments: {
      get() {
        return this.$store.getters["comments/get"];
      },
    },
  },
  components: { CommentDisplay },
};
</script>
