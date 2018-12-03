const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: null,
    tips: "我收藏的影评",
    status: "收藏",
    release: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    // console.log(options)
    this.getStarList()
    this.getMyComment()
  },

  onGetOpenid() {
    // 调用云函数
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

  //加载收藏的影评
  getStarList() {
    wx.cloud.callFunction({
      name: 'getMyStar',
      data:{
        user: app.globalData.openid
      },
      success: res => {
        console.log("收藏")
        console.log(res.result.data)
        let result = res.result.data
        if (!result.length) {
          stars: null
        } else {
          this.setData({
            stars: res.result.data
          })
        }
      },
      fail: err => {
        console.error('[云函数] [getStar] 调用失败', err)
      }
    })
  },


  //获取自己发布的影评
  getMyComment() {
    wx.cloud.callFunction({
      name: 'getMyComment',
      data: {
        user: app.globalData.openid
      },
      success: res => {
        console.log('sss')
        console.log(res.result.data)
        this.setData({
          release: res.result.data
        })
      },
      fail: err => {
        console.error('[云函数] [getMyComment] 调用失败', err)
      }
    })
  },

  //回到首页
  backHome() {
    wx.navigateBack()
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

  //切换收藏和编辑的页面
  switch() {
    wx.showActionSheet({
      itemList: ['我收藏的影评','我发布的影评'],
      success: res => {
        let index = res.tapIndex
        console.log(index)
        if (index === 0) {
          wx.showToast({
            title: '收藏',
          }) 
          this.setData({
            tips:"我收藏的影评",
            status: "收藏"
          })
        } else {
          wx.showToast({
            title: '发布',
          })
          this.setData({
            tips:"我发布的影评",
            status: "发布"
          })
        }
        
      },
      fail: err =>  {
        console.log(err)
      }
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
    this.getStarList()
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