/*
* Created By zj on 2015/10/2
* */

var Mustache=require("mustache-promise");

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

var mst_pro=new Mustache();

mst_pro.base="<h2>Names</h2>"+
    "{{#st}}"+
    "{{#names}}"+
    "{{> user}}"+
    "{{/names}}"+
    "{{/st}}";

mst_pro.partials={
    "user":"<strong>{{name}}</strong>"
};

var out=mst_pro.render(view1);
console.log(out);
