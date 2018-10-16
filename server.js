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
        let login = db.collection('login');
        socket.on("submit", function(data){
            
        })
    })
})