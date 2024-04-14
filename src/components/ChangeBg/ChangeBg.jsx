import { useState, useEffect } from "react";
import "./ChangeBg.css";
import { Icon } from "@iconify/react";
// import { newShade } from "../../utils/newShade";
import { TextField, MenuItem } from "@mui/material";
import { themes as allThemes } from "../../constants/themes";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeById } from "../../redux/reducers/themeSlice";
import { saveTheme } from "../../redux/reducers/userSlice";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
// import { themes } from "../../constants/themes";

export default function Themes() {
    const theme = useSelector((state) => state.theme.theme);
    // const [themeId, setThemeId] = useState(theme.id);
    const [index, setIndex] = useState(1);

    // console.log(themeId)
    // const theme = reduxtheme.color
    const dispatch = useDispatch();
    // const id = Math.floor(Math.random() * 7) + 1;

    const changeTheme = () => {
        const id = Math.floor(Math.random() * 7) + 1;
        dispatch(changeThemeById(id));
        dispatch(saveTheme(id));

        // useEffect(() => {
        //   dispatch(changeThemeById(id));
        //   dispatch(saveTheme(id));

        //   return () => {
        //     second
        //   }
        // }, [third])
    };

    useEffect(() => {
        setIndex((index + 1) % allThemes.length);
        // return () => {
        //   second
        // }
    }, []);

    return (
        <div className="themeOut">
            <div className="themes">
                {/* <TextField
          defaultValue={theme.id}
          select
          placeholder="themes"
          size="small"
          label={
            <Icon
              style={{ fontSize: "20px", color: theme.text }}
              icon="fa-solid:brush"
            />
          }
          sx={{
            width: "100px",
            mb: 1,
            backgroundColor: theme.color,
            color: theme.text,
          }}
        > */}
                <ChangeCircleIcon
                    style={{ color: "whitesmoke", cursor: "pointer" }}
                    defaultValue={theme.id}
                    onClick={() => changeTheme()}
                >
                    {/* <Icon 
          icon="mdi:circle-arrows" 
          style={{height: "30px", width: "30px"}}
        > */}
                    {/* {allThemes.map((item) => {
                        return (
                            <MenuItem
                                key={item.id}
                                value={item.id}
                                onClick={() => changeTheme(item.id)}
                                style={{
                                    // backgroundColor: newShade(item.color, -10),
                                    width: "100%",
                                    height: "35px",
                                    color: item.text,
                                }}
                            >
                                <div
                                    id={item.id}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "50px",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            textAlign: "center",
                                            // color: item.text,
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </MenuItem>
                        );
                    })} */}
                    {/* </Icon> */}
                </ChangeCircleIcon>
                {/* </TextField> */}
            </div>
        </div>
    );
}
