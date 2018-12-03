let commentType

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail: null,
    movieId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("movie detail: 正在进入电影详情...")
    this.setData({
      movieId: Number(options.id) 
    })
    this.getMovieDetail(this.data.movieId) //获取电影详情
  
    console.log("movie detail: 电影详情加载完毕！")
  },

 //获取电影详情
  getMovieDetail(movieId) {
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

  //添加评论函数，按键捕获
  addComment() {
    console.log("movie detail: 开始文字评论..")
    let movieId = this.data.movieId

    //弹出选择框，并且做出相应的操作
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
        //选择完成之后跳转到编辑评论的页面，并且传递参数电影id和评论的类型
        wx.navigateTo({
          url: `../comment-edit/comment-edit?id=${movieId}&commentType=${commentType}`,
        })
        // console.log(typeof (movieId), typeof (commentType))
        console.log("movie detail: 正在跳转到影评编辑页面...")
      },
      fail(err) {
        console.log(err.errMsg)
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