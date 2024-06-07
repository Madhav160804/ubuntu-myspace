import React, { useEffect, useState } from 'react'
import NewTodo from './NewTodo'
import TodoBody from './TodoBody'
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Todo = () => {

    const [todosList, setTodosList] = useState<any>([]);

    useEffect(() => {
        getDocs(collection(db, "todos")).then(data => {
            setTodosList(data.docs)
        });
    }, []);

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
                <NewTodo />
                <TodoBody todosList={todosList} />
            </div>
        </div>
    )
}

export default Todo
