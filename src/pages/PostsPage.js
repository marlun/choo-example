var html = require('bel')
var onload = require('on-load')

module.exports = function PostsPage (state, emit) {
  return render()

  function render () {
    var el = html`
      <body>
        <h1>Welcome</h1>
        ${PostList()}
      </body>
    `
    onload(el, onLoad)
    return el
  }

  function PostList () {
    if (state.posts.isFetching) {
      return html`<p>Fetching posts...</p>`
    }

    return html`
      <ul>
        ${state.posts.items.map(PostItem)}
      </ul>
    `
  }

  function PostItem (post) {
    return html`<li onclick=${onClick}>${post.title}</li>`
    function onClick () {
      // TODO Should views be the ones emitting pushState or should I emit
      // something like post:show instead and listen fo
      emit('post:show', post.id)
    }
  }

  function onLoad () {
    emit('posts:fetch')
  }
}
