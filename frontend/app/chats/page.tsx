"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronRight, FiCpu, FiSend, FiUser } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { Chat, Message } from "@/types";
import { getJWT } from "../utils/jwt";
import axios from "axios";
import { toast } from "react-toastify";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// const chats = [
//   {
//     id: 3,
//     title: "How stock markets work ?",
//     user_id: 1,
//   },
//   {
//     id: 2,
//     title: "What are derivatives ?",
//     user_id: 1,
//   },
//   {
//     id: 4,
//     title: "How to analyze performance of a Mutual Fund ?",
//     user_id: 1,
//   },
// ];

const default_messages = [
  "What are Mutual Funds ?",
  "What are Derivatives ?",
  "What is a Stock Market and how does it function?",
  "What are Bonds and how do they differ from stocks?",
  "What is the concept of Risk Management in finance?",
  "What is Asset Allocation and why is it crucial for investors?",
  "What are ETFs and how do they differ from mutual funds?",
  "What is Diversification and why is it important in investment?",
];

const AllChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState<string>("");
  const [activeChat, setActiveChat] = useState<Chat>({
    id: 4,
    title: "New Chat",
    user_id: -1,
  });
  const [isThinking, setIsThinking] = useState<boolean>(false);

  useEffect(() => {
    const GetAllChats = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:3001/chats",
        headers: {
          "Content-Type": "application/json",
          Authorization: getJWT(),
        },
      };

      try {
        const resp = await axios(options);
        const data = resp.data.chats as Chat[];
        setChats(data);
      } catch (error: any) {
        toast(error.response.data.error);
      }
    };
    GetAllChats();
  }, [activeChat]);

  useEffect(() => {
    const GetAllMessages = async () => {
      const options = {
        method: "GET",
        url: `http://localhost:3001/messages/${activeChat.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: getJWT(),
        },
      };

      try {
        const resp = await axios(options);
        const data = resp.data.messages as Message[];
        setMessages(data);
      } catch (error: any) {
        toast(error.response.data.error);
      }
    };

    if (activeChat.id != -1) {
      GetAllMessages();
    }
  }, [activeChat]);

  // Scroll to latest chat.
  const divRef: any = useRef(null);
  useEffect(() => {
    if (divRef.current != null) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const SendMessage = async () => {
    setIsThinking(true);

    const options = {
      method: "POST",
      url: `http://localhost:3001/messages/chat/${activeChat.id}`,
      headers: { "Content-Type": "application/json", Authorization: getJWT() },
      data: { message: messageContent },
    };

    try {
      const resp = await axios(options);
      const data = resp.data as { user_message: Message; llm_message: Message };
      setIsThinking(false);
      setMessages([...messages, data.user_message, data.llm_message]);
    } catch (error: any) {
      toast(error.response.data.error);
    }

    setIsThinking(false);
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      <Sidebar
        chats={chats}
        setActiveChat={setActiveChat}
        activeChat={activeChat}
        setMessages={setMessages}
      />

      <div className="col-span-4 px-2 flex flex-col py-4 max-h-screen max-w-4xl mx-auto ">
        {messages.length > 0 ? (
          <>
            {/* Chats */}
            <div className="flex-1 flex flex-col text-lg gap-2  pb-5 overflow-y-scroll no-scrollbar ">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={"px-4 py-2 rounded flex items-start gap-2"}
                >
                  {message.source == "user" ? (
                    <FiUser className="btn btn-circle btn-xs mt-1" />
                  ) : (
                    <FiCpu className="btn btn-circle btn-xs mt-1" />
                  )}

                  <div
                    className="flex flex-col gap-2"
                    ref={
                      index === messages.length - 1 && !isThinking
                        ? divRef
                        : null
                    }
                  >
                    <span>{message.source == "user" ? "You" : "Advisor"}</span>
                    <div className="prose  bg-slate-100 px-4 py-2 rounded">
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {message.message}
                      </Markdown>
                    </div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <>
                  <div className={"px-4 py-2 rounded flex items-start gap-2"}>
                    <FiUser className="btn btn-circle btn-xs mt-1" />

                    <div className="prose  bg-slate-100 px-4 rounded">
                      <span className="font-medium">You</span>
                      <p>{messageContent}</p>
                    </div>
                  </div>
                  <div className={"px-4 py-2 rounded flex items-start gap-2"}>
                    <FiCpu className="btn btn-circle btn-xs mt-1" />

                    <div
                      ref={divRef}
                      className="prose  bg-slate-100 px-4  rounded"
                    >
                      <span className="font-medium">Advisor</span>
                      <p>Thinking.....</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Input Bar. */}
            <div className="flex gap-3">
              <input
                type="text"
                name="message"
                id="message"
                className="input input-bordered w-full"
                placeholder="Enter your message here."
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <button
                className="btn btn-neutral text-xl disabled:bg-gray-700"
                disabled={isThinking}
                onClick={(e) => SendMessage()}
              >
                <FiChevronRight />{" "}
              </button>
            </div>
          </>
        ) : (
          <>
            {!isThinking ? (
              <>
                <div className="col-span-4 min-h-screen flex flex-col gap-4 my-20">
                  <div className="flex gap-3 self-center mb-4">
                    <FiCpu className="btn btn-circle btn-xs mt-1" />
                    <h2 className="text-xl font-semibold">
                      How can I help you today ?
                    </h2>
                  </div>
                  <div className="">
                    {default_messages.map((item, index) => (
                      <span
                        className="btn btn-sm mx-2 my-1"
                        key={index}
                        onClick={(e) => {
                          setMessageContent(item);
                          SendMessage();
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <textarea
                    name=""
                    className="textarea textarea-bordered w-full"
                    id=""
                    placeholder="Ask Your question here...."
                    onChange={(e) => setMessageContent(e.target.value)}
                  ></textarea>
                  <div
                    className="flex mx-auto items-center btn btn-neutral  gap-2"
                    onClick={(e) => SendMessage()}
                  >
                    <button>Ask Question</button>
                    <FiSend />
                  </div>
                </div>
              </>
            ) : (
              <>Looking through databases 🧐....</>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllChats;
