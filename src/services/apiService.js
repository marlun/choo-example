var xhr = require('xhr')

module.exports = function apiService (state, emitter) {
  emitter.on('posts:fetch', function onPostsFetch () {
    state.posts.isFetching = true
    var options = {
      json: true,
      url: 'http://localhost:3000/posts'
    }
    xhr.get(options, function onApiResponse (err, res, body) {
      if (err) emitter.emit('posts:fetch:error', err)
      emitter.emit('posts:fetched', body)
    })
  })

  emitter.on('comments:fetch', function onCommentsFetch (postId) {
    state.comments.isFetching = true
    var options = {
      json: true,
      url: `http://localhost:3000/comments?postId=${postId}`
    }
    xhr.get(options, function onApiResponse (err, res, body) {
      if (err) emitter.emit('posts:fetch:error', err)
      emitter.emit('comments:fetched', { body: body, postId: postId })
    })
  })
}
