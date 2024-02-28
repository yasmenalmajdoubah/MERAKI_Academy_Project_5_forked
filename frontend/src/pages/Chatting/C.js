import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io();

function C() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', inputValue);
    setInputValue('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mt-8 mb-4">Live Chat</h1>

      <div className="border border-gray-300 p-4 rounded-lg h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-lg w-full"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" onClick={()=>{
            sendMessage ()
        }}>
          Send
        </button >
      </form>
    </div>
  );
}

export default C