// ==UserScript==
// @name 自动填充
// @namespace http://wuchaofei.top
// @match https://pan.baidu.com/share/*
// @grant none
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

// 参考 https://www.cnblogs.com/fangsmile/p/8028940.html
jQuery.noConflict(); //将$符所有权剔除
var $$=jQuery;

$$(function () {
    if($$("#fkbQ5Wq").length>0){
        // $$("#fkbQ5Wq").val();
        //覆盖浏览器粘贴事件
        document.addEventListener('paste', function (e) {
            var clipboardData = e.clipboardData;
            if (!(clipboardData && clipboardData.items)) {//是否有粘贴内容
                alert("剪贴板没有内容")
                return;
            }
            for (var i = 0, len = clipboardData.items.length; i < len; i++) {
                var item = clipboardData.items[i];
                if (item.kind === "string" && item.type == "text/plain") {
                    item.getAsString(function (str) {
                        // str 是获取到的字符串,创建文本框
                        //处理粘贴的文字内容
                    })
                } else if (item.kind === "file") {//file 一般是各种截图base64数据
                    var pasteFile = item.getAsFile();
                    // pasteFile就是获取到的文件
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var base64Img = event.target.result;
                    }; // data url
                    reader.readAsDataURL(pasteFile);
                }
                var copy_content = e.clipboardData.getData('text/plain');
                $$("#fkbQ5Wq").val(copy_content);
                $$("#uivs0k6Q").trigger("click");
            }
        })
    }
});
