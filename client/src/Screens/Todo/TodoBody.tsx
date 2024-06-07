import React, { useEffect, useState } from 'react'
// import { selectCompleteTodos, selectIncompleteTodos, selectTodos } from '../../selectors/TodoSelector'
// import { DeleteTodo, UpdateTodo } from '../../actions/TodoAction';
import IncompleteTodo from './IncompleteTodo';
import CompleteTodo from './CompleteTodo';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const getTodos = async () => {
    const q = query(collection(db,'todos'), where("userId",'==',auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const incomplete : any = [];
    const complete : any = [];

    console.log(querySnapshot)
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

const TodoBody = (props: any) => {
    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    const _fetchTodos = () => {
        getTodos()
            .then(({incomplete,complete}) => {
                setIncompleteTodos(incomplete);
                setCompleteTodos(complete);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        _fetchTodos();
    },[])

    const updateTodo = (updatedVal: any) => {
        const docRef = doc(db, "todos", updatedVal.id);

        console.log(updatedVal)

        let updatedTodo = {
            text: updatedVal.text,
            completed: updatedVal.completed,
        }

        updateDoc(docRef, updatedTodo).then(res => console.log(res));
        _fetchTodos();
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
                                    // deleteTodo={deleteTodo}
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
                                    // deleteTodo={deleteTodo}
                                />
                    })
                }
            </div>
        </div>
    )
}

export default TodoBody
// const mapStateToProps = (state: any) => ({
//     todos: selectTodos(state),
//     completeTodos: selectCompleteTodos(state),
//     incompleteTodos: selectIncompleteTodos(state),
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     updateTodo: (body: updateTodoParams) => dispatch(UpdateTodo.request(body)),
//     deleteTodo: (id: string) => dispatch(DeleteTodo.request(id)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TodoBody)