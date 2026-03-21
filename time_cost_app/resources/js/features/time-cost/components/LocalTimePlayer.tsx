import { useEffect, useRef, useState } from "react";
import TimeAudio from "../../../assets/Pink Floyd – Time (Official Audio).mp3";
import AlbumCover from "../../../assets/The_Dark_Side_of_the_Moon_cover.svg";

export default function LocalTimePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    function handlePlay() {
      setIsPlaying(true);
    }
    function handlePause() {
      setIsPlaying(false);
    }
    function handleTimeUpdate() {
      const audio = audioRef.current;

      if (!audio || !Number.isFinite(audio.currentTime)) {
        return;
      }

      setCurrentTime(audio.currentTime);
    }
    function handleLoaded() {
      const audio = audioRef.current;

      if (!audio || !Number.isFinite(audio.duration)) {
        return;
      }

      setDuration(audio.duration);
    }
    const audio = audioRef.current;
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handlePause);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();

      return;
    }

    if (audio.currentTime < 1) {
      audio.currentTime = 41;
      setCurrentTime(41);
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {});
  }

  function handleSeek(event: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;

    if (!audio || !duration || !Number.isFinite(duration)) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const nextTime = Math.min(Math.max(ratio, 0), 1) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  const progress = duration > 0 && Number.isFinite(duration) ? Math.min(currentTime / duration, 1) : 0;

  function formatTime(value: number) {
    if (!Number.isFinite(value) || value < 0) {
      return "0:00";
    }

    const totalSeconds = Math.floor(value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${paddedSeconds}`;
  }

  return (
    <div className="w-full max-w-[560px] rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-900 text-white">
      <audio ref={audioRef} src={TimeAudio} preload="metadata" />
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          <img src={AlbumCover} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Time</span>
              <span className="text-xs text-neutral-300">Pink Floyd</span>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              {isPlaying ? (
                <span className="text-lg leading-none">❚❚</span>
              ) : (
                <span className="text-lg leading-none">▶</span>
              )}
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <div
              className="relative h-1.5 w-full cursor-pointer rounded-full bg-neutral-700"
              onClick={handleSeek}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-emerald-400"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

