import React, { useEffect, useState } from 'react'
import { user } from '../components/Join'
import Message from './Message';
import socketIo from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = 'http://localhost:5000/'

const Chat = () => {
  const [id, setId] = useState("")
  const [messages, setMessages] = useState([])

  const send = () => {
    const message = document.getElementById('chatInput').value
    socket.emit('message', { message, id })
    document.getElementById('chatInput').value = ""
  }

  console.log(messages)

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] })

    socket.on('connect', () => {
      setId(socket.id)
    })
    console.log(socket)

    socket.emit('join', { user })

    socket.on('welcome', (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message)
    })

    socket.on('userJoined', (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message)
    })

    socket.on('leave', (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message)
    })

    return () => {
      socket.emit('disconnected')
      socket.off()
    }

  }, [])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message, data.id)
    })
    return () => {
      socket.off()
    }
  }, [messages])

  return (
    <div className="chatPage">
      <div className="chatContainer">
        
        <div className="header">
          <h2>CHAT APP</h2>
        </div>
        
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
        </ReactScrollToBottom>

        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button className="sendBtn" onClick={send}>Send</button>
        </div>

      </div>
    </div>
  )
}

export default Chat


