# mustache-promise

##简介
[mustache](https://github.com/janl/mustache.js)库原生不支持从文件读取模板,这在某些时候操作起来就会有诸多不便，遂将`mustache`特别包装了一下，以方便
使用

##Install From NPM
```javascript
   npm install mustache-promise
```
##用法
```javascript
  //Created By zj on 2015/10/3

  var Mustache=require("mustache-promise");
  var path=require("path");

  var view={
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

  var mst_pro=new Mustache();//初始化一个mustache-promise对象

  //设置模板目录，并读取模板，load的俩个参数对应mustache.render()的第一和第三个参数
  // "base","user"都是文件名，无需加后缀名，后缀名默认是.mustache
  mst_pro.dir(path.join(__dirname,"./views")).load("base",{
      "user":"user"
  });

  //使用mst_pro.ok().then(),确保相应的模板已经加载完成

  mst_pro.ok().then(function(){
      mst_pro.parse();//对应原来的mustache.parse()，即缓存主模板的解析树
  });

  mst_pro.ok().then(function(){
      var out=mst_pro.render(view);//使用数据渲染模板
      console.log(out);
  });

  setTimeout(function(){
      mst_pro.ok().then(function(){
          var out=mst_pro.render(view2);//再次使用不同的数据渲染模板
          console.log(out);
      });
  },2000);

```
## .dir()方法
设置模板文件所在目录

## .load(base,partials)方法
从文件加载模板

## .ok()
确保模板已经加载完，返回一个promise

## .parse()
没有参数，对应`mustache`的`parse`方法，即解析并保存解析树

## .render(data)
根据数据渲染模板，返回渲染后的结果

## .extName(name)
设置`mustache`模板的扩展名,默认是`.mustache`

## 重要的属性
* base
这个属性里面存的的主模板的内容

* partials
这个属性里存的是主模板里面引用的外部模板的内容，格式与`mustache`一样

##你也可以这样用

```javascript
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

mst_pro.parse();

var out=mst_pro.render(view1);
console.log(out);
```

