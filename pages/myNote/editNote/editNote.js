// pages/editNote/editNote.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data:{
    id:app.editNoteId,
    info:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    app.myAjax({
        url:'https://ning5280.duapp.com/public/index.php/index/notepad/info',
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
  },
    back:function(){
    wx.switchTab({
      url:"/pages/myNote/myNote"
    })
  },
   formSubmit: function(e) {
    if(e.detail.target.dataset.type=='share'){
      console.log(app.globalData);
      if(!app.globalData.myUserInfo.share_word ){
         wx.showToast({ 
            title: '请先设置您的便签名',
            icon: 'success',
            duration: 2000
          });
          return false;
      }
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
     if(!e.detail.value.title){
       wx.showToast({ 
        title: '标题不能为空',
        icon: 'success',
        duration: 2000
      })
    }else{
      e.detail.value['id']=app.editNoteId;
      app.myAjax({
        url:'https://ning5280.duapp.com/public/index.php/index/notepad/edit',
        data:e.detail.value,
        method:'post',
        success:function(res){
            if(e.detail.target.dataset.type=='share'){
                wx.redirectTo({
                  url: '../shareNote/shareNote?id='+app.editNoteId

                })
            }else{
              wx.switchTab({
                  url: '../myNote'
                })
            }
           
        }
      })
    }
  }

})