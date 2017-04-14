// pages/setting/setting.js
var app = getApp();
Page({
  data:{
    userInfo:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.setData({
      userInfo:app.globalData.userInfo,
      // myUserInfo:app.globalData.myUserInfo
    })

    app.myAjax({
      url: 'https://ning5280.duapp.com/public/index.php/index/user/info',
       data: {
       _: (new Date()).getTime()
      },
      method:'post',
      success:function(res){
        console.log(res);
        if(res.data.code=='1'){
          that.setData({
            myUserInfo:res.data.data
          })
        }
         
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
   
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    console.log('onHide');
    return false;
  },
  onUnload:function(){
    // 页面关闭
    console.log('onUnload');
  },
  setCode:function(){
    wx.redirectTo({
      url:'addShareCode/addShareCode'
    })
  }
})