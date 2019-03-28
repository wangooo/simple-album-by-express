var file=require('../models/file.js');
var formidable=require("formidable");
var util= require ("util");
var sd=require ("silly-datetime");
var fs =require ("fs");
var path = require ("path");

//显示首页
exports.showIndex=function(req,res){
    file.getAllAlbums(function(allAlbums,err){
        if(err){
            res.send(err);
            return;
        }
        res.render("index",{
            "myAlbums":allAlbums
        })
    })
};

exports.showAlbum=function(req,res){
    var albumName=req.params.albumName;
    file.getImages(albumName,function(err,imageArray){
        if(err){
            res.send(err);
            return;
        }
        res.render('album',{
            "albumName":albumName,
            "images":imageArray
        });
    });
};

exports.showAdmin=function(req,res){
    file.getAllAlbums(function(allAlbums,err){
        if(err){
            res.send(err);
            return;
        }
        res.render("admin",{
            "albums":allAlbums
        })
    })
};

exports.showAdminPost=function(req,res){
    if (req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();

        form.uploadDir = "./uploads";

        form.parse(req, function(err, fields, files) {
            console.log(fields);
            console.log(files);

            var ttt=sd.format(new Date(), 'YYYYMMDD');
            var rdmnum=parseInt(Math.random()*99999+10000);
            var ext=path.extname(files.upload.name);

            var oldpath=files.upload.path;
            var newpath='uploads/'+ fields.album + '/'+ ttt + rdmnum + ext;
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("上传失败");
                }
            })
            res.send("成功了！");
        });
        return;
    }
}

exports.showNew=function(req,res){
    res.render("new");
}

exports.showNewPost=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){
            res.send("失败在于："+err);
            return;
        }
        console.log(fields);
        fs.mkdir('uploads/'+fields.dirname,function(err){
            if(err){
                res.send("失败");
                return;
            }
            res.send("成功");
        })

    })
}

exports.show404=function(req,res){
    res.send("404");
};