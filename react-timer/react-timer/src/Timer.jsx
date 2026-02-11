import { useState, useEffect } from 'react';

function Timer() {

    const max = 30 * 60;

    const [rem, setRem] = useState(() => {
        const savedStart = sessionStorage.getItem("startTime");

        if(!savedStart) {
            return max;
        }

        const elapsed = Math.floor((Date.now() - Number(savedStart)) / 1000);
        const leftTime = max - elapsed;
        return leftTime > 0 ? leftTime : 0;
    });

    useEffect(() => {

        let startTime = sessionStorage.getItem("startTime");

        if(!startTime) {
            startTime = Date.now();
            sessionStorage.setItem("startTime", startTime);
        }

        const interval = setInterval(() => {

            const elapsed = Math.floor((Date.now() - Number(sessionStorage.getItem("startTime"))) / 1000);
            const leftTime = max - elapsed;

        if(leftTime <= 0) {
            setRem(max);
            clearInterval(interval);
            alert("30分経過しました。立ち上がって休憩しましょう🕺");
        } else {
            setRem(leftTime);
        }
    }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleReset = () => {
        const newStart = Date.now();
        sessionStorage.setItem("startTime", newStart);
        setRem(max);
    };

    const minutes = Math.floor(rem / 60);
    const seconds = rem % 60;

    const formatMinutes = String(minutes).padStart(2, "0");
    const formatSeconds = String(seconds).padStart(2, "0");        

    return(
        <div className="timer-box">
            <h3 className="content-title">30分立ち上がりタイマー</h3>
            <p className="outline">集中しているとついつい座りっぱなしに。30分経過したら通知が出ます。</p>
            <p className="timer-inner">{formatMinutes} : {formatSeconds}</p>
            <button onClick={handleReset} class="reload-btn">リセット</button>
        </div>
    );
}

export default Timer;