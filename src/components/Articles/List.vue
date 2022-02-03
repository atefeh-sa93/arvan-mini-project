<template>
  <V-container>
    <v-row>
      <h2>All posts</h2>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="articles"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
          @click:row="goToEditPage"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="goToEditPage(item.slug)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </v-col>
    </v-row>
    <router-view></router-view>
  </V-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "number",
        },
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "Author",
          align: "start",
          sortable: false,
          value: "author.username",
        },
        {
          text: "Tags",
          align: "start",
          sortable: false,
          value: "tagList",
        },
        {
          text: "Excerpt",
          align: "start",
          sortable: false,
          value: "description",
        },
        {
          text: "Created",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      articles: [],
    };
  },

  mounted() {
    this.fetchArticlesList();
  },

  methods: {
    async fetchArticlesList() {
      await axios.get("/articles").then((result) => {
        this.articles = result.data.articles;
      });
    },
    goToEditPage(item) {
        this.$router.push({name: 'EditArticle', params: {slug: item.slug}});
    }
  },
};
</script>

<style lang="scss">
.v-data-table-header {
  background: #ddd;
}
</style>
