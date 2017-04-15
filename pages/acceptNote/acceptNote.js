//index.js
//获取应用实例
var util = require('../../utils/util');
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    noteList:{},
    startTime:0,
    inputShowed: false,
    inputVal: "",
    serachNoteList:{}
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
      url: 'https://ning5280.duapp.com/public/index.php/index/sharenotepad',  //仅为示例，并非真实的接口地址 
      data: {
       _: (new Date()).getTime()
      },
      header: {
          'content-type': 'application/json' 
      },
      success: function(res) {
       
        that.setData({
          noteList:res.data.data,
          serachNoteList:res.data.data,
        })
      }
    })
  },
  setTapStartTime : function () { 
      this.setData({ 
          startTime : Date.now() 
      }) 
  },
  noteInfo:function(e){
    // 如果时间长于200ms 则不处罚
    if(Date.now()-this.data.startTime>350)return false;
    app.editNoteId = e.currentTarget.dataset.id;
     wx.navigateTo({
        url: 'noteInfo/noteInfo?id='+app.editNoteId
      })
  },
  delNote:function(e){
    var id = e.currentTarget.dataset.id;
    var that =this;
       wx.showModal({
          title: '系统提示',
          content: '确定要删除此便签吗？',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
              if (res.confirm) {
                  // console.log('用户点击主操作')
                  app.myAjax({
                    url:'https://ning5280.duapp.com/public/index.php/index/sharenotepad/del',
                    data:{
                      id:id
                    },
                    method:'post',
                    success:function(res){
                      wx.showToast({ 
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000
                      })
                      that.onLoad();
                    }
                  })
              }else{
                  // console.log('用户点击辅助操作');
              }
          }
      });
  },
   showInput: function () {
   
        this.setData({
            inputShowed: true,
            

        });
    },
    hideInput: function () {
         var that = this;
        this.setData({
            inputVal: "",
            inputShowed: false,
            serachNoteList:that.data.noteList
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
      // 获取原始列表
        var noteList = this.data.noteList;
        var resultNoteList = [];
        var keyWord = util.trim(e.detail.value);
        for(let key in noteList){
          let title  =noteList[key]['title'];
          let content = noteList[key]['content'];
          if(title.indexOf(keyWord)>=0||content.indexOf(keyWord)>=0){
            resultNoteList.push(noteList[key]);
          }
        }
        this.setData({
            serachNoteList: resultNoteList
        });
    },
  login:function(){
    app.login();
  }

})
