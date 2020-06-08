// LOG
var logger = require('../config/log');

var client = new Object();

module.exports = function(io) {
    // 소켓 연결
    io.on('connection', function (socket) {

        // GET Socket Id and Socket Ip..
        var id = socket.id;
        var ip = socket.handshake.address;
        ip = ip.split(":")[3];

        // 접속자 설정
        client[id] = null;

        socket.on('user', function (data) {
            if(data){
              logger.info(ip+" >> "+data.data+"님 입장");
              client[id] = data.data;
              io.emit("count", {data: Object.keys(client).length});
              socket.broadcast.emit("recv_msg", {data: " >> "+data.data+"님 입장 << "});
            }
        });

        socket.on('send_msg', function (data) {
            if(data){
              logger.info(ip+" >> "+data.name+" : "+data.data);
              client[id] = data.name;
              socket.broadcast.emit("recv_msg", {data: data.name+" : "+data.data });
            }
        });

        socket.on('disconnect', function (data) {
            console.log(client);
            if(data){
              logger.info(ip+" >> "+client[id]+"님 퇴장");
              io.emit("count", {data: Object.keys(client).length - 1});
              socket.broadcast.emit("recv_msg", {data: " >> "+client[id]+"님 퇴장 << "});
              delete client[id];
            }
        });
    });
};
