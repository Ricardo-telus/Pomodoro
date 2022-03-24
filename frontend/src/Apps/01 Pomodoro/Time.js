import React, { useState, useEffect } from 'react';
import './styles.css'
function ControlButtons(props) {
  const StartButton = (
    <div className="btn btn-lg btn-light mx-3" onClick={props.handleStart}>
      Start
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-lg btn-light mx-3" onClick={props.handleReset}>
        Next
      </div>
      <div className="btn btn-lg btn-light mx-3" onClick={props.handlePauseResume}>
        {props.isPaused ? 'Resume' : 'Pause'}
      </div>
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}

function Timer(props) {
  return (
    <div className="timer">
      <span id="timer" className="digits">
        {('0' + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span id="timer" className="digits">
        {('0' + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </span>    
    </div>
  );
}

function StopWatch({minutes}) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(minutes);

  useEffect(() => {
    let interval = null;    
    if (isActive && isPaused === false) {   
      interval = setInterval(() => {
        setTime((time) =>{return(
            time===690&&(setIsPaused(true)),
            time - 10)});
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(minutes);
  };

  return (
    <div>
      <Timer time={time} />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}

export default StopWatch;