//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  onTap: function() {
      var session_key=wx.getStorageSync('session_key');
      if(!session_key){
        wx.showToast({ 
          title: '您未授权登录',
          icon: 'success',
          duration: 2000
        })
        return false;
      }

    app.myAjax({
      url: 'https://ning5280.duapp.com/public/index.php/index/user/info',
       data: {
       _: (new Date()).getTime()
      },
      method:'post',
      success:function(res){
        console.log(res);
        if(res.data.code=='1'){
          app.globalData.myUserInfo=res.data.data;
        }
         wx.switchTab({
            url: '../myNote/myNote'
          })
         
      }
    })

   
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

   

  }
})
