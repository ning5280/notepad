// pages/add/index.js
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
      url:"/pages/myNote/myNote"
    })
  },
   formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
     if(!e.detail.value.title){
       wx.showToast({ 
        title: '标题不能为空',
        icon: 'success',
        duration: 2000
      })
    }else{
   
      app.myAjax({
        url:'https://ning5280.duapp.com/public/index.php/index/notepad/add',
        data:e.detail.value,
        method:'post',
        success:function(res){
         
            wx.switchTab({
              url: '../myNote'
            })
        }
      })
    }
  }

})