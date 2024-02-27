const auth =(socket,next)=>{
    const headers = socket.handshake.headers
    if (!headers.token){
      next (new Error("InValid"))
    }else {
      //add new key
      socket.join ("room -"+headers.user_id)//room 
      socket.user ={//token : headers.token, 
        user_id:headers.user_id }///
      next ()
    }
  }
  //بس بتشتغل مرة واحدة اول مرة بس نعمل هاندشيكنج
  module.exports=auth