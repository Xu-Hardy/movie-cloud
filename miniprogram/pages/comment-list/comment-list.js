const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("comment list: 正在电影评论...")
    console.log(options)
    let id = Number(options.id)
    this.setData({
      id
    })
    this.getMovieCommet(id)
    console.log("comment list: 电影评论加载完成！")
  },

  getMovieCommet(id) {
    wx.cloud.callFunction({
      name: 'getMovieComment',
      data: {
        id: id
      },
      success: res => {
        console.log(res.result.data)
        this.setData({
          comments: res.result.data
        })
      },
      fail: err => {
        console.error('[云函数] [getMovieComment] 调用失败', err)
      }
    })
  },

  //点击播放音频
  playAudio(event) {
    wx.showToast({
      title: '开始!',
    })
    let index = event.currentTarget.dataset.index
    innerAudioContext.src = this.data.comments[index].content;
    console.log(this.data.comments[index])
    console.log(this.data.comments[index].content)
    console.log(index)
    innerAudioContext.play()
    wx.showToast({
      title: '播放成功',
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