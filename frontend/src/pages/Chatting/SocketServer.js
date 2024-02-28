import io from "socket.io-client"

const SocketServer = (id) => {
    console.log("from server",id);
  return (
    io("http://localhost:5000/",{
    //headers
    extraHeaders:{
      user_id:id
    },
    //option
    //autoConnect:false//no connection /io.connect().open ()بغلب عشان هيك ما بنحطها

  })//from postman)
  )
}

export default SocketServer