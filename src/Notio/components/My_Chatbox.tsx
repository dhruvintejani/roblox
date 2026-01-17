import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";

interface Message {
  text: string;
  sender: "me" | "them";
  time: string;
  seen?: boolean;
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
}

const dummyUsers: ChatUser[] = [
  {
    id: 1,
    name: "Daisy Formanous",
    avatar: "https://i.pravatar.cc/100?img=1",
    messages: [
      {
        text: "Lorem ipsum is simply dummy text.",
        sender: "them",
        time: "09:31",
        seen: false,
      },
    ],
  },
  {
    id: 2,
    name: "Luther Rin",
    avatar: "https://i.pravatar.cc/100?img=2",
    messages: [
      {
        text: "Lorem ipsum is simply dummy text.",
        sender: "them",
        time: "09:28",
        seen: false,
      },
    ],
  },
  {
    id: 3,
    name: "Ram Kumar",
    avatar: "https://i.pravatar.cc/100?img=12",
    messages: [
      {
        text: "Hi.. Prem. How are you doing ?",
        sender: "them",
        time: "09:48",
        seen: false,
      },
      {
        text: "Lorem ipsum is simply dummy text.",
        sender: "me",
        time: "09:49",
      },
    ],
  },
  {
    id: 4,
    name: "Waxy Merto",
    avatar: "https://i.pravatar.cc/100?img=4",
    messages: [],
  },
  {
    id: 5,
    name: "John Hatter",
    avatar: "https://i.pravatar.cc/100?img=5",
    messages: [],
  },
  {
    id: 6,
    name: "Moroy Vijay",
    avatar: "https://i.pravatar.cc/100?img=6",
    messages: [],
  },
  {
    id: 7,
    name: "Vijay",
    avatar: "https://i.pravatar.cc/100?img=7",
    messages: [],
  },
  {
    id: 8,
    name: "Harry",
    avatar: "https://i.pravatar.cc/100?img=8",
    messages: [],
  },
  {
    id: 9,
    name: "Moroy",
    avatar: "https://i.pravatar.cc/100?img=9",
    messages: [],
  },
  {
    id: 10,
    name: "Alex Turner",
    avatar: "https://i.pravatar.cc/100?img=10",
    messages: [],
  },
  {
    id: 11,
    name: "Chris Nolan",
    avatar: "https://i.pravatar.cc/100?img=13",
    messages: [],
  },
  {
    id: 12,
    name: "Sarah Connor",
    avatar: "https://i.pravatar.cc/100?img=14",
    messages: [],
  },
  {
    id: 13,
    name: "Tony Stark",
    avatar: "https://i.pravatar.cc/100?img=15",
    messages: [],
  },
  {
    id: 14,
    name: "Bruce Wayne",
    avatar: "https://i.pravatar.cc/100?img=16",
    messages: [],
  },
];

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const My_Chatbox: React.FC = () => {
  const [users, setUsers] = useState<ChatUser[]>(dummyUsers);
  const [selectedUserId, setSelectedUserId] = useState(3);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState<HTMLElement | null>(null);
  const [notification, setNotification] = useState<HTMLElement | null>(null);

  const selectedUser = users.find((u) => u.id === selectedUserId)!;

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  const sendMessage = () => {
    if (!input.trim()) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? {
              ...u,
              messages: [
                ...u.messages,
                { text: input, sender: "me", time: nowTime() },
              ],
            }
          : u
      )
    );
    setInput("");
  };

  const notifications = users.flatMap((user) =>
    user.messages
      .filter((m) => m.sender === "them" && !m.seen)
      .map((m) => ({ user, message: m }))
  );

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              messages: u.messages.map((m) =>
                m.sender === "them" ? { ...m, seen: true } : m
              ),
            }
          : u
      )
    );
  };

  const handleNotificationClick = (userId: number) => {
    handleUserClick(userId);
    setNotification(null);
  };

  return (
    <div className="w-full pt-4 pb-2 bg-gray-100 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-[1600px] mx-auto h-[calc(100vh-7rem)] flex flex-col md:flex-row bg-gray-50">
        <aside className="md:w-1/3 w-full border-b md:border-b-0 md:border-r border-gray-200 bg-gray-100 flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100?img=11"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Ralph hitman
                </p>
                <p className="text-xs text-gray-500">@ralph-hitman</p>
              </div>
            </div>
            <button
              onClick={(e) => setNotification(e.currentTarget)}
              className="relative"
            >
              <Icon icon="mdi:bell-outline" className="w-5 h-5 text-gray-500" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 mb-3 bg-gray-200 rounded-full">
            <Icon icon="mdi:magnify" className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent text-sm w-full focus:outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 scrollbar-show pr-1">
            {filteredUsers.map((user) => {
              const unread = user.messages.filter(
                (m) => m.sender === "them" && !m.seen
              ).length;
              return (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${
                    user.id === selectedUserId
                      ? "bg-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <img src={user.avatar} className="w-9 h-9 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.messages[user.messages.length - 1]?.text ||
                        "No messages"}
                    </p>
                  </div>
                  {unread > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                      {unread}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-gray-100">
          <header className="px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={selectedUser.avatar} className="w-9 h-9 rounded-full" />
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedUser.name}
                </p>
                <p className="text-xs text-gray-500">Conversation</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-5 text-blue-500 cursor-pointer">
              <Icon
                icon="mdi:phone-outline"
                className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-100 rounded-2xl p-[4px] sm:p-[6px]"
              />
              <Icon
                icon="mdi:video-outline"
                className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-100 rounded-2xl p-[4px] sm:p-[6px]"
              />
              <Icon
                icon="mdi:dots-vertical"
                className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-100 rounded-2xl p-[4px] sm:p-[6px]"
              />
            </div>
          </header>

          <section className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto space-y-5">
            {selectedUser.messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "gap-3"
                }`}
              >
                {msg.sender === "them" && (
                  <img
                    src={selectedUser.avatar}
                    className="w-8 h-8 rounded-full mt-1"
                  />
                )}
                <div className="max-w-[75%] sm:max-w-[65%]">
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "me"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white border border-gray-200 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </section>

          <footer className="px-3 sm:px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
            <input
              type="file"
              id="attachment-input"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setInput((p) => p + ` [${file.name}]`);
              }}
            />
            <button
              onClick={() =>
                document.getElementById("attachment-input")?.click()
              }
            >
              <Icon icon="mdi:attachment" className="w-7 h-7 text-gray-500" />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />

            <button
              onClick={(e) => {
                setEmoji(e.currentTarget);
                setShowEmoji(true);
              }}
            >
              <Icon
                icon="mdi:emoticon-outline"
                className="w-7 h-7 text-gray-500"
              />
            </button>

            <button
              onClick={sendMessage}
              className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center"
            >
              <Icon icon="mdi:send" className="w-4 h-4" />
            </button>

            <Popover
              open={showEmoji}
              anchorEl={emoji}
              onClose={() => setShowEmoji(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <div className="p-3 grid grid-cols-6 gap-2">
                {["😀", "😂", "😍", "👍", "🎉", "😢"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setInput((p) => p + emoji);
                      setShowEmoji(false);
                    }}
                    className="text-xl hover:bg-gray-100 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </Popover>
          </footer>
        </main>
      </div>

      <Popover
        open={Boolean(notification)}
        anchorEl={notification}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box className="w-80 max-h-96 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold mb-3 text-center">
            Notifications
          </h3>

          {notifications.length === 0 ? (
            <p className="text-xs text-gray-500 text-center">
              No notifications
            </p>
          ) : (
            notifications.map(({ user, message }, idx) => (
              <div
                key={idx}
                onClick={() => handleNotificationClick(user.id)}
                className="flex gap-3 p-3 cursor-pointer hover:bg-gray-100 rounded-lg transition"
              >
                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate">
                    {message.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </Box>
      </Popover>
    </div>
  );
};

export default My_Chatbox;
