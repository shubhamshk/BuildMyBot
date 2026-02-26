"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Play, Pause, FastForward, Rewind, SkipForward, SkipBack, ArrowLeft, Package, Film, Maximize, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";

// Sample videos for the preview
const sampleVideos = [
  { id: 1, title: "Bot Interaction Preview", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", duration: "10:53" },
  { id: 2, title: "Character Customization", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", duration: "09:56" },
  { id: 3, title: "World Lore Setup", url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", duration: "00:15" },
];

export default function SamplePackPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      if (currentVideoIndex < sampleVideos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', onEnded);
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(e => console.log(e));
    }
  }, [currentVideoIndex]); // Auto-play when video changes if it was playing

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 10;
  };

  const playNext = () => {
    if (currentVideoIndex < sampleVideos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const clickPercentage = clickPosition / rect.width;
    videoRef.current.currentTime = clickPercentage * videoRef.current.duration;
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white py-12 md:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-wider mb-6">
            <Package className="w-4 h-4" />
            Free Content
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Sample Pack <span className="text-amber-500">Preview</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Experience the quality of our premium bots. Download the free sample pack and watch the preview videos below.
          </p>
        </motion.div>

        {/* Download Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
        >
          <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-gradient-xy pointer-events-none" />

          <div className="flex items-start gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <Download className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Download Free Sample Pack</h2>
              <p className="text-neutral-400">Includes 1 complete bot personality, 5 high-res images, and a starter guide.</p>
            </div>
          </div>

          <a
            href="/files/sample-pack.zip"
            onClick={(e) => { e.preventDefault(); alert("Preparing download..."); }}
            className="relative z-10 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl flex items-center gap-3 transition-colors shrink-0 shadow-lg shadow-amber-500/20"
          >
            <Download className="w-5 h-5" />
            Download ZIP
          </a>
        </motion.div>

        {/* Video Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* Video Screen */}
              <div className="relative aspect-video bg-black group" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={sampleVideos[currentVideoIndex].url}
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {/* Overlay Play/Pause indicator */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-amber-500/90 text-black flex items-center justify-center pl-2 backdrop-blur-md transform transition-transform hover:scale-110 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                      <Play className="w-10 h-10" />
                    </div>
                  </div>
                )}
              </div>

              {/* Controls Bar */}
              <div className="p-4 bg-neutral-900 border-t border-white/5">
                {/* Timeline */}
                <div className="mb-4 group/timeline cursor-pointer flex items-center" onClick={handleProgressClick}>
                  <span className="text-neutral-400 text-xs mr-3 w-10 text-right">{formatTime(currentTime)}</span>
                  <div className="flex-1 h-1.5 bg-neutral-800 rounded-full relative overflow-hidden group-hover/timeline:h-2 transition-all">
                    <div
                      className="absolute top-0 left-0 h-full bg-amber-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-neutral-400 text-xs ml-3 w-10">{formatTime(duration)}</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={playPrevious} className="text-neutral-400 hover:text-white transition-colors disabled:opacity-50" disabled={currentVideoIndex === 0}>
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button onClick={skipBackward} className="text-neutral-400 hover:text-white transition-colors">
                      <Rewind className="w-5 h-5" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </button>
                    <button onClick={skipForward} className="text-neutral-400 hover:text-white transition-colors">
                      <FastForward className="w-5 h-5" />
                    </button>
                    <button onClick={playNext} className="text-neutral-400 hover:text-white transition-colors disabled:opacity-50" disabled={currentVideoIndex === sampleVideos.length - 1}>
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={toggleMute} className="text-neutral-400 hover:text-white transition-colors">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          if (videoRef.current.requestFullscreen) {
                            videoRef.current.requestFullscreen();
                          }
                        }
                      }}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1 bg-[#121212] border border-white/10 rounded-3xl p-6 flex flex-col h-[400px] lg:h-auto overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Film className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold">Playlist</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {sampleVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setCurrentVideoIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${currentVideoIndex === index
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-20 h-14 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                      <Film className="w-6 h-6 text-neutral-600" />
                      {currentVideoIndex === index && isPlaying && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="flex gap-1">
                            <span className="w-1 h-3 bg-amber-500 animate-pulse" />
                            <span className="w-1 h-4 bg-amber-500 animate-pulse delay-75" />
                            <span className="w-1 h-2 bg-amber-500 animate-pulse delay-150" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <h4 className={`font-semibold truncate mb-1 ${currentVideoIndex === index ? 'text-amber-400' : 'text-neutral-200'}`}>
                      {video.title}
                    </h4>
                    <p className="text-xs text-neutral-500">{video.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={() => router.push('/#family-packs')}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-bold flex items-center gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Homepage to Buy Packs
          </button>
        </motion.div>
      </div>

      <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
    </div>
  );
}
