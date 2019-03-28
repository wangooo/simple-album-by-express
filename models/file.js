var fs=require("fs");
var util=require("util");

exports.getAllAlbums=function(callback){
    fs.readdir('./uploads',function(err,files){
        if(err){
            callback(null,err);
            return;
        }
        var allAlbums=[];
        (function iterator(i){
            if(i == files.length){
                callback(allAlbums,null);
                return;
            }
            fs.stat("./uploads/" + files[i] , function(err,stats){
                if(err){
                    callback(null,err);
                    return;
                }
                if(stats.isDirectory()&&files[i]!='.DS_Store'){
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
};

exports.getImages=function(albumName,callback){
    fs.readdir('./uploads/' + albumName,function(err,files){
        if(err){
            callback("没有找到uploads",null);
            return;
        }
        var allImages=[];
        (function iterator(i){
            if(i == files.length){
                callback(null,allImages);
                return;
            }
            fs.stat('./uploads/'+albumName+ '/' + files[i] , function(err,stats){
                if(err){
                    callback("找不到文件 " + files[i],null);
                    return;
                }
                if(stats.isFile()&&files[i]!='.DS_Store'){
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    })
}