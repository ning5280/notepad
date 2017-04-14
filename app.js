

var util = require('utils/util');

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
     wx.showToast({
      title:"正在加载中..",
      icon:'loading',
      mask:true,
      duration:99999999
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res1) {
              that.globalData.userInfo = res1.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo);
           
            
              // 发起网络请求
                util.myAjax({
                  url: 'https://ning5280.duapp.com/public/index.php/index/login/index',
                  data: {
                    code: res.code,
                    wxname:that.globalData.userInfo.nickName
                  },
                  success:function(res){
                    // 保存返回的 key;
                    wx.setStorageSync('session_key', res.data.data.openid);
                
                    console.log(wx.getStorageSync('session_key'))
                    if(res.data.code=='3')return false;
                    if(res.data.code=='0'){
                      wx.showToast({ 
                        title: '登录失败',
                        icon: 'success',
                        duration: 2000
                      })
                    }

                    // 转跳到欢迎页
                    // wx.redirectTo({
                    //   url:'/pages/welcome/welcome'
                    // })
                  }
                })
           

            }
          })

        }
      })

      
    }
  },
  myAjax:function(e){
    var that = this;
    // 目前不太支持
    // wx.showLoading({title:"正在加载中"});
    wx.showToast({
      title:"正在加载中..",
      icon:'loading',
      mask:true,
      duration:99999999
    })

    e.data['session_key'] = wx.getStorageSync('session_key')?wx.getStorageSync('session_key'):'';
    wx.request({
      url: e.url, //仅为示例，并非真实的接口地址
      data: e.data,
      header: {
          'content-type': 'application/json' 
      },
      success: function(res) {
          //目前不太支持
        // wx.hideLoading();
          wx.hideToast()
        if(res.data.code=='1'){
          e.success(res);
        }else if(res.data.code=='2'){
          // 未登录
         that.globalData.userInfo=null;
          that.getUserInfo(function(userInfo){
            //更新数据
            that.globalData.globalData=userInfo;
          })
        }else{
        
          wx.showToast({ 
            title: res.data.message? res.data.message:'请求失败',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail:function(){
        //目前不太支持
        // wx.hideLoading();
      wx.hideToast()
        wx.showToast({ 
            title: '请求失败',
            icon: 'success',
            duration: 2000
          })
      }
    })
  },
  globalData:{
    userInfo:null,
    myUserInfo:null
  }


})