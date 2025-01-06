"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Send } from "lucide-react";
import { Loader } from "@mantine/core";
import "@mantine/core/styles.css";

// type Message = {
//   content: string
//   isUser: boolean
// }

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputMessage.trim()) {
      setIsLoading(true);
      setMessages((prev) => [...prev, { content: inputMessage, isUser: true }]);
      setInputMessage("");

      try {
        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: inputMessage,
          }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { content: data.serverMessage, isUser: false },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            content: "Sorry, there was an error processing your request.",
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-[70vw]">
      <CardHeader>
        <CardTitle className="text-center">
          In the Name of Allah—the Most Compassionate, Most Merciful.
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[60vh] overflow-y-auto space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-3 justify-center">
              <Loader color="cyan" type="bars" size="xs" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full space-x-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
          />

          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
