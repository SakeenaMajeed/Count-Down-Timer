"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>("bg-gradient-to-br from-pink-600 to-purple-600"); // Default pink theme
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    const numDuration = typeof duration === "string" ? Number(duration) : duration;
    if (numDuration > 0) {
      setTimeLeft(numDuration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
      setBgColor("bg-gradient-to-br from-purple-700 to-pink-500");
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    setBgColor("bg-gradient-to-br from-pink-900 to-purple-700");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const changeBackgroundTheme = (theme: string) => {
    setBgColor(theme);
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setBgColor("bg-gradient-to-br from-pink-500 to-purple-600");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${bgColor} p-4 md:p-8`}>
      {/* Countdown Timer Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 hover:text-yellow-400">Count Down Timer</h1> {/* Heading for the Countdown Timer */}

      <div className="mb-4 w-full max-w-md">
        <input
          type="number"
          value={duration}
          onChange={handleDurationChange}
          placeholder="Set duration (seconds)"
          className="p-2 border-gray-400 rounded-lg text-black w-full focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSetDuration}
          className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-300 w-full"
        >
          Set Duration
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-4xl md:text-6xl text-yellow-500 font-bold">{formatTime(timeLeft)}</h1> {/* Countdown Timer */}
      </div>

      <div className="mt-4 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
        <button
          onClick={handleStart}
          disabled={isActive}
          className={`px-4 py-2 rounded-lg ${
            isActive
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white focus:ring-2 focus:ring-green-300"
          } w-full md:w-auto`}
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isActive}
          className={`px-4 py-2 rounded-lg ${
            !isActive
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-2 focus:ring-yellow-300"
          } w-full md:w-auto`}
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 w-full md:w-auto"
        >
          Reset
        </button>
      </div>

      {/* Background color theme buttons */}
      <div className="mt-8 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
        <button
          onClick={() => changeBackgroundTheme("bg-gradient-to-br from-pink-900 to-pink-700")}
          className="bg-pink-900 text-white px-4 py-2 rounded-lg hover:bg-pink-800 focus:ring-2 focus:ring-pink-600 w-full md:w-auto"
        >
          Dark Pink Theme
        </button>
        <button
          onClick={() => changeBackgroundTheme("bg-gradient-to-br from-blue-900 to-blue-700")}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-600 w-full md:w-auto"
        >
          Dark Blue Theme
        </button>
        <button
          onClick={() => changeBackgroundTheme("bg-gradient-to-br from-black to-gray-900")}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-600 w-full md:w-auto"
        >
          Black Theme
        </button>
      </div>
    </div>
  );
}
