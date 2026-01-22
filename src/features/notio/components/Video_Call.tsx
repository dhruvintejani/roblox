import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import {
  doctorPlaceholder,
  initialMessages,
  patientPlaceholder,
} from "../../../assets/data/dummydata/Notio";
import type { CallState, Messages } from "../interface/IHome";
import { cx } from "../../../lib/cx";
import { formatTimer, latestTime } from "../../../lib/time";

const useTimer = (start: number, paused: boolean) => {
  const [t, setT] = useState(start);
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setT((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [paused]);
  return t;
};

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const DEFAULT_OTHER_AVATAR = "https://i.pravatar.cc/40?img=32";

const autoReplies = [
  "I’m glad you asked. Can you tell me more about your symptoms?",
  "Okay, noted. Since when are you feeling this way?",
  "Understood. Any dizziness or shortness of breath?",
  "Thanks for sharing. I’ll guide you step by step.",
  "That’s helpful. Let’s check a few basics together.",
];

export const VideoCall: React.FC = () => {
  const [messages, setMessages] = useState<Messages[]>(initialMessages);
  const [isMuted, setIsMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  const [volume, setVolume] = useState(70);

  const [subtitle, setSubtitle] = useState(
    "Hi, Oliver how’s your health today? better than yesterday…",
  );

  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const replyTimeoutRef = useRef<number | null>(null);

  const elapsed = useTimer(15 * 60 + 15, isCallEnded);

  const callState: CallState = useMemo(
    () => ({ recording: !isCallEnded, timer: formatTimer(elapsed) }),
    [elapsed, isCallEnded],
  );

  const stopPending = () => {
    if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
    if (replyTimeoutRef.current) window.clearTimeout(replyTimeoutRef.current);
    typingTimeoutRef.current = null;
    replyTimeoutRef.current = null;
    setIsOtherTyping(false);
  };

  useEffect(() => stopPending, []);
  useEffect(() => {
    if (isCallEnded) stopPending();
  }, [isCallEnded]);

  const pushMessage = (m: Messages) => setMessages((p) => [...p, m]);

  const sendMessage = (text: string) => {
    const t = text.trim();
    if (!t || isCallEnded) return;

    pushMessage({
      id: makeId(),
      sender: "me",
      text: t,
      time: latestTime(),
    } as Messages);

    setSubtitle(t);

    stopPending();
    setIsOtherTyping(true);

    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    const typingDelay = 650 + Math.floor(Math.random() * 450);
    const replyDelay = 1500 + Math.floor(Math.random() * 900);

    typingTimeoutRef.current = window.setTimeout(() => {
      setIsOtherTyping(true);
    }, typingDelay);

    replyTimeoutRef.current = window.setTimeout(() => {
      setIsOtherTyping(false);
      if (isCallEnded) return;

      const existingAvatar =
        (messages.find((x: any) => x?.sender === "them" && x?.avatar) as any)
          ?.avatar || DEFAULT_OTHER_AVATAR;

      pushMessage({
        id: makeId(),
        sender: "them",
        text: reply,
        time: latestTime(),
        avatar: existingAvatar,
      } as Messages);

      setSubtitle(reply);
    }, replyDelay);
  };

  return (
    <div className="w-full h-[652px] max-h-[100dvh] flex flex-col overflow-hidden bg-white dark:bg-neutral-950">
      <VideoHeader callState={callState} />
      <div className="flex overflow-hidden h-[calc(100vh-110px)]">
        <div
          className={cx(
            "flex-1 px-4 py-2 h-full transition-medium",
            isFullScreen ? "scale-[1.02]" : "scale-100",
          )}
        >
          <VideoStage
            subtitle={subtitle}
            isMuted={isMuted}
            isMicMuted={isMicMuted}
            isVideoOff={isVideoOff}
            isFullScreen={isFullScreen}
            isCallEnded={isCallEnded}
            isSwapped={isSwapped}
            volume={volume}
            setVolume={setVolume}
            setIsMuted={setIsMuted}
            setIsMicMuted={setIsMicMuted}
            setIsVideoOff={setIsVideoOff}
            setIsFullScreen={setIsFullScreen}
            onSwap={() => {
              if (isCallEnded) return;
              setIsSwapped((v) => !v);
            }}
            onEndCall={() => setIsCallEnded(true)}
          />
        </div>

        <div
          className={cx(
            "h-full",
            isFullScreen
              ? "animate-panel-out pointer-events-none"
              : "animate-panel-in",
          )}
        >
          {!isFullScreen && (
            <ChatPanel
              messages={messages}
              onSendMessage={sendMessage}
              isCallEnded={isCallEnded}
              isOtherTyping={isOtherTyping}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const VideoHeader: React.FC<{ callState: CallState }> = ({ callState }) => (
  <div className="w-full h-8 mt-4 bg-white shadow-sm flex items-center px-6 relative shrink-0 dark:bg-neutral-900">
    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
      <span>
        Call with <strong>"Alexa Smith"</strong>
      </span>
    </div>

    <div className="ml-auto mr-4 flex items-center gap-2 text-sm">
      {callState.recording && (
        <span className="flex items-center gap-1 text-red-500">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          REC
        </span>
      )}
      <span className="text-gray-700 dark:text-white">{callState.timer}</span>
    </div>
  </div>
);

const VideoStage: React.FC<{
  subtitle: string;
  isMuted: boolean;
  isMicMuted: boolean;
  isVideoOff: boolean;
  isFullScreen: boolean;
  isCallEnded: boolean;
  isSwapped: boolean;
  volume: number;
  setVolume: (v: number) => void;
  setIsMuted: (v: boolean) => void;
  setIsMicMuted: (v: boolean) => void;
  setIsVideoOff: (v: boolean) => void;
  setIsFullScreen: (v: boolean) => void;
  onSwap: () => void;
  onEndCall: () => void;
}> = ({
  subtitle,
  isMuted,
  isMicMuted,
  isVideoOff,
  isFullScreen,
  isCallEnded,
  isSwapped,
  volume,
  setVolume,
  setIsMuted,
  setIsMicMuted,
  setIsVideoOff,
  setIsFullScreen,
  onSwap,
  onEndCall,
}) => {
  const mainName = isSwapped ? "Oliver Smith" : "Dr. Mark Wood";
  const pipName = isSwapped ? "Dr. Mark Wood" : "Oliver Smith";
  const mainSrc = isSwapped ? patientPlaceholder : doctorPlaceholder;
  const pipSrc = isSwapped ? doctorPlaceholder : patientPlaceholder;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-black">
      {!isVideoOff ? (
        <img
          src={mainSrc}
          alt="Main"
          className={cx(
            "w-full h-full object-cover",
            "transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
            isSwapped ? "scale-[1.01]" : "scale-100",
            isCallEnded && "opacity-60",
          )}
        />
      ) : (
        <div
          className={cx(
            "w-full h-full object-cover",
            "transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
            isSwapped ? "scale-[1.01]" : "scale-100",
            isCallEnded && "opacity-60",
          )}
        >
          Video Paused
        </div>
      )}

      <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
        {mainName}
      </div>

      <PictureInPicture
        isCallEnded={isCallEnded}
        name={pipName}
        src={pipSrc}
        onSwap={onSwap}
      />

      <CallControls
        isMuted={isMuted}
        isMicMuted={isMicMuted}
        isVideoOff={isVideoOff}
        isFullScreen={isFullScreen}
        isCallEnded={isCallEnded}
        volume={volume}
        setVolume={setVolume}
        onToggleMuted={() => setIsMuted(!isMuted)}
        onToggleMic={() => setIsMicMuted(!isMicMuted)}
        onToggleVideo={() => setIsVideoOff(!isVideoOff)}
        onToggleFull={() => setIsFullScreen(!isFullScreen)}
        onEndCall={onEndCall}
      />

      <div className="absolute bottom-2 left-4 text-white text-sm bg-black/40 px-4 py-2 rounded-lg">
        {subtitle}
      </div>

      {isCallEnded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/55 backdrop-blur-sm px-6 py-4 rounded-2xl text-center shadow-lg">
            <div className="text-white text-lg font-semibold">Call ended</div>
            <div className="text-white/80 text-sm mt-1">
              You can close this window.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PictureInPicture: React.FC<{
  isCallEnded: boolean;
  name: string;
  src: string;
  onSwap: () => void;
}> = ({ isCallEnded, name, src, onSwap }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      onDoubleClick={() => {
        if (isCallEnded) return;
        onSwap();
      }}
      className={cx(
        "absolute top-4 right-4 w-48 h-32 rounded-xl overflow-hidden shadow-md border border-white bg-black",
        "cursor-pointer select-none",
        "transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.05]",
      )}
    >
      {!isCallEnded ? (
        !failed ? (
          <img
            src={src}
            alt="PiP"
            className="w-full h-full object-cover"
            onError={(e) => {
              setFailed(true);
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/480x320?text=Video";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )
      ) : (
        <div className="w-full h-full bg-gray-950" />
      )}

      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
        {name}
      </div>
    </div>
  );
};

const CallControls: React.FC<{
  isMuted: boolean;
  isMicMuted: boolean;
  isVideoOff: boolean;
  isFullScreen: boolean;
  isCallEnded: boolean;
  volume: number;
  setVolume: (v: number) => void;
  onToggleMuted: () => void;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onToggleFull: () => void;
  onEndCall: () => void;
}> = ({
  isMuted,
  isMicMuted,
  isVideoOff,
  isFullScreen,
  isCallEnded,
  volume,
  setVolume,
  onToggleMuted,
  onToggleMic,
  onToggleVideo,
  onToggleFull,
  onEndCall,
}) => (
  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/30 backdrop-blur px-6 py-3 rounded-full shadow-lg dark:bg-black/40 dark:border-white/10">
    <VolumeControl
      disabled={isCallEnded}
      isMuted={isMuted}
      volume={volume}
      setVolume={setVolume}
      onToggleMuted={onToggleMuted}
    />

    <ControlBtn
      disabled={isCallEnded}
      icon={isMicMuted ? "mdi:microphone-off" : "mdi:microphone"}
      onClick={onToggleMic}
      active={isMicMuted}
    />

    <ControlBtn
      disabled={isCallEnded}
      icon={isVideoOff ? "mdi:video-off" : "mdi:video"}
      onClick={onToggleVideo}
      active={isVideoOff}
    />

    <button
      onClick={onEndCall}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
    >
      <Icon icon="mdi:phone-hangup" className="text-2xl" />
    </button>

    <ControlBtn
      disabled={isCallEnded}
      icon={isFullScreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}
      onClick={onToggleFull}
      active={false}
    />
  </div>
);

const VolumeControl: React.FC<{
  disabled?: boolean;
  isMuted: boolean;
  volume: number;
  setVolume: (v: number) => void;
  onToggleMuted: () => void;
}> = ({ disabled, isMuted, volume, setVolume, onToggleMuted }) => {
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const closeT = useRef<number | null>(null);

  const clearClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = null;
  };

  const scheduleClose = () => {
    clearClose();
    closeT.current = window.setTimeout(() => {
      if (!dragging) setOpen(false);
    }, 120);
  };

  useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging]);

  useEffect(() => {
    if (!dragging) scheduleClose();
  }, [dragging]);

  const icon = isMuted || volume === 0 ? "mdi:volume-mute" : "mdi:volume-high";
  const active = isMuted || volume === 0;

  const setMutedState = (wantMuted: boolean) => {
    if (wantMuted && !isMuted) onToggleMuted();
    if (!wantMuted && isMuted) onToggleMuted();
  };

  const handleButtonClick = () => {
    if (disabled) return;
    clearClose();
    setOpen(true);

    if (isMuted || volume === 0) {
      setVolume(20);
      setMutedState(false);
    } else {
      setVolume(0);
      setMutedState(true);
    }
  };

  const handleVolumeChange = (v: number) => {
    if (disabled) return;
    setVolume(v);
    if (v > 0) setMutedState(false);
    if (v === 0) setMutedState(true);
  };

  return (
    <div className="relative">
      <div
        onPointerEnter={() => {
          if (disabled) return;
          clearClose();
          setOpen(true);
        }}
        onPointerLeave={() => {
          if (disabled) return;
          scheduleClose();
        }}
      >
        <ControlBtn
          disabled={disabled}
          icon={icon}
          onClick={handleButtonClick}
          active={active}
        />
      </div>

      <div
        className={cx(
          "absolute left-1/2 -translate-x-1/2 z-20",
          active ? "bottom-[62px]" : "bottom-[54px]",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-1 pointer-events-none",
          "transition-all duration-150 ease-out",
        )}
        onPointerEnter={() => {
          if (disabled) return;
          clearClose();
          setOpen(true);
        }}
        onPointerLeave={() => {
          if (disabled) return;
          scheduleClose();
        }}
      >
        <div className="bg-white/30 backdrop-blur border dark:bg-black/20 dark:border-white/10 border-white/60 shadow-lg rounded-xl px-3 py-3">
          <div className="flex flex-col items-center gap-2">
            <div className="text-[12px] text-black dark:text-black font-medium">
              {Math.round(volume)}%
            </div>

            <div className="h-24 w-8 flex items-center justify-center">
              <input
                disabled={disabled}
                type="range"
                min={0}
                max={100}
                value={volume}
                onPointerDown={() => {
                  if (disabled) return;
                  clearClose();
                  setOpen(true);
                  setDragging(true);
                }}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className={cx(
                  "w-24 h-2 -rotate-90 accent-blue-500 cursor-pointer",
                  disabled && "cursor-not-allowed opacity-60",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ControlBtn: React.FC<{
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}> = ({ icon, onClick, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={cx(
      "relative w-10 h-10 flex items-center justify-center rounded-full",
      "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700",
      "disabled:opacity-50 disabled:hover:bg-gray-200",
    )}
  >
    <Icon icon={icon} className="text-xl" />
  </button>
);

const ChatPanel: React.FC<{
  messages: Messages[];
  onSendMessage: (text: string) => void;
  isCallEnded: boolean;
  isOtherTyping: boolean;
}> = ({ messages, onSendMessage, isCallEnded, isOtherTyping }) => {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [showNew, setShowNew] = useState(false);

  const scrollToBottom = (smooth = true) => {
    endRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  };

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 24;
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
    setAtBottom(isNearBottom);
    if (isNearBottom) setShowNew(false);
  };

  useEffect(() => {
    if (atBottom) scrollToBottom(true);
    else setShowNew(true);
  }, [messages, isOtherTyping]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 24;
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
    setAtBottom(isNearBottom);
    if (isNearBottom) setShowNew(false);
  }, []);

  const submit = () => {
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="w-[360px] h-full bg-white border-l flex flex-col overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
      <div className="h-12 flex items-center px-4 border-b text-sm font-semibold shrink-0 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-white">
        Chat
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          ref={listRef}
          onScroll={onScroll}
          className="h-full overflow-y-auto px-4 py-2 space-y-4"
        >
          {messages?.map((m) => (
            <ChatMessage key={(m as any).id} message={m} />
          ))}

          {isOtherTyping && !isCallEnded && <TypingIndicator />}

          <div ref={endRef} />
        </div>

        {showNew && !atBottom && (
          <button
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/85 text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-gray-900"
          >
            New messages
          </button>
        )}
      </div>

      <div className="h-12 border-t flex items-center px-3 gap-2 shrink-0">
        <input
          disabled={isCallEnded}
          className="flex-1 h-8 rounded-full border px-4 text-sm outline-none disabled:bg-gray-100 bg-white dark:bg-neutral-800
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-neutral-700"
          placeholder="Type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button
          onClick={submit}
          className={cx(
            "w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center",
          )}
        >
          <Icon icon="mdi:send" />
        </button>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div className="flex items-end gap-2 justify-start">
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
      Dr
    </div>

    <div className="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-100 rounded-bl-sm">
      <div className="flex items-center gap-1">
        <span className="text-gray-500 text-xs">Typing</span>
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:120ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:240ms]" />
        </span>
      </div>
    </div>
  </div>
);

const ChatMessage: React.FC<{ message: Messages }> = ({ message }) => {
  const isMe = (message as any).sender === "me";
  const avatar = (message as any).avatar as string | undefined;

  return (
    <div
      className={`flex items-end gap-2 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe &&
        (avatar ? (
          <img
            src={avatar}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/64?text=U";
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
            U
          </div>
        ))}

      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm break-words whitespace-pre-wrap ${
          isMe
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-100 rounded-bl-sm"
        }`}
      >
        {(message as any).text}
        <div
          className={`text-[10px] mt-1 ${
            isMe ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {(message as any).time}
        </div>
      </div>

      {isMe && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
          Me
        </div>
      )}
    </div>
  );
};

export default VideoCall;
