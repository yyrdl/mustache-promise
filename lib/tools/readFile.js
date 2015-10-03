/*
* Created By zj on 2015/9/30
* */
var fs=require("fs");
var readFile=function(path){
    return new Promise(function(resolve,reject){
            var rs = fs.createReadStream(path);
            var str = "";
            rs.on('readable', function () {
                var d = rs.read();
                if (d) {
                    if ((typeof d) == 'string')
                        str += d;
                    else
                    if ((typeof d) == 'object' && (d instanceof Buffer))
                        str += d.toString('utf8');
                }
            });
            rs.on("error", function (err) {
               reject(err);
            });

            rs.on("end", function () {
                resolve(str);
            });
    });
}
exports.readFile=readFile;