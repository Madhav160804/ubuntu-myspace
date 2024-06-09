import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Window from '../../components/Window'
import Todo from "../Todo";
import Notes from "../Notes";
import Explorer from '../Explorer';
import Terminal from '../Terminal';
import TicTacToe from '../TicTacToe';
import CalculatorScreen from '../Calculator';
import Whiteboard from '../Whiteboard';

const LandingPage = (props: any) => {

    
    const [open, setOpen] = useState({
        todos: false,
        notes: false,
        explorer: false,
        terminal: false,
        tictactoe: false,
        calculator: false,
        whiteboard: false,
    });

    return (
        <div className="loading-page-container">

            <NavBar />

            <div className="d-flex flex-row h-100" style={{overflow: "hidden"}}>
                <SideBar setOpen={setOpen} />
                <Window component={Todo} isOpen={open.todos} setOpen={setOpen} />
                <Window component={Notes} isOpen={open.notes} setOpen={setOpen} />
                <Window component={Explorer} isOpen={open.explorer} setOpen={setOpen} />
                <Window component={Terminal} isOpen={open.terminal} setOpen={setOpen} />
                <Window component={TicTacToe} isOpen={open.tictactoe} setOpen={setOpen} />
                <Window component={CalculatorScreen} isOpen={open.calculator} setOpen={setOpen} />
                <Window component={Whiteboard} isOpen={open.whiteboard} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default LandingPage;
