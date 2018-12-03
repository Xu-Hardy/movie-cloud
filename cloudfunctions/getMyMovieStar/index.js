// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('collection').where({
      user: event.user,
      movieId: event.movieId
    }).get()
  } catch (e) {
    console.error(e)
  }
} 