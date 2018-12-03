const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviePoster: null,
    comments: null,
    movieId: 12
  },

  //或区域openid
  onGetOpenid() {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid
        this.getOtherComment()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("Home: 正在进入首页....")
    let id = this.data.movieId
    this.onGetOpenid()  //获取openid,便于后边获取评论
    this.getMoviePoster(id)  //下载电影信息
    console.log("Home:首页加载完毕。")
  },

  //下载首页的海报
  getMoviePoster(movieId) {
    wx.cloud.callFunction({
      name: 'movieInfo',
      data: {
        id: this.data.movieId
      },
      success: res => {
        console.log(res)
        this.setData({
          moviePoster: res.result.data[0]
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  //获取一条非本人的评论
  getOtherComment() {
    console.log('s')
     wx.cloud.callFunction({
      name: 'getOtherComment',
      data: {
        user: app.globalData.openid,
        movieId: this.data.movieId
      },
      success: res => {
        // console.log(res)
        this.setData({
          comments: res.result.data[0]
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  //登陆按钮
  onGetUserInfo: function (e) {
    console.log("Home: 正在登陆...")
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
      app.globalData.userInfo = e.detail.userInfo
      console.log(app.globalData)
    }
  },

  //点击推荐评论跳转到影评详情
  commentDetail() {
    console.log("home:正在跳转至影评详情...")
    let comments = this.data.comments
    console.log(comments)
    console.log(comments)
    wx.navigateTo({
      url: `../comment-detail/comment-detail?avatar=${comments.avatar}&content=${comments.content}&type=${comments.type}&movieId=${comments.movieId}&username=${comments.username}`,
    })
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
    console.log("Home: 当前页面：看看侃侃电影网")
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              app.globalData.userInfo = res.userInfo
              console.log("Home: 成功同步信息！")
            }
          })
        } 
      }
    })
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