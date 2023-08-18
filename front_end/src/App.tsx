// App.tsx
import React from "react";
import MessageSender from "./components/MessageSender";
import MessageGetter from "./components/MessageGetter";

const App: React.FC = () => {
  return (
    <div>
      <h1>Chat App</h1>
      <MessageSender />
      <MessageGetter />
    </div>
  );
};

export default App;
