const messageHndler =(socket,io)=>{
    socket.on("message", (data) => {
        // well log the sent message
        console.log(data);
        data.success =true
        //           eventname
        //socket.emit("message", data);//this code reterun to the same user 
        socket.to("room -"+data.to).emit("message", data)
        socket.emit("message", data)
      });




}
module.exports=messageHndler