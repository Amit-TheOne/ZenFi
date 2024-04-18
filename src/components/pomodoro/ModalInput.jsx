import React from "react";
import styles from "./pomodoro.module.css";

const ModalInput = ({ label, defaultValue, onChange, name }) => {
  return (
    <div className={`form-group ${styles.modalInput_container} `}>
      <label
        htmlFor={name}
        className={styles.modalInput_label}>
        {label}
      </label>
      <input
        className={`settingsInput ${styles.modalInput_input} focus:outline-none`}
        min="1"
        max="60"
        type="number"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default ModalInput;
