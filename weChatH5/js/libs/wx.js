function canRunES6(code) {
    try {
        (new Function(code))();
        return true;
    } catch(err) {
        return false;
    }
}

if(!canRunES6('let a = 1;')){
    alert('微信/浏览器版本太低，请先升级');
}

wx.Timestamp = "";
wx.Noncestr = "";
wx.Signature = "";
wx.Appid = "";

/* 此处容易出错的地方是，当页面隐式请求index.html而不是显式请求的时候，会发生接口调用失败config: invalid signture(后期加个判断）. */
function  initParam() {
    /* 获取微信接口参数 */
    var host = window.location.host;
    var hostParams =  location.href.split('#')[0];
    var currentUrl = "http://h5.lt3d.cn/h5/sign.php?url="+encodeURIComponent(hostParams);
    $.ajax({
        type:"get",
        async:true,
        url:currentUrl,
        success:function (data) {
            var wxParams = JSON.parse(data);
            wx.Timestamp = wxParams["Timestamp"];
            wx.Noncestr = wxParams["Noncestr"];
            wx.Signature = wxParams["Signature"];
            wx.Appid = wxParams["Appid"];

            wx.config({
                debug: false,
                appId: wx.Appid,
                timestamp: wx.Timestamp,
                nonceStr: wx.Noncestr,
                signature: wx.Signature,
                jsApiList: [
                    'scanQRCode',
                    'onSearchBeacons',
                    'stopSearchBeancons',
                    'startMonitoringBeacons',
                    'stopMonitoringBeacons',
                    'onBeaconsInRange',
                    'startSearchBeacons',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });
        },
        errors:function (err) {
            console.log("get wxAPI error: "+err);
        }
    });
}
