import React, { useEffect, useState, createContext } from "react";
import "./home.css";
// import BgImage from "../../components/MediaPlayer/BgImage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Clock from "../../components/Clock/Clock";
import Weather from "../../components/weatherCard/Weather";
import { Dialog, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { newShade } from "../../utils/newShade";
import Todos from "../../components/todos/Todos";
import { auth } from "../../firebase";
import ZenAI from "../../components/zenAI/ZenAI";
import Quote from "../../components/Quote";
import SoundPlayers from "../../components/ambientSounds/ambientSounds";
import { buttonClick } from "../../assets/functions/clickSound";
import chatBot from "../../assets/images/chat.png";
// import Lottie from "react-lottie";
import animationData from "../../assets/animations/loadAnimation.json";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/reducers/userSlice";
// import Themes from "../../components/Themes/Themes";
import Timer from "../../components/Timer/Timer"
import LofiPlayer from "../../components/lofiPlayer/LofiPlayer"
import PomodoroTimer from "../../components/pomodoro/PomodoroTimer";

const iconStyle = {
  height: "25px",
  width: "25px",
  textAlign: "center",
  verticalAlign: "middle",
  filter: "invert(1)",
};


export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const reduxtheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const theme = reduxtheme.color;
  // Load Animation
  const [isLoading, setIsLoading] = useState(false);
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);
  // End Load Animation

  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [todoDialogOpen, setTodotDialogOpen] = useState(false);
  const [pomoDialogOpen, setPomoDialogOpen] = useState(false);

  const onChatClose = () => {
    buttonClick.play();
    setChatDialogOpen(false);
  };

  const onChatOpen = () => {
    buttonClick.play();
    setChatDialogOpen(true);
  };

  const onTodoClose = () => {
    buttonClick.play();
    setTodotDialogOpen(false);
  };

  const onTodoOpen = () => {
    buttonClick.play();
    setTodotDialogOpen(true);
  };

  const onPomoClose = () => {
    buttonClick.play();
    setPomoDialogOpen(false);
  };

  const onPomoOpen = () => {
    buttonClick.play();
    setPomoDialogOpen(true);
  };

  const [chat, setChat] = useState([
    {
      message: "Hey, I am ZenAI. How can I help you?",
      sender: "ZenAI",
    },
  ]);

  return (
    <>
      {isLoading ? (
        "Hello"
      ) : (
        <div className="home">

          <div className="body">
            <div className="side-column clockCom">
              <Clock />
              {/* <Weather /> */}
              {/* <Todos /> */}
            </div>
            <div className="center-column">
              <LofiPlayer />
            </div>
            <div className="side-column">
              {/* <Timer /> */}
              {/* <Timer /> */}

              <div
                className="zenfi-bot"
                title="ZenAI"
                // style={{ backgroundColor: newShade(theme, 5) }}
                onClick={onChatOpen}
              >
                {/* <img src={chatBot} style={iconStyle} />  */}
                {/* {" "} ZenAI */}
                🤖
              </div>
              <Dialog open={chatDialogOpen} maxWidth="sm">
                <div
                  id="bot-dialog"
                  // style={{ backgroundColor: newShade(theme, 5) }}
                >
                  <ZenAI close={onChatClose} chat={chat} setChat={setChat} />
                </div>
              </Dialog>

              <div
                className="todos-button"
                title="ToDos"
                // style={{ backgroundColor: newShade(theme, 5) }}
                onClick={onTodoOpen}
              >
                <Icon icon="mdi:format-list-checkbox" fontSize={25}/>
              </div>
              
              <Dialog open={todoDialogOpen} maxWidth="sm">
                <div
                  id="todo-dialog"
                  // style={{ backgroundColor: newShade(theme, 5) }}
                >
                  <Todos close={onTodoClose}/>
                </div>
              </Dialog>

              <div
                className="pomodoro-button"
                title="Pomodoro Timer"
                // style={{ backgroundColor: newShade(theme, 5) }}
                onClick={onPomoOpen}
              >
                <Icon icon="gis:timer" fontSize={25}/>
              </div>

              <Dialog open={pomoDialogOpen} maxWidth="sm">
                <div
                  id="pomodoro-dialog"
                  // style={{ backgroundColor: newShade(theme, 5) }}
                >
                  <PomodoroTimer close={onPomoClose}/>
                </div>
              </Dialog>

              {/* <div
                className="gamesButton"
                id="trivia_container"
                style={{ backgroundColor: newShade(theme, 5) }}
                onClick={() => {
                  navigate("/trivia");
                  buttonClick.play();
                }}
              >
                💡Trivia
              </div> */}
              {/* <SoundPlayers /> */}
              {/* <Quote /> */}
              {/* <LofiPlayer /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
