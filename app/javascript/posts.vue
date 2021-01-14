<template>
<div v-for="post in posts" :key="post.id" @click="checked(post)" :data-id="post.id" :data-check="post.checked" class="post">
  <div class="post-date">
    投稿日時：{{ post.created_at }}
  </div>
  <div class="post-content">
    {{ post.content }}
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    new_post: {
      type: Object,
      default: function() {
        return {
          id: undefined,
          content: '',
          checked: undefined,
          created_at: '',
          updated_at: '',
        }
      },
      required: false,
    },
  },
  data() {
    return {
      posts: [],
    }
  },
  watch: {
    new_post: {
      handler: function(next) {
        this.post = this.posts.unshift(next)
      },
    },
  },
  methods: {
    fetchPosts: function() {
      axios
        .get('/posts.json')
        .then(response => {
          this.posts = response.data
        })
        .catch(error => console.log(error))
    },
    checked: function(post) {
      axios
        .get(`posts/${post.id}`)
        .then(response => {
          post.checked = response.data.post.checked
        })
    },
  },
  mounted: function() {
    this.fetchPosts()
  },
}
</script>

<style scoped>
.post {
  border: 1px solid;
  width: 40%;
  margin-top: 30px;
}
.post-date {
  color: gray;
}
div[data-check="true"] {
  background-color: #585555;
}
</style>
