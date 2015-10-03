
/*
* Created By ZJ on 2015/10/2
* */
var Mustache=require("mustache");
var tools=require("./lib/tools");
var path=require("path");
function Mustache_Promise(){
    this.dir_="";
};

Mustache_Promise.prototype.dir=function(dir){
    var self=this;
    self.dir_=dir;
    return self;
};
Mustache_Promise.prototype.render=function(base,view,partials){
    var self=this;
    var tar=[{"name":"base","path":path.join(self.dir_,base),"base":true}];
    for(var p in partials){
        var obj={
            "name":p,
            "path":path.join(self.dir_,partials[p])
        };
        tar.push(obj);
    };
    var tasks=tar.map(function(item){
        return tools.readFile(item.path).catch(function(err){
             console.error(err.stack);
             return "";
        }).then(function(ct){
            var obj={
                "name":item.name,
                "content":ct
            };
            if(item.base)
            {
                obj.base=true;
            }
            return obj;
        });
    });
    return Promise.all(tasks).then(function(results){
       var base_c="",partials_c={};
        results.forEach(function(item){
             if(item.base){
                 base_c=item.content;
             }else{
                 partials_c[item.name]=item.content;
             }
        });
        return Mustache.render(base_c,view,partials_c);
    });
}

module.exports=new Mustache_Promise();