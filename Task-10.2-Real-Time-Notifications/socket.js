const jwt=require("jsonwebtoken");
function configureSocket(io){io.use((socket,next)=>{try{const token=socket.handshake.auth?.token;if(!token)return next(new Error("Authentication required"));socket.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch{next(new Error("Invalid socket token"))}});io.on("connection",socket=>{if(socket.user.role==="STUDENT")socket.join("students");socket.on("disconnect",r=>console.log("Socket disconnected:",r))})}
module.exports=configureSocket;
