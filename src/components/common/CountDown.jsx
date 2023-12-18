import React, { useEffect, useState } from "react";

const CountDown = React.memo(({ seconds }) => {
  const [time, setTime] = useState({
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(intervalId);
      } else {
        setTime((prevTime) => {
          let newHours = prevTime.hours;
          let newMinutes = prevTime.minutes;
          let newSeconds = prevTime.seconds - 1;

          if (newSeconds < 0) {
            newMinutes -= 1;
            newSeconds = 59;

            if (newMinutes < 0) {
              newHours -= 1;
              newMinutes = 59;
            }
          }

          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
          };
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div>
      <p>
        Demo Time:&nbsp;
        <b>{time.hours.toString().padStart(2, "0")}</b>
        &nbsp;giờ &nbsp;
        <b>{time.minutes.toString().padStart(2, "0")}</b>
        &nbsp;phút &nbsp;
        <b>{time.seconds.toString().padStart(2, "0")}</b>
        &nbsp; giây
      </p>
    </div>
  );
});

export default CountDown;
