import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CommentsDrawer, cx, you, RailButton, uid, YTCommentIcon, YTPlayPauseIcon, YTShareIcon, YTThumbDown, YTThumbUp, YTVolumeIcon } from "./ShortsViewerParts";
import type { CommentNode, Reel } from "../interface/IShorts";

export default function ShortsViewer({
  initialFeed,
  initialActiveId,
  muted,
  onExit,
}: {
  initialFeed: Reel[];
  initialActiveId: string;
  muted: boolean;
  onExit: () => void;
}) {
  const safeFeed = Array.isArray(initialFeed) ? initialFeed : [];

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());

  const [feed] = useState<Reel[]>(safeFeed);

  const [activeId, setActiveId] = useState<string>(
    initialActiveId || safeFeed?.[0]?.id || ""
  );

  const [liked, setLiked] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    safeFeed.forEach((r) => (map[r.id] = r.isLiked));
    return map;
  });

  const [disliked, setDisliked] = useState<Record<string, boolean>>({});
  const [pausedByUser, setPausedByUser] = useState<Record<string, boolean>>({});

  const [followByUser, setFollowByUser] = useState<Record<string, boolean>>(
    () => {
      const map: Record<string, boolean> = {};
      safeFeed.forEach((r) => (map[r.user.id] = r.user.isFollowing));
      return map;
    }
  );

  const [subPulse, setSubPulse] = useState<Record<string, boolean>>({});
  const [commentsByReel, setCommentsByReel] = useState<
    Record<string, CommentNode[]>
  >({});
  const [commentsOpen, setCommentsOpen] = useState(false);

  const activeComments = useMemo(
    () => commentsByReel[activeId] ?? [],
    [commentsByReel, activeId]
  );

  const [mute, setMute] = useState<boolean>(muted);

  useEffect(() => {
    setMute(muted);
  }, [muted]);

  useEffect(() => {
    if (!scrollerRef.current) return;
    const idx = feed.findIndex((x) => x.id === activeId);
    if (idx >= 0)
      itemRefs.current.get(feed[idx].id)?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (!best) return;
        const id = (best.target as HTMLElement).dataset.id;
        if (id && id !== activeId) setActiveId(id);
      },
      { root, threshold: [0.55, 0.7, 0.85, 0.95] }
    );

    itemRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [feed.length, activeId]);

  const onLike = (id: string) => {
    setLiked((p) => ({ ...p, [id]: !p[id] }));
    setDisliked((p) => ({ ...p, [id]: false }));
  };

  const onDislike = (id: string) => {
    setDisliked((p) => ({ ...p, [id]: !p[id] }));
    setLiked((p) => ({ ...p, [id]: false }));
  };

  const togglePlayPause = async (id: string) => {
    const vid = videoRefs.current.get(id);
    setPausedByUser((p) => ({ ...p, [id]: !p[id] }));
    if (!vid) return;

    try {
      if (!vid.paused) {
        vid.pause();
        return;
      }
      if (vid.readyState < 2) {
        await new Promise<void>((res) => {
          const onCanPlay = () => {
            vid.removeEventListener("canplay", onCanPlay);
            res();
          };
          vid.addEventListener("canplay", onCanPlay, { once: true });
        });
      }
      await vid.play();
    } catch {}
  };

  useEffect(() => {
    if (!feed.length || !activeId) return;

    videoRefs.current.forEach((v, id) => {
      if (id !== activeId) {
        try {
          v.pause();
          v.currentTime = 0;
        } catch {}
      }
    });

    const v = videoRefs.current.get(activeId);
    if (!v) return;

    try {
      v.muted = mute;
    } catch {}

    if (pausedByUser[activeId]) return;

    const tryPlay = async () => {
      try {
        if (v.readyState < 2) {
          await new Promise<void>((res) => {
            const onCanPlay = () => {
              v.removeEventListener("canplay", onCanPlay);
              res();
            };
            v.addEventListener("canplay", onCanPlay, { once: true });
          });
        }
        const p = v.play();
        if (p && typeof (p as any).then === "function") await p;
      } catch {}
    };

    requestAnimationFrame(() => {
      void tryPlay();
    });
  }, [activeId, feed.length, mute, pausedByUser]);

  useEffect(() => {
    const v = videoRefs.current.get(activeId);
    if (!v) return;
    try {
      v.muted = mute;
    } catch {}
  }, [activeId, mute]);

  const toggleFollow = (userId: string) => {
    setFollowByUser((p) => ({ ...p, [userId]: !p[userId] }));
    setSubPulse((p) => ({ ...p, [userId]: true }));
    window.setTimeout(
      () => setSubPulse((p) => ({ ...p, [userId]: false })),
      220
    );
  };

  const addComment = (text: string) => {
    const node: CommentNode = {
      id: uid("c"),
      user: you(),
      text,
      createdAt: Date.now(),
      replies: [],
    };
    setCommentsByReel((p) => ({
      ...p,
      [activeId]: [node, ...(p[activeId] ?? [])],
    }));
  };

  const addReply = (commentId: string, text: string) => {
    const reply: CommentNode = {
      id: uid("r"),
      user: you(),
      text,
      createdAt: Date.now(),
      replies: [],
    };
    const addReplyRec = (nodes: CommentNode[]): CommentNode[] =>
      nodes.map((n) =>
        n.id === commentId
          ? { ...n, replies: [...n.replies, reply] }
          : { ...n, replies: addReplyRec(n.replies) }
      );

    setCommentsByReel((p) => ({
      ...p,
      [activeId]: addReplyRec(p[activeId] ?? []),
    }));
  };

  const onShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#reel-${activeId}`
        : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Shorts", url });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    } catch {
      alert(url);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full bg-black text-white overflow-hidden">
      <button
        type="button"
        onClick={onExit}
        className={cx(
          "absolute left-6 top-6 z-[95] rounded-full px-4 py-2 text-sm font-semibold",
          "bg-gray-700 hover:bg-gray-800 active:scale-95 transition"
        )}
        aria-label="Back"
      >
        <Icon icon="mdi:close" width={20} height={20} className="text-white" />
      </button>

      <div
        ref={scrollerRef}
        className={cx(
          "h-full w-full overflow-y-auto overscroll-y-contain",
          "snap-y snap-mandatory",
          "[-webkit-overflow-scrolling:touch]"
        )}
      >
        {feed.map((reel) => {
          const isActive = reel.id === activeId;
          const isLiked = !!liked[reel.id];
          const isDisliked = !!disliked[reel.id];
          const isPaused = !!pausedByUser[reel.id];
          const isFollowing = !!followByUser[reel.user.id];
          const isPulse = !!subPulse[reel.user.id];

          const dynamicLikes = reel.likes + (isLiked ? 1 : 0);

          return (
            <div
              key={reel.id}
              data-id={reel.id}
              ref={(el) => {
                if (!el) itemRefs.current.delete(reel.id);
                else itemRefs.current.set(reel.id, el);
              }}
              className="relative h-[100dvh] w-full snap-start snap-always"
            >
              <div className="absolute inset-0 bg-black">
                <div className="h-full w-full flex items-center justify-center px-6">
                  <div className="relative aspect-[9/16] h-[94dvh] max-h-[940px] w-auto bg-black">
                    <video
                      ref={(el) => {
                        if (!el) videoRefs.current.delete(reel.id);
                        else videoRefs.current.set(reel.id, el);
                      }}
                      className={cx(
                        "h-full w-full object-cover",
                        isActive ? "opacity-100" : "opacity-90"
                      )}
                      src={reel.videoUrl}
                      poster={reel.thumbnail}
                      preload="auto"
                      playsInline
                      webkit-playsinline="true"
                      loop
                      muted={mute}
                      onClick={() => void togglePlayPause(reel.id)}
                    />

                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-0 right-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />
                      <div className="absolute left-0 right-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />
                    </div>

                    <div className="absolute left-4 top-4 z-40 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={isPaused ? "Play" : "Pause"}
                        onClick={() => void togglePlayPause(reel.id)}
                        className={cx(
                          "grid place-items-center rounded-full w-11 h-11",
                          "bg-[#1f1f1f]/90 ring-1 ring-white/10 hover:bg-white/15 active:scale-95 transition"
                        )}
                      >
                        <YTPlayPauseIcon paused={isPaused} />
                      </button>

                      <div className="relative group">
                        <button
                          type="button"
                          aria-label={mute ? "Unmute" : "Mute"}
                          onClick={() => setMute((m) => !m)}
                          className={cx(
                            "grid place-items-center rounded-full w-11 h-11",
                            "bg-[#1f1f1f]/90 ring-1 ring-white/10 hover:bg-white/15 active:scale-95 transition"
                          )}
                        >
                          <YTVolumeIcon muted={mute} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[530px] top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6">
                  <RailButton
                    label="Like"
                    count={dynamicLikes}
                    active={isLiked}
                    onClick={() => onLike(reel.id)}
                  >
                    <YTThumbUp filled={isLiked} />
                  </RailButton>

                  <RailButton
                    label="Dislike"
                    active={isDisliked}
                    onClick={() => onDislike(reel.id)}
                    showLabelInsteadOfCount
                  >
                    <YTThumbDown filled={isDisliked} />
                  </RailButton>

                  <RailButton
                    label="Comments"
                    count={
                      reel.comments + (commentsByReel[reel.id]?.length ?? 0)
                    }
                    onClick={() => setCommentsOpen(true)}
                  >
                    <YTCommentIcon />
                  </RailButton>

                  <RailButton
                    label="Share"
                    onClick={onShare}
                    showLabelInsteadOfCount
                  >
                    <YTShareIcon />
                  </RailButton>
                </div>

                <div className="absolute left-10 bottom-10 z-40 max-w-[760px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={reel.user.avatar}
                      alt={reel.user.username}
                      className="h-10 w-10 rounded-full bg-white/10 object-cover"
                    />
                    <div className="text-lg font-semibold">
                      @{reel.user.username}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollow(reel.user.id)}
                      className={cx(
                        "ml-2 relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold",
                        "active:scale-95 transition",
                        isFollowing
                          ? "bg-white/15 text-white"
                          : "bg-white text-black hover:bg-white/90"
                      )}
                    >
                      <span
                        className={cx(
                          "inline-flex items-center gap-2 transition-all duration-200 ease-out",
                          isPulse ? "scale-[0.98]" : "scale-100"
                        )}
                      >
                        {isFollowing ? (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              className="fill-none stroke-current"
                              strokeWidth="2"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Following
                          </>
                        ) : (
                          "Follow"
                        )}
                      </span>
                      <span
                        className={cx(
                          "pointer-events-none absolute inset-0 bg-white/30 translate-x-[-120%]",
                          isPulse && "animate-[subshine_220ms_ease-out_1]"
                        )}
                      />
                    </button>

                    <div className="ml-3 text-sm text-white/60">
                      {reel.timestamp}
                    </div>
                  </div>

                  <div className="mt-5 text-2xl w-[500px] font-extrabold tracking-tight">
                    {reel.caption}
                  </div>
                </div>

                <style>{`
                  @keyframes subshine {
                    0% { transform: translateX(-120%); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateX(120%); opacity: 0; }
                  }

                  .yt-vol-range {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 4px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.7);
                    outline: none;
                  }
                  .yt-vol-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 999px;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.18);
                    cursor: pointer;
                  }
                  .yt-vol-range::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    border-radius: 999px;
                    background: #fff;
                    border: none;
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.18);
                    cursor: pointer;
                  }
                  .yt-vol-range::-moz-range-track {
                    height: 4px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.7);
                  }
                `}</style>
              </div>
            </div>
          );
        })}
      </div>

      <CommentsDrawer
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        comments={activeComments}
        onAddComment={addComment}
        onAddReply={addReply}
      />
    </div>
  );
}
