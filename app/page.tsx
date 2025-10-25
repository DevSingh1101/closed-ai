"use client";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api",
  });

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-neutral-800">
      {
        messages.length > 0 ? (
          <div className="pb-32 pt-5 space-y-5 w-[75%] mx-auto relative">
            {messages.map((message) => (
              <div key={message.id} className={`w-full`}>
                {message.role === "user" ? (
                  <div className="flex gap-x-2">
                    <div className="bg-gray-500 h-12 w-12 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white p-1">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm">
                        {message.content}
                      </p>
                  </div>
                ) : (
                  <div className="flex gap-x-2">
                    <p className="rounded-lg p-3 w-full border-teal-500 border-2 text-sm">
                      {message.content}
                    </p>
                    <div className="bg-teal-500 h-12 w-12 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white p-1">
                          <path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center pt-32">
            <h1 className="font-bold text-2xl">
              No chats found. Start a new conversation!
            </h1>
          </div>
        )
      }

      <div ref={messageEndRef} />

      <form onSubmit={handleSubmit} className="p-5 fixed bottom-0 left-0 w-[75%] mx-auto right-0 bg-neutral-800">
        <div className="relative flex items-center">
          <TextareaAutosize 
          tabIndex={0} 
          required 
          rows={1} 
          value={input} 
          onChange={handleInputChange} 
          autoFocus 
          placeholder="Send message" 
          spellCheck={false} 
          className="w-full focus:outline-none shadow-teal-600 shadow-lg placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl bg-neutral-600"
          />
          <button type="submit" className="absolute cursor-pointer hover:scale-105 transition-all duration-100 bg-teal-500 p-2 rounded-lg right-0 mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
