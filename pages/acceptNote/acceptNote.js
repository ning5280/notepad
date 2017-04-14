// pages/acceptNote/acceptNote.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    noteList:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs' 
    }) 
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: '',  //仅为示例，并非真实的接口地址 
      data: {
       
      },
      header: {
          'content-type': 'application/json' 
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          noteList:res.data
        })
      }
    })
  },

  login:function(){
    app.login();
  }

})
