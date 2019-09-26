import React, {useState, useEffect} from 'react';

var timer;
function LoadingBar({height, start, isInterval, interval, execute, show = true}) {
  const [startTime, setStartTime] = useState(0);
  const [on, setOn] = useState(start);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setOn(start);
  }, [start]);

  useEffect(() => {
    if(on) {
      // if (executeBefore) {
      //   executeBefore();
      // }
      setStartTime(new Date().getTime());
    } else {
      clearTimeout(timer);
    }
  }, [on]);

  useEffect(() => {
    if(on) {
      startTimer();
    }
  }, [startTime]);

  const startTimer = () => {
    if(on) {
      const now = new Date().getTime();
      if(now - startTime <= interval ) {
        timer = setTimeout(startTimer, );
        setProgress((now - startTime)*100/interval + '%');
      } else {
        if(isInterval) {
          const now = new Date().getTime();
          setStartTime(now);
        } else {
          setProgress('100%')
        }
        execute();
      }
    }
  }

  return (
    <React.Fragment>
      { show &&
        <div className="loadingBarBorder">
          <div className="loadingBarFill" style={{height, width: progress}}>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default LoadingBar;
