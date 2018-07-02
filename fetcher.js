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
        "http://www.ai111.vip/thread-344-1-1.html",
        "http://www.ai111.vip/thread-348-1-1.html"
    ]
    try{
        var iframe = document.createElement('<iframe name="ifr" id="ifr"></iframe>');
    }catch(e){
        var iframe = document.createElement('iframe');
        iframe.name = 'ifr';
        iframe.id="ifr";
    }
    iframe.src=urls[0];
    document.body.appendChild(iframe);

    var index=0;
    try{
        document.getElementById('ifr').onload = function(){
            var res=$$('#ifr').contents().find(".showhide").text();
            console.log(res)
            index=index+1;
            console.log(index, urls.length)
            if(index<urls.length){
                iframe.src=urls[index];
                console.info("reload iframe")
            }
        }
    }catch(e){
        console.log(e)
    }

});