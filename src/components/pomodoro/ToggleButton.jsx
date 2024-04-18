import styles from "./pomodoro.module.css";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const ToggleButton = ({ pomodoro, setPomodoro }) => {
    function togglePausePlay() {
        setPomodoro((prevPomodoro) => {
            return {
                ...prevPomodoro,
                isPaused: !prevPomodoro.isPaused,
            };
        });
    }

    return (
        <div onClick={togglePausePlay} className={styles.timer_toggle}>
            {pomodoro.isPaused ? (
                <IconButton
                    onClick={() => togglePausePlay}
                    style={{
                        // position: "absolute",
                        // right: "10px",
                        // top: "15px",
                        color: "white",
                    }}
                >
                    <Icon icon="material-symbols:timer-play-outline" fontSize={35}/>
                </IconButton>
            ) : (
                <IconButton
                    onClick={() => togglePausePlay}
                    style={{
                        // position: "absolute",
                        // right: "10px",
                        // top: "15px",
                        color: "white",
                    }}
                >
                    <Icon icon="material-symbols:timer-pause-outline" fontSize={35}/>
                </IconButton>
            )}
        </div>
    );
};

export default ToggleButton;
