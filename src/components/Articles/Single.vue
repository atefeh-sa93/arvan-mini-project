<template>
  <v-container>
    <v-row>
      <h1>Edit Article</h1>
    </v-row>
    <v-row>
      <v-col cols="9" md="9">
        <v-form @submit.prevent="updateArticle">
          <v-text-field
            label="title"
            v-model="form.title"
            outlined
          ></v-text-field>
          <v-text-field
            label="description"
            v-model="form.description"
            outlined
          ></v-text-field>
          <v-textarea label="Body" v-model="form.body" outlined></v-textarea>
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
      <v-col cols="3" md="3">
         <div>
           <p>Tags</p>
           <v-text-field
            v-model="tag"
            outlined
          ></v-text-field>
         </div>
        <v-card outlined>
          <v-card-text v-for="(tag,index) in tags" :key="index">
            <v-checkbox
              v-model="checkbox"
              :label="`${tag}`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "SingleArticle",

  data() {
    return {
      form: {
        title: "",
        description: "",
        body: "",
      },
      tags: [],
      checkbox: false,
      tag: ''
    };
  },

  mounted() {
    this.getArticleData();
    this.getTagsData();
  },

  props: {
    userInfo: {
      type: Object,
    },
  },

  methods: {
    getArticleData() {
      axios.get(`articles/${this.$route.params.slug}`).then((res) => {
        const data = res.data.article;
        this.form.title = data.title;
        this.form.description = data.description;
        this.form.body = data.body;
      });
    },
    getTagsData() {
      axios.get("tags").then((res) => {
        this.tags =res.data.tags.sort();
      });
    },
    updateArticle() {
      axios.put(`articles/${this.$route.params.slug}`, {article: this.form}, {
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
    }
  },
};
</script>
