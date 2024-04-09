import React, { useContext, useState, useRef, useEffect } from "react";
import { newShade } from "../../utils/newShade";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import styles from "./chatbot.module.css";
import { useSelector } from "react-redux";

function Chatbot({ close, chat, setChat }) {
  const reduxtheme = useSelector((state) => state.theme.theme);
  const theme = reduxtheme.color;

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendMessage = async (message) => {
    reset();
    setChat([...chat, { message: message, sender: "user" }]);
    setIsLoading(true);
    try {
      let res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `${message}. (Limit the answer within 75 words but don't mention it in your answer)` }],
          max_tokens: 100,
        }),
      });
      const data = await res.json();
      setChat([
        ...chat,
        { message: message, sender: "user" },
        { message: data.choices[0].message.content, sender: "bot" },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    sendMessage(data.message);
  };

  const clearChat = () => {
    setChat([
      {
        message: "Hello, I am ZenBot. How can I help you?",
        sender: "bot",
      },
    ]);
  };

  return (
    <div className={styles.modalStyle}>
      <h2>🤖 Ask me anything</h2>
      <IconButton
        onClick={close}
        style={{ position: "absolute", right: "10px", top: "10px" }}
      >
        <Icon icon="carbon:close" />
      </IconButton>
      <IconButton
        onClick={clearChat}
        style={{ position: "absolute", right: "50px", top: "10px" }}
      >
        <Icon icon="ant-design:clear-outlined" />
      </IconButton>

      <div
        id="messageBody"
        className={styles.chatStyle}
        style={{ backgroundColor: newShade(theme, -50), color:reduxtheme.text }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {chat.map((item, idx) => {
            return (
              <div
                key={idx}
                className={styles.messageStyle}
                style={{
                  alignSelf: item.sender == "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    item.sender == "user"
                      ? `${newShade(theme, 0)}`
                      : `${newShade(theme, -20)}`,
                }}
              >
                {item.message}
              </div>
            );
          })}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <input
          type="text"
          placeholder="Type here"
          style={{ backgroundColor: newShade(theme, -10) }}
          className={styles.inputStyle}
          {...register("message", { required: true })}
        />
        <IconButton disabled={isLoading} type="submit">
          {isLoading ? (
            <Icon icon="line-md:loading-twotone-loop" />
          ) : (
            <Icon icon="basil:send-solid" />
          )}
        </IconButton>
      </form>
    </div>
  );
}

export default Chatbot;
