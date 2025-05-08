import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    try {
      // Add the user's message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: message },
      ]);

      // Send the message to the backend
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message, chat_history: messages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the API response

      // Add the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error.message, error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-white overflow-auto transform transition-transform duration-300 z-20 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            startNewChat={startNewChat}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-margin duration-300 h-full ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            chatEndRef={chatEndRef}
          />
          <MessageInput
            value={inputMessage}
            onChange={setInputMessage}
            onSend={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
