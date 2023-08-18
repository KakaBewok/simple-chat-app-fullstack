// MessageGetter.tsx
import React, { useState } from "react";
import axios from "axios";

interface Message {
  sender: string;
  receiver: string;
  message: string;
}

const MessageGetter: React.FC = () => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGetMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/chat/${sender}/${receiver}`
      );

      setMessages(response.data);
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <button onClick={handleGetMessages}>Get Messages</button>
      <div>
        {messages.map((message, index) => (
          <div>
            <div key={index}>
              <p>Sender: {message.sender}</p>
              <p>Receiver: {message.receiver}</p>
              <p>Message: {message.message}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageGetter;
