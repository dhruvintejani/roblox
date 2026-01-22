export interface Plan {
  title: string;
  price: string;
  features: string[];
}

export interface Message {
  text: string;
  sender: "me" | "them";
  time: string;
  seen?: boolean;
}

export interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
}

export interface ChatMessage {
  text: string;
  files?: File[];
};

export interface Messages {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
  avatar?: string;
}

export interface CallState {
  recording: boolean;
  timer: string;
}