var html = require('bel')

module.exports = function PostsPage (state, emit) {
  return render()

  function render () {
    if (state.posts.items.length === 0) {
      emit('posts:fetch')
      return html`
        <body><p>Fetching post details...</p></body>
      `
    }
    var post = state.posts.items.find(isCurrentPost)
    if (post === undefined) {
      return html`
        <body><p>No available post with that ID</p></body>
      `
    }
    return html`
      <body>
        <h1>${post.title}</h1>
        ${CommentList()}
      </body>
    `
  }

  function CommentList () {
    if (state.comments.isFetching === true) {
      return html`<p>Fetching comments...</p>`
    }
    if (state.comments.items.length === 0) {
      return html`<p>No available comments</p>`
    }
    return html`
      <ul>
        ${state.comments.items.map(CommentItem)}
      </ul>
    `
  }

  function CommentItem (comment) {
    return html`
      <li>${comment.body}</li>
    `
  }

  function isCurrentPost (post) {
    return Number(post.id) === Number(state.params.post)
  }
}
