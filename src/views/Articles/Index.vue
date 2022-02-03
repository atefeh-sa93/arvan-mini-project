<template>
  <v-main>
    <Navbar :user-info="authenticated" />
    <List />
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar.vue";
import List from "../../components/Articles/List.vue";

export default {
  name: "Articles",

  components: { Navbar, List },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
};
</script>
