<template>
  <v-main>
    <Navbar :user-info="authenticated" />
    <List :articles-list-detail="articles" :user-info="authenticated" />
  </v-main>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar.vue";
import List from "../../components/Articles/List.vue";

export default {
  name: "Articles",

  data() {
    return {
      articles: [],
    };
  },

  components: { Navbar, List },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },

  mounted() {
    this.fetchArticlesList();
    //
  },

  methods: {
    async fetchArticlesList() {
      if (this.authenticated) {
        const result = await axios.get("/articles", {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            'Authorization': `Token ${this.authenticated.token} `,
          },
        });

        this.articles = result.data.articles;
      }
    },
  },
};
</script>
