import { csrfToken } from "@rails/ujs"

function index() {
  Vue.createApp({
    data: function() {
      return {
        message: '',
        isVisible: false,
        posts: [],
        newPost: {},
      }
    },
    computed: {
      empty: function() {
        if (this.message) {
          return 'filled'
        }
        return 'empty'
      }
    },
    watch: {
      newPost: {
        handler: function(next) {
          this.post = this.posts.unshift(next)
        },
      },
    },
    methods: {
      submit: function() {
        const sendData = {
          content: this.message,
        }
        fetch('/posts', {
            method: 'POST',
            headers: {
              'X-CSRF-Token': csrfToken(),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData)
          })
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.newPost = data
            this.message = ''
            this.closeForm()
          })
          .catch(error => {
            console.log(error)
          })
      },
      openForm: function() {
        this.isVisible = true
      },
      closeForm: function() {
        this.isVisible = false
        this.message = '';
      },
      fetchPosts: function() {
        fetch('/posts.json')
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.posts = data
          })
          .catch(error => {
            console.log(error)
          });
      },
      checked: function(post) {
        fetch(`posts/${post.id}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            post.checked = data.post.checked
          })
      },
    },
    mounted: function() {
      this.fetchPosts()
    },
  }).mount('#index')
}

document.addEventListener('DOMContentLoaded', index)