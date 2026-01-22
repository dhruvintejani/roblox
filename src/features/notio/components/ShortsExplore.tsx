import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Reel } from "../interface/IShorts";
import { formatCount } from "./ShortsViewerParts";
import { mockReels } from "../../../assets/data/dummydata/Notio";
import { cx } from "../../../lib/cx";

function ReelCard({ reel, onClick }: { reel: Reel; onClick: () => void }) {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [hovering, setHovering] = useState(false);

  const playPreview = useCallback(async () => {
    const v = vidRef.current;
    if (!v) return;
    try {
      v.muted = true;
      v.volume = 0;
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof (p as any).then === "function") await p;
    } catch {}
  }, []);

  const stopPreview = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  }, []);

  useEffect(() => {
    if (!hovering) return;
    void playPreview();
    return () => stopPreview();
  }, [hovering, playPreview, stopPreview]);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className={cx(
        "group relative overflow-hidden rounded-2xl text-left",
        "bg-white/5 ring-1 ring-white/10 hover:ring-white/20",
        "active:scale-[0.99] transition"
      )}
      aria-label={`Open ${reel.caption}`}
    >
      <div className="aspect-[9/16] w-full relative">
        <img
          src={reel.thumbnail}
          alt={reel.caption}
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            hovering ? "opacity-0" : "opacity-100"
          )}
        />
        <video
          ref={vidRef}
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            hovering ? "opacity-100" : "opacity-0"
          )}
          src={reel.videoUrl}
          preload="metadata"
          playsInline
          webkit-playsinline="true"
          loop
          muted
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 right-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />
      </div>

      <div className="absolute left-4 right-4 bottom-4">
        <div className="flex items-center gap-2">
          <img
            src={reel.user.avatar}
            alt={reel.user.username}
            className="h-8 w-8 rounded-full bg-white/10 object-cover"
          />
          <div className="text-sm font-semibold text-white/95">
            @{reel.user.username}
          </div>
        </div>

        <div className="mt-2 line-clamp-2 text-sm font-semibold text-white">
          {reel.caption}
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-white/75">
          <span className="inline-flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="fill-white/80"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4v11z" />
              <path d="M22 10a2 2 0 0 0-2-2h-6.31l.95-4.57.02-.23a1 1 0 0 0-.29-.7L13.17 1 7.59 6.59A2 2 0 0 0 7 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l3-9z" />
            </svg>
            {formatCount(reel.likes)}
          </span>

          <span className="inline-flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="fill-none stroke-white/80"
              strokeWidth="2"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
            {formatCount(reel.comments)}
          </span>

          <span className="inline-flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="fill-none stroke-white/80"
              strokeWidth="2"
            >
              <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
              <path d="M16 6l-4-4-4 4" />
              <path d="M12 2v14" />
            </svg>
            {formatCount(reel.shares)}
          </span>
        </div>
      </div>

      <div className="absolute right-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white/90">
        {reel.category}
      </div>
    </button>
  );
}

export default function ShortsExplore() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = useMemo(
    () => ["All", "For You", "Adventure", "Lifestyle", "Sports", "Food", "Fitness", "Tech", "Nature", "Music"],
    []
  );

  const discoveryReels = useMemo(() => {
    if (selectedCategory === "All" || selectedCategory === "For You") {
      return mockReels.slice(0, 4);
    }

    return mockReels.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const handleReelClick = useCallback(
    (reel: Reel) => {
      navigate(`/shorts/${reel.id}`);
    },
    [navigate]
  );

  return (
    <div className="min-h-[100dvh] bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Shorts</h1>
              {/* <p className="text-gray-400">
                Watch short videos tailored for you
              </p> */}
            </div>
            {/* <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold transition-colors">
              Upload Short
            </button> */}
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cx(
                  "px-5 py-2 rounded-full whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-white/10 hover:bg-white/20 text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {discoveryReels.length === 0 ? (
            <div className="col-span-full text-center text-white/70 text-lg py-20">
              No shorts available for{" "}
              <span className="font-semibold">{selectedCategory}</span>
            </div>
          ) : (
            discoveryReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                onClick={() => handleReelClick(reel)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
