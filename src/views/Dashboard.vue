<template>
  <v-main>
    <Navbar :user-info="authenticated" />
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
export default {
  name: "Dashboard",

  components: { Navbar },

  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
    }),
  },
};
</script>
