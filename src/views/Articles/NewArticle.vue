<template>
    <v-main>
        <Navbar :user-info="authenticated" />
        <New :user-info="authenticated"/>
    </v-main>
</template>


<script>
import { mapGetters } from "vuex";
import Navbar from "../../components/Navbar.vue";
import New from '../../components/Articles/New.vue'

export default {
  name: "NewArticle",

  components: { Navbar, New },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
};
</script>