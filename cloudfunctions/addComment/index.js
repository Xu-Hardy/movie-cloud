const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    try {
      return await db.collection("comment").add({
        data: {
          avatar: event.avatar,
          username: event.username,
          content: event.content,
          type: event.type,
          user: event.user,
          movieId: event.movieId
        }
        })
    } catch (e) {
      console.error(e)
    }
  } 