import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from 'dayjs';
import './ChatInput.css'; 

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

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
      time: dayjs().valueOf(),
    };

    // add user + loading message
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
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
            time: dayjs().valueOf(),
          };
        }

        return chatMessage;
      });

      setChatMessages(updatedMessages);
    }, 1500);
  }

  function clearMessages(){
    setChatMessages([]);
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
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />

      <button onClick={sendMessage} className="send-button">
        Send
      </button>

      <button
        className="clear-button"
        onClick={clearMessages}
      >
        Clear
      </button>
    </div>
  );
}
