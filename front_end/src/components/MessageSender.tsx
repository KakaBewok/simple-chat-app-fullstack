import React, { useState } from "react";
import axios from "axios";

const MessageSender: React.FC = () => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/chat", {
        sender,
        receiver,
        message,
      });

      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ marginBottom: "15px" }}>
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
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};

export default MessageSender;
