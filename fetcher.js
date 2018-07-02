// ==UserScript==
// @name 从多页面取数据
// @namespace http://wuchaofei.top
// @match http://www.ai111.vip/thread-349-1-1.html
// @grant none
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

jQuery.noConflict(); //将$符所有权剔除
var $$=jQuery;

$$(function () {
    var urls=[
        "http://www.ai111.vip/thread-340-1-1.html",
        "http://www.ai111.vip/thread-342-1-1.html"
    ];
    try{
        var iframe = document.createElement('<iframe name="ifr" id="ifr"></iframe>');
    }catch(e){
        var iframe = document.createElement('iframe');
        iframe.name = 'ifr';
        iframe.id="ifr";
    }
    iframe.src=urls[0];
    document.body.appendChild(iframe);


    function httpString(s) {
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        // var reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        //var reg= /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        //v = v.replace(reg, "<a href='$1$2'>$1$2</a>"); //这里的reg就是上面的正则表达式
        //s = s.replace(reg, "$1$2"); //这里的reg就是上面的正则表达式
        s = s.match(reg);
        console.log(s)
        return(s)
    }
    var findKeyValue=function(data){
        var txt="本帖隐藏的内容链接:https://pan.baidu.com/s/1ZbWqFnsUFkfdlDoSSK8kNw  密码:tbew";
        return {
            key:httpString(txt)[0],
            value:txt.substring(txt.length-4)
        }
    }

    // 执行索引
    var start=0, end=urls.length-1;
    document.getElementById('ifr').onload=function(){
        var res=$$('#ifr').contents().find(".showhide").text();
        console.info(res);

        console.log(findKeyValue(res));

        setTimeout(function(){
            if(start<end){
                iframe.src=urls[start++];
            }
        },1000)
    };



});


/*
	function httpString(s) {
			var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
			s = s.match(reg);
			return(s)
	}
	function findKeyValue(txt){
		return {
			key: httpString(txt)[0],
			value: txt.substring(txt.length-4)
		}
	}
	*/