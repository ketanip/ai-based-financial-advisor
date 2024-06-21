import { Chat, Message } from "@/types";
import Link from "next/link";
import React from "react";
import { FiPlus, FiTool } from "react-icons/fi";
import { getJWT } from "../utils/jwt";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  chats: {
    id: number;
    title: string;
    user_id: number;
  }[];
  setActiveChat: React.Dispatch<React.SetStateAction<Chat>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  activeChat: Chat;
};

const Sidebar: React.FC<Props> = ({
  chats,
  setActiveChat,
  activeChat,
  setMessages,
}) => {

  const CreateChat = async () => {
    const options = {
      method: "POST",
      url: `http://localhost:3001/chats`,
      headers: { "Content-Type": "application/json", "Authorization": getJWT() },
      data: { title: "New Chat" },
    };

    try {
      const resp = await axios(options);
      const data = resp.data as Chat;
      setActiveChat(data);
      toast("New chat created successfully.");
    } catch (error: any) {
      toast(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col px-5 gap-4 py-4 border-r-2 min-h-screen overflow-y-au">
      <h2 className="text-xl font-bold">All Chats</h2>

      <div
        className=" px-2 py-2 rounded  bg-gray-50 flex items-center gap-2 font-semibold hover:bg-gray-200 cursor-pointer"
        onClick={(e) => CreateChat()}
      >
        <FiPlus />
        <span>Create Chat</span>
      </div>

      <Link
        href="/tools"
        className=" px-2 py-2 rounded  bg-gray-50 flex items-center gap-2 font-semibold hover:bg-gray-200 cursor-pointer"
      >
        <FiTool />
        <span>Open Tools</span>
      </Link>

      <hr />
      <div className="flex gap-2 flex-col">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={
              " px-2 py-2 rounded  cursor-pointer " +
              (chat.id === activeChat.id
                ? "bg-gray-800 text-white hover:bg-gray-600"
                : "bg-gray-50 hover:bg-gray-200")
            }
            onClick={(e) => setActiveChat(chat)}
          >
            <span className=" ">{chat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
