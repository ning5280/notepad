function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function myAjax(e){
  // 目前不太支持
  // wx.showLoading({title:"正在加载中"});
  wx.showToast({
    title:"正在加载中..",
    icon:'loading',
    mask:true,

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
}


module.exports = {
  formatTime: formatTime,
  myAjax:myAjax
}
