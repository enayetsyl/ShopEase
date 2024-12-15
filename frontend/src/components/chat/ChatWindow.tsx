"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessageMutation } from "@/redux/api/chatApi";
import {
  addMessage,
  ChatMessage,
  clearConversations,
} from "@/redux/slices/chatSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations,
  );

  const [input, setInput] = useState("");
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if chat is open
  const [welcomeAdded, setWelcomeAdded] = useState(false); // Track if welcome message is added

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };
    dispatch(addMessage(userMessage));

    try {
      const response = await sendMessage(input).unwrap();

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "bot",
        text: response.data,
      };

      dispatch(addMessage(botMessage));
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "bot",
        text: "Failed to send message. Try again.",
      };
      dispatch(addMessage(errorMessage));
    }

    setInput(""); // Clear input field
  };

  const handlePopoverOpen = () => {
    setIsChatOpen(true);
    if (!welcomeAdded) {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: "welcome-message",
        role: "bot",
        text: "Hi there! How can I help you today?",
      };
      dispatch(addMessage(welcomeMessage));
      setWelcomeAdded(true);
    }
  };

  const handlePopoverClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="fixed bottom-2 lg:bottom-4 right-16">
      <Popover onOpenChange={(isOpen) => (isOpen ? handlePopoverOpen() : handlePopoverClose())}>
        <PopoverTrigger className="p-3 rounded-full bg-primary text-primary-foreground shadow-lg cursor-pointer">
          <MessageCircle className="w-6 h-6" />
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-card text-card-foreground">
          <ScrollArea className="h-64 w-full border border-border rounded-md p-2">
            {conversations.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2 rounded-md ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatWindow;
