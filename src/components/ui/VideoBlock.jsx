import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

export function VideoBlock({
  src,
  poster,
  className = "",
  isPlaying = true,
  isMuted = true,
  loop = true,
  playsInline = true,
  priority = false,
}) {
  const videoRef = useRef(null);
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [loadedSrc, setLoadedSrc] = useState(priority ? src : "");

  useEffect(() => {
    if (priority) return;
    if (isInView && !loadedSrc) {
      setLoadedSrc(src);
    }
  }, [isInView, loadedSrc, src, priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isPlaying && isInView && loadedSrc) {
      const playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted, isInView, loadedSrc]);

  return (
    <div ref={ref} className={className}>
      <video
        ref={videoRef}
        src={loadedSrc}
        poster={poster}
        loop={loop}
        playsInline={playsInline}
        className="w-full h-full object-cover"
        preload={loadedSrc ? "metadata" : "none"}
      />
    </div>
  );
}