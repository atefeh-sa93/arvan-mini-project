<template>
  <V-container>
    <v-row>
      <h2>All posts</h2>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="articlesListDetail"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="goToEditPage(item.slug)">
              mdi-pencil
            </v-icon>
            <v-icon large @click="deleteItem(item.slug)"> mdi-delete </v-icon>
            <v-snackbar v-model="snackbar">
              {{ text }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
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
  name: 'List',
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
      snackbar: false,
      text: `Hello, I'm a snackbar`,
    };
  },

  props: {
    articlesListDetail: {
      type: Array,
    },
    userInfo: {
      type: Object,
    },
  },

  methods: {
    goToEditPage(item) {
      this.$router.push({ name: "EditArticle", params: { slug: item } });
    },
    deleteItem(item) {
      axios.delete(`articles/${item}`, {
        headers: {
          'X-Requested-With':'XMLHttpRequest',
          'Content-Type':'application/json',
          'Authorization': `Token ${this.userInfo.token} `
        }
      }).then((result)=> {
        if(result.status === 200) {
          this.$router.push({name: 'Articles'});
        }
      })
    },
  },
};
</script>

<style lang="scss">
.v-data-table-header {
  background: #ddd;
}
</style>
