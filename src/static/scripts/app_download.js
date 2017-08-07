var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1,// IE内核
            presto: u.indexOf('Presto') > -1,// opera内核
            webKit: u.indexOf('AppleWebKit') > -1,// 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,// 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),// 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),// ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,// android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,// 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1// 是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var isWeixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();

function loadHtml(){
    var div = document.createElement('div');
    div.id = 'weixin-tip';
    div.innerHTML = '<p><img src="../static/images/live_weixin.png" alt="微信打开"/></p>';
    document.body.appendChild(div);
}

function loadStyleText(cssText) {
    var style = document.createElement('style');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    try {
        style.appendChild(document.createTextNode(cssText));
    } catch (e) {
        style.styleSheet.cssText = cssText; //ie9以下
    }
    var head=document.getElementsByTagName("head")[0]; //head标签之间加上style样式
    head.appendChild(style);
}
var cssText = "#weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: center; margin-top: 10%; padding:0 5%;}";
if(isWeixin){
    loadHtml();
    loadStyleText(cssText);
}


if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    window.location.href="https://itunes.apple.com/cn/app/yin-yang-shi-wang-yi-he-feng/id1190031013?mt=8";
} else if (browser.versions.android) {
    window.location.href="http://download.emagroup.cn/cydzz/packages/CY_emagroup.apk";
}
// document.writeln("语言版本: " + browser.language);
// document.writeln(" 是否为移动终端: " + browser.versions.mobile);
// document.writeln(" ios终端: " + browser.versions.ios);
// document.writeln(" android终端: " + browser.versions.android);
// document.writeln(" 是否为iPhone: " + browser.versions.iPhone);
// document.writeln(" 是否iPad: " + browser.versions.iPad);
// document.writeln(navigator.userAgent);