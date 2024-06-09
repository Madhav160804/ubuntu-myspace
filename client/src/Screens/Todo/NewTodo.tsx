import React, { useState } from 'react';
import { Button, Col, Form, Input, InputGroup, Row } from 'reactstrap';
import { auth,db } from '../../firebase'
import { collection, addDoc } from "firebase/firestore"; 

import classnames from "classnames";

interface addTodoParams {
    text: string,
    userId: string ,
}

const NewTodo = ({setIncompleteTodos,incompleteTodos}: any) => {

    const [text, setText] = useState("");
    const [active, setActive] = useState(false);
    const [userId] = useState(auth.currentUser?.uid);

    const changeHandler = (e: any) => {
        if(e.target.value.length <= 150) {
            setText(e.target.value);
        }
    }

    const cancelHandler = () => {
        setText("");
        setActive(false);
    }

    const addTaskHandler = async(e: any) => {
        e.preventDefault();

        if(!text) return;

        try {
            const docRef = await addDoc(collection(db, "todos"), {
                text,
                completed: false,
                userId
            });
            setIncompleteTodos([...incompleteTodos,{
                text,
                completed: false,
                userId,
                id: docRef.id
            }]);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

        return cancelHandler();
    }

    return (
        <Row className="m-0">
            <Col sm={12} md={6} lg={6} className="pl-1">

                <Form onSubmit={addTaskHandler}>
                    <InputGroup className="d-flex align-items-center">
                        <div className="input-group-prepend">
                            <i className="ri-add-line todo-plus-symbol m-auto" />
                        </div>

                        <Input 
                            value={text}
                            onChange={changeHandler}
                            type={"text"}
                            onClick={() => setActive(true)}
                            placeholder="Add a task"
                            className={classnames("pl-1 font-weight-bold shadow-none bg-transparent", {"border-0": !active}, {"todo-border-bottom mb-1": active})}
                        />

                        {
                            active ?
                                <div className="pl-2">
                                    <Button type="submit" className="todo-add-task">Add task</Button>
                                    <Button onClick={cancelHandler} className="todo-cancel ml-2">Cancel</Button>
                                </div>
                                :
                                null
                        }
                    </InputGroup>
                </Form>

            </Col>
        </Row>
    )
}

export default NewTodo;

