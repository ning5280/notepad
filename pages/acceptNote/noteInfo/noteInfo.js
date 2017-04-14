// pages/acceptNote/noteInfo/noteInfo.js
var util = require('../../../utils/util');
var app = getApp();
Page({
  data:{
    info:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    app.myAjax({
        url:'https://ning5280.duapp.com/public/index.php/index/sharenotepad/info',
        data:{
          id:options.id,
           _: (new Date()).getTime()
          },
         method:'post',
         success:function(res){
            that.setData({
              info:res.data.data
            })
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
  },
  onUnload:function(){
    // 页面关闭
  }
})