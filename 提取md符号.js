// ==UserScript==
// @name 提取table
// @namespace http://wuchaofei.top
// @grant none
// ==/UserScript==


(function () {
    var sel = "#article_content > div > div > table";

    var table = [];
    $(sel).find("tr").each(function (i, data) {
        var tr = [];
        $("td", $(data)).each(function (i1, data1) {
            var txt = $(data1).text().trim();
            tr.push(txt)
        })
        table.push({
            fuhao: tr[0],
            shuoming: tr[1],
            bianma: tr[2]
        })
    });
    // console.info(JSON.stringify(table));


    var str="符号|说明|编码\n";
    str+=":-|:-|:-\n";
    for (var i = 1; i <table.length; i++) {
        str+=(table[i].bianma+"|"+table[i].shuoming+"|"+"\\"+table[i].bianma+"\n")
    }
    console.info(str);
})();
