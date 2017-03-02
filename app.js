var express = require('express');
var app = express();
//socket.io公式：
var http = require('http').Server(app);
var io = require('socket.io')(http);
//session公式：
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//模板引擎
app.set("view engine", "ejs");
//静态服务
app.use(express.static("./public"));

var alluser = [];
var textNumber = 1;

//中间件
//显示首页
app.get("/", function(req, res, next) {
    res.render("index");
});

app.get("/post", function(req, res, next) {
    res.render("post");
});

app.get("/login", function(req, res, next) {
    res.render("login");
});




//确认登陆，检查此人是否有用户名，并且昵称不能重复
app.get("/check", function(req, res, next) {

    var yonghuming = req.query.yonghuming;
    var avatar = req.query.avatar;
    var mima = req.query.mima;
    //console.log(req.session.denglu);

    if(req.session.denglu == 1){
        res.send("您已经登陆了~~");
        return;
    }

    /*if (req.session.yonghuming == yonghuming) {
        req.session.avatar = avatar;
        req.session.denglu = 1;
        res.redirect("/chat");
        return;
    }*/

    /*if (alluser.indexOf(yonghuming) != -1) {
        res.send("用户名已经被占用~~ 请你换个名字~~");
        return;
    }*/

    function checkUser(user){
        for(var i = 0; i<alluser.length;i++){
            if(user.yonghuming==alluser[i].yonghuming&&user.mima==alluser[i].mima){
                return true;
            }
            else{
                return false;
            }
        }
    }

    function checkUsername(user) {
        for(var i = 0; i<alluser.length;i++){
            if(user.yonghuming==alluser[i].yonghuming){
                return true;
            }
            else{
                return false;
            }
        }
    }

    var user = {
        "yonghuming" : yonghuming,
        "mima" : mima
    }

    if(checkUser(user)){
        //旧用户登录，用户名密码正确
        req.session.yonghuming = yonghuming;
        req.session.avatar = avatar;
        req.session.denglu = 1;
        res.redirect("/chat");
    }else if(checkUsername(user)){
        res.send("旧用户密码错误，或者新用户用户名已经被注册");
    }else{                  //新用户登录，并且用户名不重复

        alluser.push(user);
        //付给session
        req.session.yonghuming = yonghuming;
        req.session.avatar = avatar;
        req.session.denglu = 1;
        res.redirect("/chat");
    }



});

//聊天室
app.get("/chat", function(req, res, next) {
    //这个页面必须保证有用户名了，
    if (!req.session.yonghuming) {
        res.redirect("/");
        return;
    }
    res.render("chat", {
        "yonghuming": req.session.yonghuming,
        "avatar": req.session.avatar,
    });
})

io.on("connection", function(socket) {
    socket.on("liaotian", function(msg) {
        //把接收到的msg原样广播, 1000ms延迟
        console.log(textNumber);
        msg.number = textNumber;
        setTimeout(function() {
            textNumber = textNumber +1;
            io.emit("liaotian", msg);
        }, 1000);

    });
});

app.get("/logout", function(req, res, next) {
    req.session.denglu = req.query.denglu;

    res.send("logout");
});


//监听
http.listen(3000);
