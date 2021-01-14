function index() {
  Vue.createApp({
    data: function() {
      return {
        message: '',
        isVisible: false,
        post: {},
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
    methods: {
      submit: function() {
        axios
          .post('/posts', {
            content: this.message
          })
          .then(response => {
            this.post = response.data
            this.message = ''
            this.closeForm()
          })
          .catch(error => console.log(error))
      },
      openForm: function() {
        this.isVisible = true
      },
      closeForm: function() {
        this.isVisible = false
      },
    },
  }).mount('#index')
}

document.addEventListener('DOMContentLoaded', index)