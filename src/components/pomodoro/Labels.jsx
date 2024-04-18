import { controllers } from "../../constants/pomodoro";
import styles from "./pomodoro.module.css";

const Labels = ({ selectedControl, setSelectedControl, resetTimerValues, setPomodoro }) => {
  function handleSelectedControl(index) {
    setSelectedControl(index);
    resetTimerValues();
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      isPaused: true,
    }));
  }

  return (
    <div>
      <ul className={styles.label}>
        {controllers.map((controller, index) => (
          <li
            key={index}
            className={`${styles.label_list} ${selectedControl === index && styles.label_list_active}`}
            onClick={() => handleSelectedControl(index)}>
            {controller.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Labels;
