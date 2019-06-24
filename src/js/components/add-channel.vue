<template>
  <div class="add-channel">
    <span class="add-channel__icon" v-on:click="openPopup"></span>
    <div class="add-channel__popup" v-show="isCreating">
      <div class="add-channel__popup-wrap">
        <h2 class="add-channel__name">Create a new channel</h2>
        <div class="add-channel__input-wrap">
          <label for="channel-name" class="add-channel__label">Name</label>
          <input type="text" class="add-channel__input" id="channel-name" v-model="newChannelCaption">
        </div>
        <div class="add-channel__btn-wrap">
          <button v-on:click="sendNewChennel()" class="add-channel__btn btn">OK</button>
          <button v-on:click="closePopup()" class="add-channel__btn btn"></button>
        </div>
      </div>
      <div class="add-channel__popup-bg" v-on:click="closePopup()"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newChannelCaption: "",
      isCreating: false
    };
  },
  methods: {
    openPopup() {
      this.isCreating = true;
    },
    closePopup() {
      this.isCreating = false;
    },
    sendNewChennel() {
      if (this.newChannelCaption.length > 0) {
        const caption = this.newChannelCaption;
        this.$emit("add-channel", {
          caption: caption,
          active: false,
          messages: []
        });
				this.newChannelCaption = "";
        this.isCreating = false;
      }
    }
  }
}
</script>

<style scoped>
</style>