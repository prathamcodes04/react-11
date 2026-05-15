import { useState, useEffect, useRef } from 'react'
import { Chatbot } from 'supersimpledev';
import RobotProfileImage from './assets/robot-image.png';
import UserProfileImage from './assets/user-image.png';
import LoadingProfileGif from './assets/loading_gray.gif';
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {

    // create loading message
    const loadingMessage = {
      message: "",
      sender: "robot",
      id: "loading-message",
      isLoading: true,
    };

    // add user + loading message
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
      loadingMessage,
    ];

    setChatMessages(newChatMessages);

    const userInput = inputText;

    // clear input
    setInputText("");

    // fake delay
    setTimeout(() => {

      const response = Chatbot.getResponse(userInput);

      // replace loading message
      const updatedMessages = newChatMessages.map((chatMessage) => {

        if (chatMessage.id === "loading-message") {
          return {
            message: response,
            sender: "robot",
            id: crypto.randomUUID(),
            isLoading: false,
          };
        }

        return chatMessage;
      });

      setChatMessages(updatedMessages);

    }, 1500);
  }

return (
<div className="chat-input-container">
<input
  type="text"
  placeholder="Send a message to Chatbot"
  size="30"
  onChange={saveInputText}
  value={inputText}
  className="chat-input"

  onKeyDown = {(event) => {
    if (event.key === 'Enter'){
      sendMessage();
    }
  }}
/>

<button
  onClick={sendMessage}
  className="send-button"
>
  Send
</button>
</div>
);
}

function ChatMessage({ message, sender, isLoading }) {

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {isLoading  ? (<img src={LoadingProfileGif} className="loading-gif"/>)
          : (message)
        }
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            isLoading = {chatMessage.isLoading}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([{
    message: 'hello chatbot',
    sender: 'user',
    id: 'id1'
  }, {
    message: 'Hello! How can I help you?',
    sender: 'robot',
    id: 'id2'
  }, {
    message: 'can you get me todays date?',
    sender: 'user',
    id: 'id3'
  }, {
    message: 'Today is September 27',
    sender: 'robot',
    id: 'id4'
  }]);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
