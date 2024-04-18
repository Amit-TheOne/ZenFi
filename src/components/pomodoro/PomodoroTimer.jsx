import Labels from "./Labels";
import TimeDisplay from "./TimeDisplay";
import ToggleButton from "./ToggleButton";
import Modal from "./Modal";
import useTimer from "../../hooks/useTimer";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";
import useCalculateTime from "../../hooks/useCalculateTime";
import { controllers } from "../../constants/pomodoro";
import styles from "./pomodoro.module.css";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const PomodoroTimer = ({ close }) => {
  const {
    pomodoro,
    selectedControl,
    setPomodoro,
    setSelectedControl,
    resetTimerValues,
    getRemainingTimePercentage,
  } = useTimer();
  const { minutes, seconds } = useCalculateTime({
    pomodoro,
    selectedControl,
  });
  const [isSettingsOn, setIsSettingsOn] = useState(false);

  document.title = `${controllers[selectedControl].label} - ${minutes < 9 ? "0" : ""
    }${minutes}:${seconds < 9 ? "0" : ""}${seconds}`;

  return (
    <main className={styles.pomodoro_main}>
      <IconButton
        onClick={() => setIsSettingsOn(true)}
        style={{
          position: "absolute",
          left: "15px",
          top: "15px",
          color: "white",
        }}
      >
        <Icon icon="ri:list-settings-line" />
      </IconButton>
      <h2> Pomodoro Timer </h2>
      <IconButton
        onClick={close}
        style={{
          position: "absolute",
          right: "10px",
          top: "15px",
          color: "white",
        }}
      >
        <Icon icon="carbon:close" />
      </IconButton>
      <Labels
        resetTimerValues={resetTimerValues}
        selectedControl={selectedControl}
        setSelectedControl={setSelectedControl}
        setPomodoro={setPomodoro}
      />
      <div className={styles.timer_container}>
        <div className={styles.timer}>
          <div className={styles.timer_inner}>
            <CircularProgressbarWithChildren
              strokeWidth={3}
              trailColor="transparent"
              value={getRemainingTimePercentage()}
              styles={buildStyles({
                trailColor: "transparent",
                pathColor: "#f87070",
              })}
            >
              <TimeDisplay
                pomodoro={pomodoro}
                selectedControl={selectedControl}
              />
              <ToggleButton
                pomodoro={pomodoro}
                setPomodoro={setPomodoro}
              />
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>

      <Modal
        isSettingsOn={isSettingsOn}
        setIsSettingsOn={setIsSettingsOn}
        setPomodoro={setPomodoro}
      />
    </main>
  );
};

export default PomodoroTimer;
