import React, { useState, useEffect } from "react";

function Card({ onDelete }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
      timer = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev < totalSeconds) {
            return prev + 1;
          } else {
            setIsRunning(false);
            clearInterval(timer);
            return totalSeconds;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime((prev) => ({
      ...prev,
      [name]: Math.min(60, Math.max(0, parseInt(value, 10) || 0)),
    }));
  };

  const remainingTime = {
    hours: Math.floor(
      (time.hours * 3600 + time.minutes * 60 + time.seconds - elapsedTime) /
        3600
    ),
    minutes: Math.floor(
      ((time.hours * 3600 + time.minutes * 60 + time.seconds - elapsedTime) %
        3600) /
        60
    ),
    seconds:
      (time.hours * 3600 + time.minutes * 60 + time.seconds - elapsedTime) % 60,
  };

  return (
    <div className="timer">
      <div className="timer__buttons">
        <button className="timer__button" onClick={() => setIsRunning(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </button>
        <button className="timer__button" onClick={() => setIsRunning(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
            />
          </svg>
        </button>
      </div>
      <div className="timer__wrapper">
        <div className="timer__time">
          <input
            className="timer__input"
            type="number"
            name="hours"
            value={time.hours}
            onChange={handleChange}
          />
          :
          <input
            className="timer__input"
            type="number"
            name="minutes"
            value={time.minutes}
            onChange={handleChange}
          />
          :
          <input
            className="timer__input"
            type="number"
            name="seconds"
            value={time.seconds}
            onChange={handleChange}
          />
          <div>
            {`${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "lightgray",
          }}
        >
          <div
            style={{
              width: `${
                (elapsedTime /
                  (time.hours * 3600 + time.minutes * 60 + time.seconds)) *
                100
              }%`,
              height: "100%",
              backgroundColor: "green",
            }}
          ></div>
        </div>
      </div>

      <button className="timer__button" onClick={onDelete}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
</button>
    </div>
  );
}

export default Card;
