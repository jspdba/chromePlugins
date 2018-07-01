// ==UserScript==
// @name 自动回复
// @namespace http://wuchaofei.top
// @match http://www.ai111.vip/*
// @grant none
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

jQuery.noConflict(); //将$符所有权剔除
var $$=jQuery;



$$(function () {

    $$(document.body).bind({
        copy: function(e) {//copy事件
            var cpTxt = $$("body").data("cp");
            var clipboardData = window.clipboardData; //for IE

            if (!clipboardData) {
                clipboardData = e.originalEvent.clipboardData;
            }

            var cp = clipboardData.getData('Text'); //可以获取用户选中复制的数据
            if(!cp){
                clipboardData.setData('Text', cpTxt);
            }
            return false;//否则设不生效
        }
    });



    if($$(".locked").length>0){
        $$(".locked").find("a").click();
        setTimeout(function(){
            $$("#postmessage").val("xxxxxxxx").trigger("click");
            $$("#postsubmit").trigger("click");
            $$(".scrolltopa").trigger("click");
            setTimeout(function(){
                // 在这里复制代码
                var txt=$$(".showhide").text();
                if(txt){
                    txt=txt.substring(txt.length-4);
                    console.log(txt);
                    $$("body").data("cp", txt);
                }else{
                    window.location.reload();
                }

            },300);
        },300);
    }else{
        var txt=$$(".showhide").text();
        if(txt){
            txt=txt.substring(txt.length-4);
            console.log(txt);
            $$("body").data("cp", txt);
        }
    }

});
