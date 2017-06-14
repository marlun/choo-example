module.exports = function commentService (state, emitter) {
  state.comments = {
    items: [],
    isFetching: true
  }

  emitter.on('DOMContentLoaded', function onDOMContentLoaded () {
    emitter.on('comments:fetched', onCommentsFetched)
    emitter.on('post:show', onPostShow)
  })

  function onCommentsFetched (comments) {
    state.comments.items = comments
    state.comments.isFetching = false
    emitter.emit('render')
  }

  function onPostShow (postId) {
    // TODO Load from state if available
    emitter.emit('comments:fetch', postId)
  }
}
