module.exports = function commentService (state, emitter) {
  state.comments = {
    items: {},
    isFetching: true
  }

  emitter.on('DOMContentLoaded', function onDOMContentLoaded () {
    emitter.on('comments:fetched', onCommentsFetched)
    emitter.on('post:show', onPostShow)
  })

  function onCommentsFetched (data) {
    state.comments.items[data.postId] = data.body
    state.comments.isFetching = false
    emitter.emit('render')
  }

  function onPostShow (postId) {
    if (state.comments.items.hasOwnProperty(postId) === false) {
      emitter.emit('comments:fetch', postId)
    }
  }
}
