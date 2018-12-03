const app = getApp()

const innerAudioContext = wx.createInnerAudioContext();

let commentType

Page({
  /**
   * 页面的初始数据
   */
  data: {
    commentInfo: null,
    movieDetail: null,
    content: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData)
    this.setData({
      commentInfo: options,
      userInfo: app.globalData.userInfo
    })
    let movieId = Number(this.data.commentInfo.id)
    this.getMovieDetail(movieId)
  },

  //获取电影详情
  getMovieDetail(movieId) {
    console.log("movie detail: 正在下载电影详情...")
    wx.cloud.callFunction({
      name: 'movieInfo',
      data: {
        id: movieId
      },
      success: res => {
        console.log(res.result.data)
        this.setData({
          movieDetail: res.result.data[0]
        })
      },
      fail: err => {
        console.error('[云函数] [movieInfo] 调用失败', err)
      }
    })
  },

  //返回上一个页面
  back() {
    let movieId = Number(this.data.commentInfo.id)
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          commentType = 'text'
          console.log(commentType)
        } else {
          commentType = 'audio'
          console.log(commentType)
        }
        wx.navigateTo({
          url: `../comment-edit/comment-edit?id=${movieId}&commentType=${commentType}`,
        })
      },
      fail(err) {
        console.log(err.errMsg)
      }
    })
  },

  playAudio() {
    innerAudioContext.src = this.data.commentInfo.content;
    console.log(innerAudioContext.src)
    innerAudioContext.play()
  },

  //提交评论
  submit() {  
    let { avatarUrl, nickName } = this.data.userInfo
    let { content, id, type } = this.data.commentInfo
    let user = app.globalData.openid

    // console.log(avatarUrl, nickName)
    // console.log(content, id, type)
    // console.log(user)

    if (content) {
      wx.cloud.callFunction({
        name: 'addComment',
        data: {
          avatar: avatarUrl,
          username: nickName,
          content: content,
          type: type,
          user: user,
          movieId: Number(id)
        },
        success: res => {
          console.log("comment edit: 影评发布成功!")
          wx.showToast({
            title: ' 影评发布成功!',
          })
          wx.navigateTo({
            url: `../comment-list/comment-list?id=${Number(id)}`,
          })
        },
        fail: err => {
            wx.showToast({
            title: '影评发布失败！',
          })
          console.error('[云函数] [movieInfo] 调用失败', err)
        }
      })
      // db.collection("comment").add({
      //   data: {
      //     avatar: avatarUrl,
      //     username: nickName,
      //     content: content,
      //     type: type,
      //     user: user,
      //     movieId: Number(id)
      //   },
      //   success: res => {
      //     console.log("comment edit: 影评发布成功!")
      //     wx.showToast({
      //       title: ' 影评发布成功!',
      //     })
      //     wx.navigateTo({
      //       url: `../comment-list/comment-list?id=${Number(id)}`,
      //     })
      //   },
      //   fail: err => {
      //     wx.showToast({
      //       title: '影评发布失败！',
      //     })
      //   }
      // })

    } else {
      wx.showToast({
        title: '评论不能为空呀!',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let movieId = Number(this.data.commentInfo.id)
    this.getMovieDetail(movieId)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})