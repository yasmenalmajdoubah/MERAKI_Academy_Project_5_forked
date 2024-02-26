const socketMiddleWare = (socket,next)=>{
    console.log(socket);
    ///بنشيك على شي معين 
    if (socket[0]!== "message"){
next (new Error ("socket mw error"))
    }
    else {  next ()}
  
  }
  module.exports=socketMiddleWare