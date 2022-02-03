<template>
  <v-container>
    <v-row>
      <h1>Edit Article</h1>
    </v-row>
    <v-row>
      <v-col cols="9" md="9">
        <v-form>
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
          <v-textarea
            label="Body"
            v-model="form.body"
            outlined
          ></v-textarea>
          <v-btn color="success">text</v-btn>
        </v-form>
      </v-col>
      <v-col cols="3" md="3">BB</v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
    name: 'SingleArticle',
    
    data() {
        return {
            form: {
                title: '',
                description: '',
                body:''
            }
        };
    },

    mounted() {
        this.getArticleData();
    },

    props: {
    userInfo: {
      type: Object,
    },
  },

    methods: {
        getArticleData() {
            axios.get(`articles/${this.$route.params.slug}`).then((res)=> {
                const data = res.data.article
                this.form.title = data.title;
                this.form.description = data.description;
                this.form.body= data.body;
            })
        }
    }
};
</script>
