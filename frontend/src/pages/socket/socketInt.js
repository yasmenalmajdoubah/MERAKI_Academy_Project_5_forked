import  io  from "socket.io-client";



//socket connection

const socketInt =({ user_id })=>{
  //console.log("from socket int ",token);
  return(
    io("http://localhost:5000/",{
    //headers
    extraHeaders:{
      user_id 
    },
    //option
    //autoConnect:false//no connection /io.connect().open ()بغلب عشان هيك ما بنحطها

  })//from postman)
  )
  
}
export default socketInt