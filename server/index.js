const exp= require("express");
const app= exp();
const http = require('http');
const cors= require("cors");
const {Server} = require("socket.io");

app.use(cors());

const server= http.createServer(app);
const io= new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    },
});

io.on("connection", (socket) => {
    console.log("User Connected :",socket.id);

    socket.on("join_Chat",(data) => {
        socket.join(data);
        console.log("User with ID - ",socket.id," joined the room : ",data);
    });
    socket.on("send_msg",(data) => {
        socket.to(data.chat).emit("receive_msg",data);
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected",socket.id);
    });
});

server.listen(3001,()=>{
    console.log("Server Running");
})