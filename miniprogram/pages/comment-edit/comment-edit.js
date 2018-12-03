const db = wx.cloud.database()
const _ = db.command
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: {},  //电影详情
    id: null,        //上一个页面传过来的id
    commentType: null,  //评论的类型
    commentValue: null, //评论的文字内容
    isRecord: false,  //录音状态字
    src: '' //音频评论链接
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("comment edit：正在进入编辑影评页面...")
    // console.log(options)
    this.setData({
      id: Number(options.id),
      commentType: options.commentType
    })
    this.getMovieInfo(this.data.id)
    console.log("comment edit：编辑影评页面加载完成！")
    if (options.commentType == 'audio') {
      this.recorderHander()
    }
  },


  //根据id下载电影信息
  getMovieInfo(id) {
    wx.cloud.callFunction({
      name: 'movieInfo',
      data: {
        id: id
      },
      success: res => {
        console.log(res.result.data)
        this.setData({
          movieInfo: res.result.data[0]
        })
      },
      fail: err => {
        console.error('[云函数] [movieInfo] 调用失败', err)
      }
    })
  },

  onInputComment(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  // play() {
  //   innerAudioContext.src = this.data.content;
  //   console.log("audioo")
  //   innerAudioContext.play()
  // },

  //完成
  done() {
    let avatar = app.globalData.userInfo.avatarUrl
    let username = app.globalData.userInfo.nickName
    let content = this.data.commentValue
    let type = this.data.commentType
    let user = app.globalData.openid
    let movieId = this.data.id


    if (content) {
      wx.navigateTo({
        url: `../comment-preview/comment-preview?id=${movieId}&type=${type}&content=${content}`,
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请填写评论！',
      })
    }
    // console.log(app.globalData)
    console.log("comment edit: 开始预览影评...")
  },



  //录制音频函数，监听前端的音频输入
  record() {
    let isRecord = !this.data.isRecord

    this.setData({
      isRecord
    })

    //如果isRecord位true,表示开始录音，反之，停止录音
    if (isRecord) {
      recorderManager.start()
      wx.showToast({
        title: '开始录音!',
      })
    } else {
      recorderManager.stop()
    }
  },


  //录音监听器，监听录音事件
  recorderHander() {
    var that = this;
    recorderManager.onError(() => {
      that.tip("录音失败！")
    });
    recorderManager.onStop(res => {
      that.setData({
        commentValue: res.tempFilePath
      })
      console.log(res.tempFilePath)
      that.tip("录音完成！")
    });

    innerAudioContext.src = this.data.content;
    // this.innerAudioContext.play()
    // innerAudioContext.onError(res => {
    //   that.tip("播放录音失败！")
    // })
  },

  //录音事件提示函数
  tip(msg) {
    wx.showToast({
      title: msg,
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