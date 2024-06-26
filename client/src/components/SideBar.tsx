import React, { Dispatch, SetStateAction } from 'react'
import SidebarIcon from './SidebarIcon';

import chromeIcon from "../assets/images/chrome-icon.png";
import todoIcon from "../assets/images/todo-icon.png";
import notesIcon from "../assets/images/notes-icon.png";
import explorerIcon from "../assets/images/explorer-icon.png";
import terminalIcon from "../assets/images/terminal-icon.png";
import tictactoeIcon from "../assets/images/tictactoe-icon.png";
import calculatorIcon from "../assets/images/calculator-icon.png";
import whiteboardIcon from "../assets/images/whiteboard-icon.png";

interface sidebarIcon {
    name: string;
    icon: string;
    description: string;
}

interface sidebarApps {
    todos: boolean; 
    notes: boolean; 
    explorer: boolean; 
    terminal: boolean;
    tictactoe: boolean;
    calculator: boolean;
    whiteboard: boolean;
}

interface sidebarProps {
    setOpen: Dispatch<SetStateAction<sidebarApps>>;
}

const SideBar = ({setOpen}: sidebarProps) => {

    const icons: Array<sidebarIcon> = [
        // { name: "Chrome", icon: chromeIcon, description: "Search something interesting" },
        { name: "todos", icon: todoIcon, description: "Keep your tasks organized" },
        { name: "notes", icon: notesIcon, description: "Jot down your amazing thoughts" },
        { name: "explorer", icon: explorerIcon, description: "Explore your files" },
        { name: "calculator", icon: calculatorIcon, description: "Let's do some math" },
        { name: "whiteboard", icon: whiteboardIcon, description: "Draw your mind" },
        { name: "tictactoe", icon: tictactoeIcon, description: "Take a chill pill" },
        { name: "terminal", icon: terminalIcon, description: "Terminal" },
    ];

    return (
        <div className="sidebar-container">
            <a href='https://www.google.com' target='_blank'>
                <SidebarIcon
                    name={'Chrome'} 
                    icon={chromeIcon}
                    description={"Search something interesting"}
                />
            </a>
            {
                icons.map((_current: sidebarIcon) => {

                    const clickHandler = () => {
                        setOpen((prev: any) => {
                            let res = {
                                todos: false,
                                notes: false,
                                explorer: false,
                                terminal: false,
                                tictactoe: false,
                                calculator: false,
                                whiteboard: false,
                            };
                            let name: string = _current.name
                            if(name === "todos") res['todos'] = true;
                            if(name === "notes") res['notes'] = true;
                            if(name === "explorer") res['explorer'] = true;
                            if(name === "terminal") res['terminal'] = true;
                            if(name === "tictactoe") res['tictactoe'] = true;
                            if(name === "calculator") res['calculator'] = true;
                            if(name === "whiteboard") res['whiteboard'] = true;
                            return res;
                        })
                    }

                    return (
                        <div 
                            key={_current.name} 
                            onClick={clickHandler}
                        >
                            <SidebarIcon 
                                name={_current.name}
                                icon={_current.icon}
                                description={_current.description}
                            />
                        </div>
                    )
                }
          )
        }
        </div>
    )
}

export default SideBar
