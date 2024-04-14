import { useEffect } from "react";
import "./BgImage.css";

import { useSelector } from "react-redux";
import Themes from "../Themes/Themes";

export default function MediaPlayer() {
  const reduxtheme = useSelector((state) => state.theme.theme);

  const showImage = () => {
    const img = document.getElementById("gif");
    img.style.visibility = "visible";
  };
  // useEffect(() => {
  //   const img = document.getElementById("gif");
  //   if (img.complete) {
  //     showImage();
  //   } else {
  //     img.style.visibility = "hidden";
  //   }
  // }, [reduxtheme.gif]);

  return (
    <div className="bg-image">
      <div
        className="gif-blur"
        // style={{ backgroundImage: `url(${reduxtheme.bg})` }}
      >
        {/* <img id="gif" alt="gif" src={reduxtheme.gif} onLoad={showImage}/> */}
        <video id="gif" alt="gif" src={reduxtheme.gif} muted autoPlay loop />
        <div className="blur"/>
      </div>
      {/* <div style={{marginTop:"10px"}}>
        <Themes/>
      </div> */}
    </div>
  );
}
