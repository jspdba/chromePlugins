// ==UserScript==
// @name 抓取链接
// @namespace Violentmonkey Scripts
// @match https://blog.csdn.net/qq_33829547/article/details/*
// @grant none
// ==/UserScript==

// 测试链接
// https://blog.csdn.net/qq_33829547/article/details/80369320
// 暴力猴使用编辑器
// https://violentmonkey.github.io/2017/03/14/How-to-edit-scripts-with-your-favorite-editor/

//我的数据库
var IDb = {
    config:{
        name:'craw',
        version:1,
        db:null,
        data:null,
        callback:null,
        table:{
            url: 'url'
        }
    },
    init:function(data, callback){
        IDb.config.data = data;
        if(callback){
            IDb.config.callback=callback;
        }
        return this;
    },
    closeDB:function(){
        if(IDb.config.db){
            IDb.config.db.close();
        }
        if(IDb.config.callback){
            IDb.config.callback();
        }
    },
    deleteDB:function(name){
        IDb.config.db.deleteDatabase(name);
    },
    addData:function(storeName, callback){
        var transaction=IDb.config.db.transaction(storeName,'readwrite');
        var store=transaction.objectStore(storeName);

        var request;
        for (var i = 0; i < IDb.config.data.length; i++) {
            request = store.add(IDb.config.data[i]);
        }
        request.onsuccess = function(e){
            console.log("插入成功");
            if(callback){
                callback();
            }
        };
        request.onerror = function (e) {
            console.error(e.target.error)
            callback();
        };
    },
    getDataByKey:function(storeName,value){
        var transaction=IDb.config.db.transaction(storeName,'readwrite');
        var store=transaction.objectStore(storeName);
        var request=store.get(value);
        request.onsuccess=function(e){
            var student=e.target.result;
            console.log(student.name);
        };
    },
    updateDataByKey:function(storeName,value){
        var transaction=IDb.config.db.transaction(storeName,'readwrite');
        var store=transaction.objectStore(storeName);
        var request=store.get(value);
        request.onsuccess=function(e){
            var student=e.target.result;
            student.age=35;
            store.put(student);
        };
    },
    deleteDataByKey:function(storeName,value){
        var transaction=IDb.config.db.transaction(storeName,'readwrite');
        var store=transaction.objectStore(storeName);
        store.delete(value);
    },
    clearObjectStore:function(storeName){
        var transaction=IDb.config.db.transaction(storeName,'readwrite');
        var store=transaction.objectStore(storeName);
        store.clear();
    },
    deleteObjectStore:function(storeName){
        var transaction=IDb.config.db.transaction(storeName,'versionchange');
        IDb.config.db.deleteObjectStore(storeName);
    },
    fetchStoreByCursor:function(storeName){
        var transaction=IDb.config.db.transaction(storeName);
        var store=transaction.objectStore(storeName);
        var request=store.openCursor();
        request.onsuccess=function(e){
            var cursor=e.target.result;
            if(cursor){
                var current=cursor.value;
                console.log(current);
                cursor.continue();
            }else{
                console.log("--------查询结束-------------")
            }
        };
    },
    getDataByIndex:function(storeName){
        var transaction=IDb.config.db.transaction(storeName);
        var store=transaction.objectStore(storeName);
        var index = store.index("ageIndex");
        index.get(26).onsuccess=function(e){
            var student=e.target.result;
            console.log(student.id);
        }
    },
    getMultipleData:function(storeName){
        var transaction=IDb.config.db.transaction(storeName);
        var store=transaction.objectStore(storeName);
        var index = store.index("nameIndex");
        var request=index.openCursor(null,IDBCursor.prev);
        request.onsuccess=function(e){
            var cursor=e.target.result;
            if(cursor){
                var student=cursor.value;
                console.log(student.name);
                cursor.continue();
            }
        }
    },
    openDB:function(name,version) {
        var version=version || 1;
        var request=window.indexedDB.open(name,version);
        request.onerror=function(e){
            console.log(e.currentTarget.error.message);
            IDb.closeDB(IDb.config.db);
        };
        request.onsuccess=function(e){
            IDb.config.db=e.target.result;

//            查询数据
            console.log("-------------查询开始-------------")
            IDb.fetchStoreByCursor(IDb.config.table.url);

            // 插入数据
            IDb.addData(IDb.config.table.url,function () {
                IDb.closeDB();
            });

        };
        request.onupgradeneeded=function(e){
            var db = e.target.result;
            IDb.config.db=db;

            // 先删除objectStore后重建
            if(db.objectStoreNames.contains(IDb.config.table.url)){
                db.deleteObjectStore(IDb.config.table.url);
            }
//            重新创建objectStore
//            var store = db.createObjectStore(IDb.config.table.url, {autoIncrement: true});
//            store.createIndex('nameIndex','name',{unique:true});

            var store=IDb.config.db.createObjectStore(IDb.config.table.url, {autoIncrement: true});
            store.createIndex('urlIndex','url',{unique:true});
            store.createIndex('contextIndex','context',{unique:false});

            var transaction = event.target.transaction;
            transaction.oncomplete = function(event) {
                IDb.addData(IDb.config.table.url,function () {
                    IDb.closeDB();
                });
                console.log('DB version changed to '+version);
            };
        };
    },
    start: function () {
        IDb.openDB(IDb.config.name, IDb.config.version);
    }
};

$(function(){
    // $('p:contains("下一篇")').css('background','#e4393c');
//    $('p:contains("下一篇")').css('background','#e4393c');
//  window.location.href=$('p:contains("上一篇")').find("a").attr("href");
//
//  浏览器支持本地存储
//     if(window.localStorage){
//         console.log("可以存储数据在这里");
//     }
    var $a=$('p:contains("上一篇")').find("a");
    var url = $a.attr("href");
    var context = $a.text();
    console.log(context);
    var data=[{url:url,context:context,desc:context}];
    IDb.init(data,function () {
        if(url){
            setTimeout(function () {
                window.location.href = url;
            },500);
        }
    }).start();

});

