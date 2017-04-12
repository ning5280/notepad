//index.js
//获取应用实例
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
      url: 'http://127.0.0.1/data.php',  //仅为示例，并非真实的接口地址 
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
  addnotes:function(){
    var noteList = this.data.noteList;
    console.log(Object.prototype.toString.call(noteList));
    noteList=noteList.concat([{'name':'1234','id':'12312','time':'2016-05-05'}]);
    console.log(noteList);
    this.setData({
      noteList:noteList
    })
  },
  login:function(){
    app.login();
  }

})
