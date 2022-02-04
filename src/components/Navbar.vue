<template>
  <nav>
    <v-toolbar color="#373A3C" flat>
      <v-toolbar-title>
        <span class="font-wight-bold white--text">Arvan Challenge</span>
        <span class="ml-5 text-subtitle-2 white--text" v-if="userInfo"
          >Welcome {{ userInfo.username }}</span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="#5bc0de" outlined>Logout</v-btn>
    </v-toolbar>

    <v-navigation-drawer fixed hide-overlay class="mt-16" color="#1c7cd5">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 white--text">
            Post
          </v-list-item-title>
          <v-list-item v-for="item in navigationItems" :key="item.title" link>
            <v-list-item-content>
              <v-list-item-title
                class="white--text"
                :to="{ name: `${item.routerName}` }"
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      navigationItems: [
        { title: "All Articles", routerName: "Articles" },
        { title: "New Article", routerName: "NewArticle" },
      ],
    };
  },

  props: {
    userInfo: {
      type: Object,
    },
  },
};
</script>
