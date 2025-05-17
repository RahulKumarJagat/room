import React, { useEffect, useRef, useState } from "react";

const Header: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-hide logic: show on mousemove at top 80px, hide after 5s
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => setVisible(false), 5000);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2
        flex gap-4 px-8 py-3 rounded-2xl
        bg-white/80 glass-effect shadow-2xl
        z-30 border border-gray-200 items-center
        backdrop-blur-lg transition-all
        min-w-[320px] max-w-[600px]
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        duration-500
      `}
    >
      <span className="font-semibold text-lg">Meeting Room</span>
      <span className="text-gray-700 font-mono text-base">{formatTime(seconds)}</span>
    </div>
  );
};

export default Header;