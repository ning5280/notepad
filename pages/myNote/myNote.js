//index.js
//获取应用实例
var util = require('../../utils/util');
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    noteList:{},
     parseDate:function(ns){
         return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
      }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs' 
    }) 
  },
  onLoad: function () {
    var that = this;
   app.myAjax({
      url: 'https://ning5280.duapp.com/public/index.php/index/notepad',  //仅为示例，并非真实的接口地址 
      data: {
       _: (new Date()).getTime()
      },
      header: {
          'content-type': 'application/json' 
      },
      success: function(res) {
       
        that.setData({
          noteList:res.data.data
        })
      }
    })
  },
  addnotes:function(){
    wx.redirectTo({
      url: '../myNote/addNote/addNote'
    })

    // var noteList = this.data.noteList;
    // console.log(Object.prototype.toString.call(noteList));
    // noteList=noteList.concat([{'name':'1234','id':'12312','time':'2016-05-05'}]);
    // console.log(noteList);
    // this.setData({
    //   noteList:noteList
    // })
  },
  editNote:function(e){
    app.editNoteId = e.currentTarget.dataset.id;
     wx.redirectTo({
        url: '../myNote/editNote/editNote?id='+app.editNoteId
      })
  },
  login:function(){
    app.login();
  }

})
