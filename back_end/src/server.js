const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

//connect express with mongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/chat")
  .then(() => console.log("MongoDB Connected ..."))
  .catch((err) => console.log(err));
//create model and scheme
const ChatMessage = mongoose.model("ChatMessage", {
  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

app.use(cors());
app.use(express.json());
//view message endpoint
app.get("/chat/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;
  try {
    const chatMessages = await ChatMessage.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    res.json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat messages." });
  }
});
//send message endpoint
app.post("/chat", async (req, res) => {
  const { sender, receiver, message } = req.body;
  if (!sender || !receiver || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const newMessage = new ChatMessage({
      sender,
      receiver,
      message,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
});

//running the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
