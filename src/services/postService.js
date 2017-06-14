module.exports = function postService (state, emitter) {
  state.posts = {
    items: [],
    isFetching: true
  }

  emitter.on('DOMContentLoaded', function onDOMContentLoaded () {
    emitter.on('posts:fetched', onPostsFetched)
    emitter.on('post:show', onPostShow)
  })

  function onPostsFetched (posts) {
    state.posts.items = posts
    state.posts.isFetching = false
    emitter.emit('render')
  }

  function onPostShow (postId) {
    emitter.emit('comments:fetch', postId)
    emitter.emit('pushState', `posts/${postId}`)
  }
}
