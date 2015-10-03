
/*
* Created By ZJ on 2015/10/2
* */
var Mustache=require("mustache");
var tools=require("./lib/tools");
var path=require("path");

function Mustache_Promise(){
    var self=this;
    self.dir_="";
    self.base="";
    self.partials={};
    self._mustache=Object.create(Mustache);
    self._extName=".mustache";
    self._resolve_="";
    self._ok_=new Promise(function(resolve){
        self._resolve_=resolve;
    });
};
Mustache_Promise.prototype.ok=function(){
    var self=this;
    return self._ok_;
}
Mustache_Promise.prototype.dir=function(dir){
    var self=this;
    self.dir_=dir;
    return self;
};
Mustache_Promise.prototype.extName=function(name){
    var self=this;
    self._extName=name;
    return self;
}

Mustache_Promise.prototype.load=function(base,partials){
    var self=this;
    self._ok_=new Promise(function(resolve){
        self._resolve_=resolve;
        return self;
    });
    var tar=[{"name":"base","path":path.join(self.dir_,base+self._extName),"base":true}];
    for(var p in partials){
        var obj={
            "name":p,
            "path":path.join(self.dir_,partials[p]+self._extName)
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
    Promise.all(tasks).then(function(results){
        var base_c="",partials_c={};
        results.forEach(function(item){
            if(item.base){
                base_c=item.content;
            }else{
                partials_c[item.name]=item.content;
            }
        });
        self.base=base_c;
        self.partials=partials_c;
        self._resolve_();
    });
}
Mustache_Promise.prototype.parse=function(){
    var self=this;
    self._mustache.parse(self.base);
    return self;
};

Mustache_Promise.prototype.render=function(view){
        var self=this;
        return self._mustache.render(self.base,view,self.partials);
}

module.exports=Mustache_Promise;