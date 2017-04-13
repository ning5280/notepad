//app.js
var util = require('utils/util');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }, 
  onLaunch: function() {
    if(wx.getStorageSync('session_key'))return false;
    wx.login({
      success: function(res) {
        console.log(res);
        if (res.code) {
          // 发起网络请求
          util.myAjax({
            url: 'https://ning5280.duapp.com/public/index.php/index/login/index',
            data: {
              code: res.code
            },
            success:function(res){
              // var data = res.data.data;
              // console.log(data);
              // 保存返回的 key;
               wx.setStorageSync('session_key', res.data.data.openid);
           
               console.log(wx.getStorageSync('session_key')+'1111')
               if(res.data.code=='3')return false;
               if(res.data.code=='0'){
                 wx.showToast({ 
                  title: '登录失败',
                  icon: 'success',
                  duration: 2000
                })
               }
            
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  globalData:{
    userInfo:null
  }
})