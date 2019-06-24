<template>
  <div>
    <ul class="channel__list">
      <li
        class="channel__item"
        v-for="menuItem in messageList"
        :class="{'channel__item--active': menuItem.active}"
      >
        <a href="#" @click="setActive(menuItem)">{{ menuItem.caption }}</a>
      </li>
    </ul>
  </div>
</template> 

<script>
export default {
  props: ["messageList"],
  methods: {
    setActive(channel) {
      this.messageList.forEach(el => {
        el.active = el === channel;
      })
    }
  }
};
</script>

<style scoped>
</style>
