/**
 * 前端单独的微信分享签名
 */
var shareApi = "http://xsbj.borgward.com.cn/xsbj/borgward_wxshare.php?env=prod";
var appMessageTitle = "宝沃圣经 (V2.1)";
var timelineTitle = "宝沃圣经 (V2.1)";
var shareDesc = "读宝沃圣经，领略汽车真谛！";
var appMessageLink = 'http://h5.borgward.com.cn/bible/index.html';
var timelineLink = 'http://h5.borgward.com.cn/bible/index.html';
var appMessageImgUrl = "http://h5.borgward.com.cn/bible/assets/img/v2/thumb.jpeg";
var timelineImgUrl = "http://h5.borgward.com.cn/bible/assets/img/v2/thumb.jpeg";
$(function() {
    setupJSSDK(shareApi)
});
function setShareFirendTitle(title) {
    console.log("分享给好友-标题:" + title);
    setTitle("appMessage", title)
}
function setShareFirendMsg(msg) {
    console.log("分享给好友-描述:" + msg);
    setDesc(msg)
}
function setShareFirendsTitle(title) {
    console.log("分享给朋友圈-标题:" + title);
    setTitle("timeline", title)
}
function setShareImg(url) {
    console.log("wx 分享图标:" + url);
    setImgUrl("timeline", url);
    setImgUrl("appMessage", url)
}
function setShareURL(url) {
    console.log("wx 分享URL:" + url);
    setLink("timeline", url);
    setLink("appMessage", url)
}
function setShareData(value) {
    console.log("setShareData 暂未实现 :");
    var url = shareURL + "?p=" + value;
    setShareURL(url)
}
function getShareData(key="p") {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2])
    }
    return null
}
var oauthInfo = {};
function setupOAuth(wxInfo="visitorWeChatInfo") {
    var info = window[wxInfo];
    if (info) {
        openid = info.openid;
        nickname = info.nickname;
        sex = info.sex;
        headimgurl = info.headimgurl;
        oauthInfo = info
    }
}
function getUserData(key) {
    return oauthInfo["key"]
}
var ossProUri = "";
var shareURL = "";
var openid = "";
var nickname = "";
var sex = "1";
var headimgurl = "";
function setupJSSDK(api, apiList=["onMenuShareTimeline", "onMenuShareAppMessage"]) {
    $.ajax({
        type: "POST",
        url: api,
        dataType: "json",
        data: {},
        async: true,
        success: function(result) {
            console.log("" + result['signature']);
            wx.config({
                appId: result['appId'],
                timestamp: result['timestamp'],
                nonceStr: result['nonceStr'],
                signature: result['signature'],
                jsApiList: apiList
            });
            console.log("获取签名成功!");
            setShareURL(appMessageLink)
        },
        error: function(message) {
            console.log("获取签名失败：", message)
        }
    })
}
function setTitle(type, title) {
    switch (type) {
    case 'appMessage':
        appMessageTitle = title;
        break;
    case 'timeline':
        timelineTitle = title;
        break
    }
    ShareWeixin(type, title)
}
function setDesc(desc) {
    shareDesc = desc;
    ShareWeixin('appMessage', null, desc)
}
function setLink(type, link) {
    switch (type) {
    case 'appMessage':
        appMessageLink = link;
        break;
    case 'timeline':
        timelineLink = link;
        break
    }
    ShareWeixin(type, null, null, link)
}
function setImgUrl(type, imgUrl) {
    switch (type) {
    case 'appMessage':
        appMessageImgUrl = imgUrl;
        break;
    case 'timeline':
        timelineImgUrl = imgUrl;
        break
    }
    ShareWeixin(type, null, null, null, imgUrl)
}
function ShareWeixin(type, title, desc=null, link=null, imgUrl=null) {
    wx.ready(function() {
        // console.log("wx ready!");
        shareDesc = '读宝沃圣经，领略汽车真谛！';
        appMessageImgUrl = "http://h5.borgward.com.cn/bible/assets/img/v2/thumb.jpeg";
        // $("#audio")[0].play();
        wx.onMenuShareTimeline({
            title: timelineTitle,
            link: timelineLink,
            imgUrl: timelineImgUrl,
            success: function() {},
            cancel: function() {}
        });
        wx.onMenuShareAppMessage({
            title: appMessageTitle,
            desc: shareDesc,
            link: appMessageLink,
            imgUrl: appMessageImgUrl,
            type: 'link',
            dataUrl: '',
            success: function() {
              // console.log('分享成功')
            },
            cancel: function() {}
        })
    })
}
