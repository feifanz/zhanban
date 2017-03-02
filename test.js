var user1 = {
    "yonghuming": "zff",
    "mima": "123"
}
var user2 = {
    "yonghuming": "zfff",
    "mima": "1234"
}


function checkUser(user) {
    for (var i = 0; i < alluser.length; i++) {
        if (user.yonghuming == alluser[i].yonghuming && user.mima == alluser[i].mima) {
            return true;
        } else {
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
var user3 = {
    "yonghuming": "app",
    "mima": "1234"
}

var alluser = [];
alluser.push(user1);
alluser.push(user2);
console.log(alluser[0]);
console.log(alluser[1]);
console.log(checkUser(user3));
console.log(checkUsername(user3));
var date1 = new Date();
var t = new Date();
t.setSeconds(t.getSeconds() + 30);
console.log(date1);
console.log(t);
console.log(t-date1);
