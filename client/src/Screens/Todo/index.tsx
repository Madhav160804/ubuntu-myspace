import React, { useEffect, useState } from 'react'
import NewTodo from './NewTodo'
import TodoBody from './TodoBody'

const Todo = () => {

    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    const _renderHeader = () => {
        return (
            <div className="fa-2x font-weight-bolder ml-3 text-orange">
                Todo
            </div>
        )
    }

    return (
        <div className="h-94 w-100 bg-off-white">
            {_renderHeader()}

            <div className="mx-3 h-100">
                <NewTodo setIncompleteTodos={setIncompleteTodos} incompleteTodos={incompleteTodos}/>
                <TodoBody incompleteTodos={incompleteTodos} completeTodos={completeTodos} setIncompleteTodos={setIncompleteTodos} setCompleteTodos={setCompleteTodos}/>
            </div>
        </div>
    )
}

export default Todo
