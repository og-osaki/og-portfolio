import { useState, useEffect, useRef } from 'react';

function Timer() {

    const max = 5; /* テスト用 */

    const [rem, setRem] = useState(() => {

        const savedStart = sessionStorage.getItem("rem");
        return savedStart ? Number(savedStart) : max;
    });

    const [isRunning, setIsRunning] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const intervalRef = useRef(null);

    // タイマー制御
    useEffect(() => {
        if(!isRunning) return;      /* =falseならなにもしない */

        const startTime = Date.now();

        intervalRef.current = setInterval(() => {
            setRem((r) => {
                if(r <= 1) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    sessionStorage.removeItem("rem");

                    setShowModal(true);

                    // 通知
                    if(Notification.permission === "granted") {
                            new Notification("30分経過しました。立ち上がって休憩しましょう🕺");
                        }

                    return max;
                }

                const updated = r - 1;
                sessionStorage.setItem("rem", updated);
                return updated;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);


    const handleStart = () => {

        // スタートボタン押したときに通知許可
        if("Notification" in window) {
            if(Notification.permission === "default") {
                Notification.requestPermission();
            }
        }

        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setRem(max);
        sessionStorage.setItem("rem", max);
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

            <div className="timer-btn-flex">
                <button onClick={handleStart} className="reload-btn" id="startBtn">スタート</button>
                <button onClick={handleStop} className="reload-btn" id="stopBtn">ストップ</button>
                <button onClick={handleReset} className="reload-btn" id="resetBtn">リセット</button>
            </div>

            {/* モーダル */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>30分経過しました。立ち上がって休憩しましょう🕺</h3>
                        <button onClick={() => setShowModal(false)}>閉じる</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Timer;