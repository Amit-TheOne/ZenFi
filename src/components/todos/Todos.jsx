import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    updateDoc,
} from "firebase/firestore";
import { IconButton, List, ListItem } from "@mui/material";
import { Icon } from "@iconify/react";
import { newShade } from "../../utils/newShade";
import soft_click from "../../assets/sounds/soft_click.wav";
import styles from "./todos.module.css";
import { useSelector } from "react-redux";
import { toastify } from "../../utils/toastify";

const butonClick = new Audio(soft_click);
butonClick.volume = 0.1;

const Todos = ({ close }) => {
    const reduxtheme = useSelector((state) => state.theme.theme);
    const theme = reduxtheme.color;
    const user = useSelector((state) => state.user.user);

    const tabButtonStyle = {
        backgroundColor: "transparent",
        flex: 0.4,
        fontWeight: "600",
        fontSize: "16px",
        // marginTop: "2px",
        borderRadius: "8px",
        border: "1px solid #000000",
        marginLeft: "3px",
        marginRight: "3px",
        padding: "5px 5px",
        color: "black",
        cursor: "pointer",
    };

    const [allTodo, setAllTodo] = useState([]);
    const todoRef = collection(db, "todos");
    const q = query(todoRef, where("user", "==", user?.username));

    const getCompleted = () => {
        const completed = allTodo.filter((item) => item.completed === true);
        return completed;
    };

    const getIncomplete = () => {
        const incomplete = allTodo.filter((item) => item.completed === false);
        return incomplete;
    };

    const [todo, setTodo] = useState([]);
    // 1: all, 2: completed, 3: incomplete
    const [tabSelected, setTabSelected] = useState(3);

    const getAllTodos = async () => {
        try {
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            // console.log(filteredData);
            if (allTodo.length === 0)
                setTodo(
                    filteredData.filter((item) => item.completed === false)
                );
            setAllTodo(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    useEffect(() => {
        if (tabSelected == 1) setTodo(allTodo);
        else if (tabSelected == 2) setTodo(getCompleted());
        else setTodo(getIncomplete());
    }, [allTodo]);

    const [todoItem, setTodoItem] = useState("");

    const addItem = async () => {
        if (todoItem === "") return;
        await addDoc(todoRef, {
            task: todoItem,
            user: user?.username,
            completed: false,
        });
        getAllTodos();
        setTodoItem("");
        toastify("success", "Item added!");
    };

    const deleteItem = async (id) => {
        const itemDoc = doc(db, "todos", id);
        await deleteDoc(itemDoc);
        getAllTodos();
    };

    const changeStatus = async (id) => {
        const itemDoc = doc(db, "todos", id);
        await updateDoc(itemDoc, {
            completed: true,
        });
        getAllTodos();
    };

    const todoList = todo.map((item) => {
        return (
            <ListItem
                className={styles.listItem}
                sx={{
                    "&:hover": {
                        // backgroundColor: newShade(theme, -10),
                        backgroundColor: "rgba(179, 154, 154, 0.5)",
                    },
                }}
                key={item.id}
            >
                <p className={styles.task}> {item.task} </p>
               
                <div className={styles.task_buttons}>
                    <IconButton
                        title="Delete Task"
                        style={{ color: "black" }}
                        onClick={() => deleteItem(item.id)}
                    >
                        <Icon
                            icon="iconoir:cancel"
                            // style={{ color: reduxtheme.text }}
                        />
                    </IconButton>
                    {!item.completed && (
                        <IconButton
                            // style={{ color: reduxtheme.text }}
                            title="Completed Task"
                            style={{ color: "black" }}
                            onClick={() => changeStatus(item.id)}
                        >
                            <Icon
                                icon="material-symbols:check"
                                // style={{ color: reduxtheme.text }}
                            />
                        </IconButton>
                    )}
                </div>
            </ListItem>
        );
    });

    const changeTab = (e) => {
        butonClick.play();
        setTabSelected(e.target.id);
        if (e.target.id == 1) {
            setTodo(allTodo);
        } else if (e.target.id == 2) {
            setTodo(getCompleted());
        } else if (e.target.id == 3) {
            setTodo(getIncomplete());
        }
    };

    return (
        <div className={styles.modalStyle}>
            <h2>Tasks</h2>
            <IconButton
                onClick={close}
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "15px",
                    color: "black",
                }}
            >
                <Icon icon="carbon:close" />
            </IconButton>
            {/* Complete and incomplete tabs */}

            <div className={styles.todo_container}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: "5px",
                        width: "100%",
                        justifyContent: "space-between",
                        
                    }}
                >
                    <button
                        id="3"
                        onClick={changeTab}
                        style={{
                            ...tabButtonStyle,
                            backgroundColor:
                                tabSelected == 3
                                    ? "#faedca"
                                    : "rgba(179, 154, 154, 0.9)",
                        }}
                    >
                        Active
                    </button>

                    <button
                        id="2"
                        onClick={changeTab}
                        style={{
                            ...tabButtonStyle,
                            backgroundColor:
                                tabSelected == 2
                                ? "#faedca"
                                : "rgba(179, 154, 154, 0.9)",
                        }}
                    >
                        Completed
                    </button>

                    <button
                        id="1"
                        onClick={changeTab}
                        style={{
                            ...tabButtonStyle,
                            backgroundColor:
                                tabSelected == 1
                                ? "#faedca"
                                : "rgba(179, 154, 154, 0.9)",
                        }}
                    >
                        All Tasks
                    </button>
                </div>

                <input
                    placeholder="Add task"
                    id={styles.todoInput}
                    // style={{ color: reduxtheme.text }}
                    onChange={(e) => setTodoItem(e.target.value)}
                    value={todoItem}
                />
                <IconButton title="Add Item" onClick={addItem}>
                    <Icon
                        icon="material-symbols:add" fontSize={30}
                        // style={{ color: reduxtheme.text }}
                        style={{
                            color: "black",
                        }}
                    />
                </IconButton>

                <div className={styles.todo_list}>
                    <List>{todoList}</List>
                </div>
            </div>
        </div>
    );
};

export default Todos;
