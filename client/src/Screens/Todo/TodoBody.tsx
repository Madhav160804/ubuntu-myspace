import React, { useEffect, useState } from 'react'
// import { selectCompleteTodos, selectIncompleteTodos, selectTodos } from '../../selectors/TodoSelector'
// import { DeleteTodo, UpdateTodo } from '../../actions/TodoAction';
import IncompleteTodo from './IncompleteTodo';
import CompleteTodo from './CompleteTodo';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const getTodos = async () => {
    const q = query(collection(db,'todos'), where("userId",'==',auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const incomplete : any = [];
    const complete : any = [];

    querySnapshot.docs.forEach((doc) => {
        const res = doc.data();
        const currentTodo = {
            ...res,
            id: doc.id
        }
        if(res.completed==false) {
            incomplete.push(currentTodo);
        }
        else{
            complete.push(currentTodo);
        }
    });
    return {incomplete,complete};
}

const TodoBody = ({incompleteTodos, setIncompleteTodos, completeTodos, setCompleteTodos}: any) => {

    const _fetchTodos = () => {
        getTodos()
            .then(({incomplete,complete}) => {
                setIncompleteTodos(incomplete);
                setCompleteTodos(complete);
            })
            .catch((err) => {
                console.error(err.message);
            })
    }

    useEffect(() => {
        _fetchTodos();
    },[])

    const updateTodo = async (updatedVal: any) => {
        const docRef = doc(db, "todos", updatedVal.id);

        try{
            await updateDoc(docRef, updatedVal);
        }
        catch (err) {
            console.error(err);
        }
        _fetchTodos();
    }

    const deleteTodo = (deletedVal : any) => {
        const docRef = doc(db, "todos", deletedVal.id);
        deleteDoc(docRef);

        if (deletedVal.completed === true) {
            setCompleteTodos((prev: any) => {
                return prev.filter((x: any) => x.id !== deletedVal.id)
            })
        }
        else {
            setIncompleteTodos((prev: any) => {
                return prev.filter((x: any) => x.id !== deletedVal.id)
            })
        }
    }

    return (
        <div className="todo-container-div">
            
            <div className="d-flex flex-column mr-4 todo-container">
                {
                    incompleteTodos.map((_current: any) => {
                        return <IncompleteTodo
                                    key={_current.id}
                                    info={_current}
                                    updateTodo={updateTodo}
                                    deleteTodo={deleteTodo}
                                />
                    })

                }
            </div>

            <div className="d-flex flex-column todo-container">
                {
                    completeTodos.map((_current: any) => {
                        return <CompleteTodo 
                                    key={_current.id}
                                    info={_current}
                                    deleteTodo={deleteTodo}
                                />
                    })
                }
            </div>
        </div>
    )
}

export default TodoBody