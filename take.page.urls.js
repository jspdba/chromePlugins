// ==UserScript==
// @name 抽取链接
// @namespace http://wuchaofei.top
// @match http://www.ai111.vip/*
// @grant none
// @run-at document-end
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==


jQuery.noConflict(); //将$符所有权剔除
var $$=jQuery;
$$(function () {

    $$(document.body).bind({
        copy: function(e) {//copy事件
            var cpTxt = $$("body").data("cp");
            var clipboardData = window.clipboardData; //for IE

            if (!clipboardData) { // for chrome
                clipboardData = e.originalEvent.clipboardData;
            }

            var cp = clipboardData.getData('Text'); //可以获取用户选中复制的数据
            console.log(cp)
            if(!cp){
                clipboardData.setData('Text', cpTxt);
                alert("复制成功")
            }else{
                e.select();
                document.execCommand("Copy"); //执行浏览器复制命令
            }

            return false;//否则设不生效
        },paste: function(e) {//paste事件
            var eve = e.originalEvent
            var cp = eve.clipboardData;
            var data = null;
            var clipboardData = window.clipboardData; // IE
            if (!clipboardData) { //chrome
                clipboardData = e.originalEvent.clipboardData
            }
            data = clipboardData.getData('Text');

            console.log(data)
        }

    });

    var t="";
    $$(".t_table").find("tr").each(function(i0,data0){
        var a=[];
        $$(data0).find("td").each(function(i1,data1){
            var t=$$(data1).text().trim();
            a.push(t);
        });
        var s = a.join("|");
        s+="\n";
        t+=s;
    });

    $$("body").data("cp",t);

});
