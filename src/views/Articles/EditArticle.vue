<template>
    <v-main>
        <Navbar :user-info="authenticated" />
        <Single :user-info="authenticated"/>
    </v-main>
</template>


<script>
import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar.vue";
import Single from '../../components/Articles/Single.vue'

export default {
  name: "UpdateArticle",

  components: { Navbar, Single },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
};
</script>