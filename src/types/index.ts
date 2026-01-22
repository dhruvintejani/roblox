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
