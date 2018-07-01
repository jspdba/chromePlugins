// ==UserScript==
// @name 自动保存百度网盘地址
// @namespace http://wuchaofei.top
// @match https://pan.baidu.com/s/*
// @run-at document-end
// @grant none
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==


jQuery.noConflict(); //将$符所有权剔除
var $$=jQuery;

$$(function () {
    setTimeout(function(){
//		var  startTip=jQuery(".video-start-tip").is(":visible");
//    	var  overTip=jQuery(".video-over-tip").is(":visible");
        var save=jQuery(".save-to-pan").is(":visible");
        // 如果需要保存，则执行一些操作
        if(save){
            $$(".icon-save-disk").trigger("click");
            setTimeout(function(){
                $$("div.save-path-item").trigger("click");
                $$(".dialog-footer").find("a").get(1).click();
            },500);
        }
    },500);
});