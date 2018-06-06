var weixin_jssdk_ops = {
    init: function () {
        this.initJSconfig();
    },
    shareCbf: function () {
    },
    friTitle: '宝沃品牌圣经',
    friDesc: '中国新造车势力X-Force',
    initJSconfig: function () {
        $.ajax({
            url: 'https://api.happy-share.cn/jssdk/?url=' + encodeURIComponent('http://borgward.x-w-t.com/?from=singlemessage&isappinstalled=0'),
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    var appId = data.data.appId;
                    var timestamp = data.data.timestamp;
                    var nonceStr = data.data.nonceStr;
                    var signature = data.data.signature;
                    wx.config({
                        debug: false,
                        appId: appId,
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        signature: signature,
                        jsApiList: [
                            'onMenuShareTimeline', 'onMenuShareAppMessage'
                        ]
                    });
                    weixin_jssdk_ops.ready();
                    wx.error(function (res) {
                        //console.log(res);
                    });
                }
            }
        });
    },
    ready: function(){
        wx.ready(function () { 
            var img = 'http://test.goaksoft.cn/bw/assets/img/bw_logo.jpg';//分享图片路径
            var link = window.location.href;

            wx.onMenuShareTimeline({
                title: weixin_jssdk_ops.friTitle,
                imgUrl: img,
                link: link,
                success: function () {
                    weixin_jssdk_ops.shareCbf();
                },
                cancel: function () {
                }
            });
            wx.onMenuShareAppMessage({
                title: weixin_jssdk_ops.friTitle,
                desc: weixin_jssdk_ops.friDesc,
                link: link,
                imgUrl: img,
                type: 'link',
                success: function () {

                },
                cancel: function () {
                }
            });

        });
    },
    hideMenuItems: function () {
        wx.ready(function () {
            wx.hideAllNonBaseMenuItem();
        });
    }
};