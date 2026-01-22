export type AnimationSpeed = "fast" | "medium" | "slow";

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

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
