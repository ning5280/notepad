// pages/setting/setting.js
var app = getApp()
Page({
  data:{
    userInfo:app.globalData.userInfo
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    console.log(this.data);
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
  }
})