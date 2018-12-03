const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('collection').add({
      data: {
        fromWho: event.fromWho,
        starAvatar: event.starAvatar,
        movieId: event.movieId,
        movieTitle: event.movieTitle,
        movieImage: event.movieImage,
        type: event.type,
        content: event.content,
        user: event.user
      }
    })
  } catch (e) {
    console.error(e)
  }
} 