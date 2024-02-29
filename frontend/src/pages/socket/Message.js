import React, { useState, useEffect } from "react";

import "./style.css";

import { useSelector } from "react-redux";

const Message = ({socket}) => {
    const [messages, setMessages] = useState("");
    const [to, setTo] = useState('');
    const [allMessage, setAllMessage] = useState([]);
    const { userId } = useSelector((state) => {
        return {
         
          userId: state.log.userId,
          
    
        };
      });



    useEffect(() => {
        // add a an event listener on message events
        socket.on("message", reciveData);
        // remove all listeners on clean up
        return () => socket.off("message",reciveData);
      }, [allMessage]);
      const sendMessage = () => {
        // emit a `message` event with the value of the message
        socket.emit("message", {to,from:userId,messages});
      };
      const reciveData =(data) => {
        console.log(data)
      setAllMessage((prev)=>([...prev, data]) );
      console.log(allMessage)
    }
  return (
    
  <>
  <div class="container bootstrap snippets bootdey">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="portlet portlet-default">
                <div class="portlet-heading">
                    <div class="portlet-title">
                        <h4><i class="fa fa-circle text-green"></i> Jane Smith</h4>
                    </div>
                    <div class="portlet-widgets">
                        <div class="btn-group">
                            <button type="button" class="btn btn-white dropdown-toggle btn-xs" data-toggle="dropdown">
                                <i class="fa fa-circle text-green"></i> Status
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#"><i class="fa fa-circle text-green"></i> Online</a>
                                </li>
                                <li><a href="#"><i class="fa fa-circle text-orange"></i> Away</a>
                                </li>
                                <li><a href="#"><i class="fa fa-circle text-red"></i> Offline</a>
                                </li>
                            </ul>
                        </div>
                        <span class="divider"></span>
                        <a data-toggle="collapse" data-parent="#accordion" href="#chat"><i class="fa fa-chevron-down"></i></a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div id="chat" class="panel-collapse collapse in">
                    <div>
                    <div class="portlet-body chat-widget" >
                        <div class="row">
                            <div class="col-lg-12">
                                <p class="text-center text-muted small">January 1, 2014 at 12:23 PM</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="media">
                                    <a class="pull-left" href="#">
                                        <img class="media-object img-circle img-chat" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                    </a>
                                    <div class="media-body">
                                        <h4 class="media-heading">Jane Smith
                                            <span class="small pull-right">12:23 PM</span>
                                        </h4>
                                        <p>Hi, I wanted to make sure you got the latest product report. Did Roddy get it to you?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="media">
                                    <a class="pull-left" href="#">
                                        <img class="media-object img-circle img-chat" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""/>
                                    </a>
                                    <div class="media-body">
                                        <h4 class="media-heading">John Smith
                                            <span class="small pull-right">12:28 PM</span>
                                        </h4>
                                        <p>Yeah I did. Everything looks good.</p>
                                        <p>Did you have an update on purchase order #302?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="media">
                                    <a class="pull-left" href="#">
                                        <img class="media-object img-circle img-chat" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""/>
                                    </a>
                                    <div class="media-body">
                                        <h4 class="media-heading">Jane Smith
                                            <span class="small pull-right">12:39 PM</span>
                                        </h4>
                                        <p>No not yet, the transaction hasn't cleared yet. I will let you know as soon as everything goes through. Any idea where you want to get lunch today?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    </div>
                    <div class="portlet-footer">
                        <form role="form">
                            <div class="form-group">
                                <textarea class="form-control" placeholder="Enter message..."></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-default pull-right">Send</button>
                                <div class="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</div>                
  </>
  )
}

export default Message



/*
<div>
    <h1>Message</h1>
    <input type = "text" placeholder="message" onChange={(e)=>{
        setMessages(e.target.value)
    }}/>
    <input type = "text" placeholder="to" onChange={(e)=>{
        setTo(e.target.value)
    }}/>
    <button onClick={()=>{
sendMessage()
    }}>send</button>
    {allMessage.length>0 && allMessage.map(message=>{
return <p><small> from {message.from} {message.messages
}</small></p>
    })}


    
</div>
*/