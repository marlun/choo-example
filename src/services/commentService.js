module.exports = function commentService (state, emitter) {
  state.comments = {
    items: [],
    isFetching: true
  }

  emitter.on('DOMContentLoaded', function onDOMContentLoaded () {
    emitter.on('comments:fetched', onCommentsFetched)
  })

  function onCommentsFetched (comments) {
    state.comments.items = comments
    state.comments.isFetching = false
    emitter.emit('render')
  }
}
