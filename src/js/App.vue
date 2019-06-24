<template>
  <div id="app">
    <!-- боковая часть приложения -->
    <div class="sidebar">
      <section class="sidebar__user-menu user-menu">
        <div class="user-menu__img-wrap">
          <img src="img/profile-pic.jpg" alt="profile-pic">
        </div>
        <div class="user-menu__info-wrap">
          <span class="user-menu__name">{{ userName }}</span>
          <span class="user-menu__status">{{ status }}</span>
        </div>
        <!-- вывод компонента добавления ветки сообщения -->
        <addChannel v-on:add-channel="addNewItem"></addChannel>
      </section>
      <section class="sidebar__channel-wrap channel">
        <div class="channel__top-wrap">
          <h2 class="channel__title">{{ titleList }}</h2>
          <span class="channel__type">{{ historyOfChannel }}</span>
        </div>
        <!-- вывод подзоголовков списка сообщений -->
        <menuItem :messageList="messageList"></menuItem>
      </section>
    </div>

    <!-- центральная часть приложения -->
    <div class="central-block">
      <section class="central-block__top">
        <h1 class="central-block__title">{{ mainTitle }}</h1>
        <select class="central-block__message-filter">
          <option
            v-for="messageFilter in messageFilters"
            v-bind:value="messageFilter.value"
          >{{ messageFilter }}</option>
        </select>
      </section>
      <div class="message">
        <ul class="message__list">
          <li class="message__item" v-for="messages in newListMessage.messages">
            <div class="message__info-wrap">
              <div class="message__title">{{ messages.title }}</div>
              <div class="message__text-wrap">
                <p class="message__text">{{ messages.message }}</p>
                <div class="message__author-wrap">
                  <span class="message__author-name">{{ messages.author }}</span>
                  <span class="message__author-time">{{ messages.time }}</span>
                </div>
              </div>
              <div class="message__icon-wrap">
                <span class="message__icon"></span>
              </div>
            </div>
          </li>
        </ul>
        <!-- вывод компонента добавления сообщений -->
        <messages v-on:add-message="addMessage"></messages>
      </div>
    </div>
  </div>
</template>

<script>
import menuItem from "./components/menu-item.vue";
import addChannel from "./components/add-channel.vue";
import messages from "./components/messages.vue";

export default {
  name: "app",
  data() {
    return {
      userName: "Evan You",
      status: "online",
      titleList: "Messages",
      historyOfChannel: "history",
      mainTitle: "Question Messanger",
      messageFilters: ["All Question", "My question", "Most discussed"],
      messageList: [
        {
          caption: "My question",
          active: false,
          messages: [
            {
              title: "Q2718",
              message: "Hello, what is the delivery time?",
              author: "Guest",
              time: "4:20 am"
            },
            {
              title: "Q2718",
              message: "Hello, what is the adventure time?",
              author: "Finn",
              time: "4:20 am"
            }
          ]
        },
        {
          caption: "Messenger",
          active: true,
          messages: [
            {
              title: "Q2717",
              message: "Hi, do you have this item in stock?",
              author: "Guest",
              time: "1:03 am"
            },
            {
              title: "Q2717",
              message: "I see u true face.",
              author: "Rorshah",
              time: "1:43 am"
            },
            {
              title: "Q2717",
              message: "Mr. probs - Waves, download",
              author: "Mr. Probs",
              time: "2:15 am"
            }
          ]
        },
        {
          caption: "Community QA",
          active: false,
          messages: [
            {
              title: "Q2716",
              message: "Does this come in the color blue?",
              author: "Guest",
              time: "1:33 am"
            },
            {
              title: "Q2715",
              message: "Hey, boiii",
              author: "Guest",
              time: "1:33 am"
            },
            {
              title: "Q2714",
              message: "My life be like. Yyy-aaa-y-a-yyy",
              author: "Guest",
              time: "1:33 am"
            }
          ]
        },
        {
          caption: "FAQ",
          active: false,
          messages: [
            {
              title: "Q2717",
              message: "What's problem, man?",
              author: "Guest",
              time: "1:33 am"
            },
            {
              title: "Q2717",
              message: "Why i still here?",
              author: "Guest",
              time: "1:33 am"
            },
            {
              title: "Q2717",
              message: "Hello. What is your name?",
              author: "Guest",
              time: "1:33 am"
            }
          ]
        }
      ]
    };
  },
  components: {
    menuItem,
    addChannel,
    messages
  },
  methods: {
    addNewItem(newItem) {
      this.messageList.push(newItem);
      this.saveInfo();
    },
    addMessage(newMessage) {
      this.newListMessage.messages.push(newMessage);
      this.saveInfo();
    },
    saveInfo() {
      let parsed = JSON.stringify(this.messageList);
      localStorage.setItem("messageList", parsed);
    }
  },
  computed: {
    newListMessage: function() {
      return this.messageList.reduce((accum, curr) => {
        return curr.active ? curr : accum;
      }, {});
    }
  },
  mounted() {
    if (localStorage.getItem("messageList")) {
      try {
        this.messageList = JSON.parse(localStorage.getItem("messageList"));
      } catch (e) {
        localStorage.removeItem("messageList");
      }
    }
  }
};
</script>

<style>
</style>
