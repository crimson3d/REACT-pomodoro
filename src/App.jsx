import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const initialStop = 5;
  const initialLength = 25;
  const [stop, setStop] = useState(initialStop);
  const [length, setLength] = useState(initialLength);
  const [timeLeft, setTimeLeft] = useState(length * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimeLeft(length * 60);
  }, [length]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (isSession) {
        setIsSession(false);
        setTimeLeft(stop * 60);
      } else {
        setIsSession(true);
        setTimeLeft(length * 60);
      }
    }
  }, [timeLeft, isSession, stop, length]);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsSession(true);
    setStop(initialStop);
    setLength(initialLength);
    setTimeLeft(initialLength * 60);
  };

  const handleAddStop = () => {
    if (!isRunning && stop < 60) {
      setStop(stop + 1);
    }
  };

  const handleSubStop = () => {
    if (!isRunning && stop > 0) {
      setStop(stop - 1);
    }
  };

  const handleAddLength = () => {
    if (!isRunning && length < 60) {
      setLength(length + 1);
    }
  };

  const handleSubLength = () => {
    if (!isRunning && length > 0) {
      setLength(length - 1);
    }
  };

  return (
    <div className="main">
      <div className="main__content">
        <h1 className="content__title">25 + 5 Clock</h1>
        <div className="content__middle">
          <div className="middle__left">
            <p className="left__title">Break Length</p>
            <div className="left__content">
              <button onClick={handleAddStop} disabled={isRunning}>
                <i className="bi bi-arrow-up-circle fs-2"></i>
              </button>
              {stop}
              <button onClick={handleSubStop} disabled={isRunning}>
                <i className="bi bi-arrow-down-circle fs-2"></i>
              </button>
            </div>
          </div>
          <div className="middle__right">
            <p className="right__title">Session Length</p>
            <div className="right__content">
              <button onClick={handleAddLength} disabled={isRunning}>
                <i className="bi bi-arrow-up-circle fs-2"></i>
              </button>
              {length}
              <button onClick={handleSubLength} disabled={isRunning}>
                <i className="bi bi-arrow-down-circle fs-2"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__bottom">
          <p className="bottom__title">{isSession ? "Session" : "Break"} Time</p>
          <p className="bottom__time">{Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</p>
          <button onClick={handleStartStop}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <p>Coded by José Antonio Sánchez Fuentes</p>
    </div>
  );
}


export default App;
