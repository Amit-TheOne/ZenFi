import React, { useEffect, useRef } from "react";
import { stages } from "../../constants/pomodoro";
import ModalInput from "./ModalInput";
import { useDispatch, useSelector } from "react-redux";
import {
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
} from "../../redux/reducers/pomodoroSlice";
import styles from "./pomodoro.module.css";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const Modal = ({ isSettingsOn, setIsSettingsOn, setPomodoro }) => {
    const pomodoroFormData = useSelector((state) => state.pomodoro);

    const dispatch = useDispatch();

    const modalRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        setPomodoro((prevPomodoro) => ({
            ...prevPomodoro,
            pomodoroTime: pomodoroFormData.pomodoroTime * 60,
            shortBreakTime: pomodoroFormData.shortBreakTime * 60,
            longBreakTime: pomodoroFormData.longBreakTime * 60,
        }));
        setIsSettingsOn(false);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case "pomodoroTime":
                dispatch(setPomodoroTime(value));
                break;
            case "shortBreakTime":
                dispatch(setShortBreakTime(value));
                break;
            case "longBreakTime":
                dispatch(setLongBreakTime(value));
                break;
            default:
                break;
        }
    }

    function handleOutsideClick(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsSettingsOn(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <>
            {isSettingsOn && (
                <div className={styles.modal_container} ref={modalRef}>
                    <div className={styles.modal}>
                        <h2> Settings </h2>
                        <IconButton
                            onClick={() => setIsSettingsOn(false)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "15px",
                                color: "black",
                            }}
                        >
                            <Icon icon="carbon:close" />
                        </IconButton>
                    </div>

                    <div>
                        <h3 className={styles.modal_time_heading}>
                            Time (minutes)
                        </h3>

                        <form className={`${styles.form_handle} inputs`} onSubmit={handleSubmit}>
                            <ModalInput
                                label={"pomodoro"}
                                name={"pomodoroTime"}
                                defaultValue={pomodoroFormData.pomodoroTime}
                                // setFormData={setFormData}
                                onChange={handleInputChange}
                            />
                            <ModalInput
                                label={"short break"}
                                name={"shortBreakTime"}
                                defaultValue={pomodoroFormData.shortBreakTime}
                                // setFormData={setFormData}
                                onChange={handleInputChange}
                            />
                            <ModalInput
                                label={"long break"}
                                name={"longBreakTime"}
                                defaultValue={pomodoroFormData.longBreakTime}
                                // setFormData={setFormData}
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className={styles.modalInput_submitButton}
                            >
                                Apply
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
