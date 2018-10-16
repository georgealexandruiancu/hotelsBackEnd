const mongo = require("mongodb").MongoClient;
const client = require("socket.io").listen(4040).sockets;

const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

mongo.connect('mongodb://localhost/hotelsLogin', function(err, db){
    if(err){
        throw err;
    }
    console.log("connected to hotelsLogin");

    client.on('connection', function(socket){
        let login = db.collection('users');
        socket.on("submit", function(data){
            let user = data.name;
            let pwd = data.password;
            if( user == "" || pwd == ""){
                console.log("on empty fileds");
            }else{
                //HASH THE PASSWORD
                bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
                    if(err) throw err;
                    bcrypt.hash(pwd, salt, function(err, hash){
                        if(err) throw err;

                        pwd = hash;

                        login.insert({username: user, password: pwd}, function(){
                            console.log("A new user has signed up" + user);
                        })
                        console.log(login.find())
                    })
                })
            }
        })
    })
})