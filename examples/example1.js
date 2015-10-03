/*
* Created by zj on 2015/10/2
* */

var Mustache=require("mustache-promise");
var path=require("path");

var view1={
    show:true,
    names:[{
        "name":"zj"
    },{
        "name":"yyrdl"
    }],
    st:function(){
      return this.show;
    }
};

var view2={
    "names":[{"name":"zj"}],
    "st":true
};

var mst_pro=new Mustache();

mst_pro.dir(path.join(__dirname,"./views")).load("base",{
    "user":"user"
});

mst_pro.ok().then(function(){
    var out=mst_pro.render(view1);
    console.log(out);
});

setTimeout(function(){
    mst_pro.ok().then(function(){
        var out=mst_pro.render(view2);
        console.log(out);
    });
},2000);




