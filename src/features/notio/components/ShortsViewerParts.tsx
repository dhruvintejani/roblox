import React, { useEffect, useRef, useState } from "react";
import type { CommentNode } from "../interface/IShorts";
import { cx } from "../../../lib/cx";

export function formatCount(n: number) {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return `${n}`;
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random()
    .toString(16)
    .slice(2)}_${Date.now().toString(16)}`;
}
export function timeAgo(ts: number) {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
export function you() {
  return {
    name: "You",
    avatarUrl: "https://api.dicebear.com/8.x/thumbs/svg?seed=you",
  };
}

export function YTThumbUp({ filled }: { filled?: boolean }) {
  return filled ? (
    <svg width="22" height="22" viewBox="0 0 24 24" className="fill-white">
      <path d="M9 21H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4v11z" />
      <path d="M22 10a2 2 0 0 0-2-2h-6.31l.95-4.57.02-.23a1 1 0 0 0-.29-.7L13.17 1 7.59 6.59A2 2 0 0 0 7 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l3-9z" />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="fill-none stroke-white"
      strokeWidth="2"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4v11z" />
      <path d="M22 10a2 2 0 0 0-2-2h-6.31l.95-4.57.02-.23a1 1 0 0 0-.29-.7L13.17 1 7.59 6.59A2 2 0 0 0 7 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l3-9z" />
    </svg>
  );
}
export function YTThumbDown({ filled }: { filled?: boolean }) {
  return filled ? (
    <svg width="22" height="22" viewBox="0 0 24 24" className="fill-white">
      <path d="M15 3h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4V3z" />
      <path d="M2 14a2 2 0 0 0 2 2h6.31l-.95 4.57-.02.23a1 1 0 0 0 .29.7L10.83 23l5.58-5.59A2 2 0 0 0 17 16V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2l-3 9z" />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="fill-none stroke-white"
      strokeWidth="2"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4V3z" />
      <path d="M2 14a2 2 0 0 0 2 2h6.31l-.95 4.57-.02.23a1 1 0 0 0 .29.7L10.83 23l5.58-5.59A2 2 0 0 0 17 16V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2l-3 9z" />
    </svg>
  );
}
export function YTCommentIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="fill-none stroke-white"
      strokeWidth="2"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}
export function YTShareIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="fill-none stroke-white"
      strokeWidth="2"
    >
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}
export function YTPlayPauseIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg width="22" height="22" viewBox="0 0 24 24" className="fill-white">
      <path d="M8 5v14l11-7z" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" className="fill-white">
      <path d="M6 5h4v14H6z" />
      <path d="M14 5h4v14h-4z" />
    </svg>
  );
}

export function YTVolumeIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="fill-none stroke-white"
      strokeWidth="2"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M23 9l-6 6" />
      <path d="M17 9l6 6" />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="fill-none stroke-white"
      strokeWidth="2"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function RailButton({
  label,
  count,
  onClick,
  children,
  active,
  showLabelInsteadOfCount,
}: {
  label: string;
  count?: number;
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
  showLabelInsteadOfCount?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group flex flex-col items-center gap-2 select-none active:scale-95 transition-transform duration-150 ease-out"
    >
      <span
        className={cx(
          "grid place-items-center rounded-full w-14 h-14 bg-[#1f1f1f]/90 ring-1 ring-white/10",
          active && "bg-white/15 ring-white/20"
        )}
      >
        <span className="group-active:scale-90 transition-transform duration-200 ease-out">
          {children}
        </span>
      </span>
      <span className="text-sm font-medium text-white/95">
        {showLabelInsteadOfCount
          ? label
          : typeof count === "number"
          ? formatCount(count)
          : label}
      </span>
    </button>
  );
}

export function CommentsDrawer({
  open,
  onClose,
  comments,
  onAddComment,
  onAddReply,
}: {
  open: boolean;
  onClose: () => void;
  comments: CommentNode[];
  onAddComment: (text: string) => void;
  onAddReply: (commentId: string, text: string) => void;
}) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open) {
      setText("");
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <>
      <div
        className={cx(
          "fixed inset-0 z-[80] transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div
        className={cx(
          "fixed right-0 top-0 z-[90] h-[100dvh] w-[420px] max-w-[92vw]",
          "bg-[#0f0f0f] border-l border-white/10 shadow-2xl",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Comments"
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="text-sm font-semibold text-white">Comments</div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 hover:bg-white/10 active:scale-95 transition"
              aria-label="Close comments"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="fill-none stroke-white"
                strokeWidth="2"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 [-webkit-overflow-scrolling:touch]">
            {comments.length === 0 ? (
              <div className="text-sm text-white/60">
                Be the first to comment.
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <CommentItem
                    key={c.id}
                    node={c}
                    depth={0}
                    onAddReply={onAddReply}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={2}
                placeholder="Add a comment…"
                className={cx(
                  "w-full resize-none rounded-xl bg-white/5 border border-white/10",
                  "px-3 py-2 text-sm text-white placeholder:text-white/40",
                  "focus:outline-none focus:ring-2 focus:ring-white/20"
                )}
              />
              <button
                type="button"
                onClick={() => {
                  const t = text.trim();
                  if (!t) return;
                  onAddComment(t);
                  setText("");
                }}
                className={cx(
                  "shrink-0 rounded-xl px-3 py-2 text-sm font-semibold",
                  "bg-white text-black hover:bg-white/90 active:scale-95 transition"
                )}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function CommentItem({
  node,
  depth,
  onAddReply,
}: {
  node: CommentNode;
  depth: number;
  onAddReply: (commentId: string, text: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className={cx("flex gap-3", depth > 0 && "ml-10")}>
      <img
        src={node.user.avatarUrl}
        alt={node.user.name}
        className="h-8 w-8 rounded-full bg-white/10 object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold text-white/90">
            {node.user.name}
          </div>
          <div className="text-[11px] text-white/50">
            {timeAgo(node.createdAt)}
          </div>
        </div>
        <div className="mt-1 text-sm text-white/90 leading-snug">
          {node.text}
        </div>

        <div className="mt-2 flex items-center gap-3 text-[11px] text-white/60">
          <button
            type="button"
            onClick={() => setReplying((v) => !v)}
            className="hover:text-white/90 active:scale-95 transition"
          >
            Reply
          </button>
        </div>

        {replying && (
          <div className="mt-2 flex items-end gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply…"
              className={cx(
                "w-full rounded-xl bg-white/5 border border-white/10",
                "px-3 py-2 text-sm text-white placeholder:text-white/40",
                "focus:outline-none focus:ring-2 focus:ring-white/20"
              )}
            />
            <button
              type="button"
              onClick={() => {
                const t = replyText.trim();
                if (!t) return;
                onAddReply(node.id, t);
                setReplyText("");
                setReplying(false);
              }}
              className="rounded-xl px-3 py-2 text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-95 transition"
            >
              Reply
            </button>
          </div>
        )}

        {node.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {node.replies.map((r) => (
              <CommentItem
                key={r.id}
                node={r}
                depth={depth + 1}
                onAddReply={onAddReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}