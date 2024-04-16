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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  // End Load Animation

  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  const onClose = () => {
    buttonClick.play();
    setChatDialogOpen(false);
  };

  const onOpen = () => {
    buttonClick.play();
    setChatDialogOpen(true);
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
                onClick={onOpen}
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
                  <ZenAI close={onClose} chat={chat} setChat={setChat} />
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
