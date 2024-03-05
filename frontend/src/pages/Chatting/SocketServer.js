import io from "socket.io-client";

const SocketServer = (id) => {
  console.log("from server", id);
  return io("https://workedin.onrender.com/", {
    //headers
    extraHeaders: {
      user_id: id,
    },
    //option
    //autoConnect:false//no connection /io.connect().open ()بغلب عشان هيك ما بنحطها
  }); //from postman)
};

export default SocketServer;
