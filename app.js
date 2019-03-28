var express=require("express");
var app=express();
var router=require("./controller/router.js");

app.use(express.static("./public"));//public文件的静态资源
app.use(express.static("./uploads"));//uploads文件的静态资源

app.set("view engine","ejs");//引进ejs模版引擎

app.get('/',router.showIndex);//首页，从router获取

app.get('/admin',router.showAdmin);
app.post('/admin',router.showAdminPost);

app.get('/new',router.showNew);
app.post('/new',router.showNewPost);


app.get('/:albumName',router.showAlbum);//每个相册点进去

app.use(function(req,res){
    res.render('404');
})//中间件底层

app.listen(3000);