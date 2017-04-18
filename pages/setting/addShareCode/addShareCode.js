// pages/setting/addShareCode/addShareCode.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  back:function(){
    wx.switchTab({
      url:"/pages/setting/setting"
    })
  },
  formSubmit: function(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var code = util.trim(e.detail.value.code);
     if(!code){
       wx.showToast({ 
        title: '便签名不能为空',
        icon: 'success',
        duration: 2000
      })
    }else{
   
      app.myAjax({
        url:'https://ning5280.duapp.com/public/index.php/index/user/editCode',
        data:e.detail.value,
        method:'post',
        success:function(res){
              app.globalData.myUserInfo.share_word=code;
             wx.getUserInfo({
               success:function(res){
                  app.globalData.userInfo = res.userInfo
               }
             })
            wx.switchTab({
              url:"/pages/setting/setting"
            })
        }
      })
    }
  }
})