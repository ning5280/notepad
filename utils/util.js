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
  wx.showLoading({title:"正在加载中"});
  wx.request({
    url: e.url, //仅为示例，并非真实的接口地址
    data: e.data,
    header: {
        'content-type': 'application/json' 
    },
    success: function(res) {
       wx.hideLoading();
       if(res.data.code=='1'){
        e.success(res);
       }else{
         wx.showToast({ 
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
       }
    },
    fail:function(){
       wx.showToast({ 
          title: '请求失败，请稍后再试',
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
