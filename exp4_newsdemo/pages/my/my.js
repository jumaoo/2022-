// pages/my/my.js
var common = require('../../utils/common.js')
Page({


  /**
   * 页面的初始数据
   */
  data: {
    //临时微信用户昵称和头像
    // nickName:'未登录',
    // src:'/images/index.png',
    //临时收藏夹新闻数据
    // newsList:[{
    //   id: '305670',
    //   title: '我校在第八届安徽省“互联网+”大学生创新创业大赛再创佳绩',
    //   poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
    //   add_date: '2022-08-11'
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    //如果已登录
    if(this.data.isLogin){
      //更新收藏列表
      this.getMyFavorites()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getMyFavorites:function(){
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;

    let myList = [];
    for(var i = 0;i <num;i++){
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    //更新收藏列表
    this.setData({
      newsList:myList,
      num:num
    });
  },


  //获取微信用户信息
  getMyInfo:function(e){
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          isLogin:true,
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
    //获取收藏列表
    this.getMyFavorites();
    //console.log(e.detail.userInfo)
  },

  goToDetail:function(e){
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻ID进行页面跳转
    wx.navigateTo({
      url:'../detail/detail?id='+id
    })
  }
})