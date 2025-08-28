import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        h: Math.floor(difference / (1000 * 60 * 60)),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="de_countdown">
      {timeLeft.h > 0 || timeLeft.m > 0 || timeLeft.s > 0 ? (
        `${timeLeft.h}h ${timeLeft.m}m ${timeLeft.s}s`
      ) : (
        "Expired"
      )}
    </div>
  );
};

export default Countdown;