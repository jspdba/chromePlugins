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
    // 获取页面数据爬虫
    var fecher = {
        config:{
            start:1,
            end:0,
            formatType:'md',
        },
        iframe:null,
        datas:[],
        string:"",
        // 获取表格数据
        collectTableData:function(){
            var that=this;
            // 表格中的数据信息
            $$(".t_table").find("tr").each(function(i0,data0){
                var a=[];
                $$(data0).find("td").each(function(i1,data1){
                    var t=$$(data1).text().trim();
                    a.push(t);
                });
                var vedio = a[1].indexOf('视频')>0?true:false;
                that.datas.push({
                    "no":a[0],
                    "title":a[1],
                    "url":a[2],
                    "vedio":vedio,
                });
            });

        },
        // 执行结束的回调函数
        onFinish:function(){
            fecher.onRender();
            alert("运行结束")
        },
        // 提取url数组
        fetchUrls:function (s) {
            var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
            s = s.match(reg);
            return(s)
        },
        findKeyValue:function(txt){
            var data=fecher.fetchUrls(txt)
            return {
                key: data[0],
                value: txt.substring(txt.length-4)
            }
        },
        createIframe: function(url){
            try{
                this.iframe = document.createElement('<iframe name="ifr" id="ifr"></iframe>');
            }catch(e){
                this.iframe = document.createElement('iframe');
                this.iframe.name = 'ifr';
                this.iframe.id="ifr";
            }
            this.iframe.src = url;
            document.body.appendChild(this.iframe);

            // iframe加载完毕的回调
            document.getElementById('ifr').onload = this.onIframeLoad;
        },
        onCopy:function(e) {
            var cpTxt = fecher.string;
            var clipboardData = window.clipboardData; //for IE

            if (!clipboardData) { // for chrome
                clipboardData = e.originalEvent.clipboardData;
            }
            clipboardData.setData('Text', cpTxt);
            $$(document.body).unbind("copy", fecher.onCopy);
            return false;//否则设不生效
        },
        // 整理数据
        onRender:function(){
            if(fecher.config.formatType=='json'){
                fecher.string=JSON.stringify(fecher.datas);
            }else if(fecher.config.formatType=='md'){
                var str="课程序号|标题|下载地址|百度盘地址|密码\n";
                str+=":- | - | -| :-| :- \n"
                for (var i = 1; i < fecher.datas.length; i++) {
                    if(fecher.datas[i].vedio){
                        if(fecher.datas[i].pan){
                            str+=(fecher.datas[i].no+"|"+fecher.datas[i].title+"|"+fecher.datas[i].url+"|"+fecher.datas[i].pan.url+"|"+fecher.datas[i].pan.pass+"\n")
                        }else{
                            str+=(fecher.datas[i].no+"|"+fecher.datas[i].title+"|"+fecher.datas[i].url+"|-|-\n")
                        }
                    }else {
                        str+=(fecher.datas[i].no+"|"+fecher.datas[i].title+"|"+fecher.datas[i].url+"|-|-\n");
                    }
                }
                fecher.string = str;
            }else{
                fecher.string=JSON.stringify(fecher.datas);
            }
            $$(document.body).bind("copy", fecher.onCopy); //copy事件
        },
        // iframe加载完毕的回调函数
        onIframeLoad: function(){
            var res = $$('#ifr').contents().find(".showhide").text();
            if(!res){
                fetcher.onRender();
                alert("意外终止")
                return;
            }
            var pan = fecher.findKeyValue(res);

            console.log(pan);
            // 设置搜集到的数据
            fecher.datas[fecher.config.start]['pan']={
                url: pan.key,
                pass:pan.value
            };
            setTimeout(function(){
                // 寻找下一个视频
                do{
                    fecher.config.start = fecher.config.start+1;
                }while (!fecher.datas[fecher.config.start].vedio && fecher.config.start<fecher.config.end)

                if(fecher.config.start<fecher.config.end && fecher.datas[fecher.config.start].vedio){
                    // 获取下一个url
                    console.log(fecher.datas[fecher.config.start].url)
                    fecher.iframe.src = fecher.datas[fecher.config.start].url;
                }else{// 调用运行结束的回调
                    fecher.onFinish();
                }
            },500)
        },

        init:function () {
            // 先提取表格数据
            this.collectTableData();

            // 设置结束条件
            this.config.end = this.config.end || this.datas.length-1;
            // 创建 iframe, 并开始运行
            this.createIframe(this.datas[this.config.start].url);
            return this;
        }
    }
    // 开始运行
    fecher.init();
});