import React, { useEffect, useState } from "react";
import "./Clock.css";
import Quote from "../Quote";


const Clock = () => {
    const [time, setTime] = useState();
    const date = new Date();
    const day = date.toLocaleString("default", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setTime(date.toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <div className="clock">
            <span>{time}</span>
            <span>{day}</span>
            {/* <span><Quote /></span> */}
            <Quote />
        </div>
    );
};

export default Clock;
