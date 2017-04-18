// pages/myNote/shareNote/shareNote.js
var app = getApp();

Page({
  data:{
    id:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   
     this.setData({
        id:options.id
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
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
   
     if(!e.detail.value.code){
       wx.showToast({ 
        title: '便签名不能为空',
        icon: 'success',
        duration: 2000
      })
    }else{
   var share_name = app.globalData.userInfo.nickName;
      app.myAjax({
        url:'https://ning5280.duapp.com/public/index.php/index/Sharenotepad/add',
        data:{'share_word':e.detail.value.code,'aid':that.data.id,'share_name':share_name},
        method:'post',
        success:function(res){
           var userInfo= app.globalData.userInfo;

            wx.switchTab({
              url:"/pages/myNote/myNote"
            })
        }
      })
    }
  }
})