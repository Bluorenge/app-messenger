<template>
  <div class="message__add-wrap">
    <div class="message__inputs-wrap">
      <textarea
        type="text"
        class="message__textarea"
        id="new-message"
        v-model="newMessageText"
        placeholder="your message"
      ></textarea>
    </div>
    <div class="message__btn-wrap">
      <button v-on:click="addMessage()" class="message__btn btn">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      newMessageText: ""
    };
  },
  methods: {
    addMessage() {
      if (this.newMessageText.length > 0) {
        const text = this.newMessageText;
        this.$emit("add-message", {
          title: "Q2717",
          message: text,
          author: "Guest",
          time: "1:33 am"
        });
        this.newMessageText = "";
      }
    }
  }
};
</script>

<style scoped>
</style>
