import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, InputGroupText, Row } from 'reactstrap';
// import {connect} from 'react-redux';
// import { selectNotes } from '../../selectors/NoteSelector';
import NotesRightHalf from './NotesRightHalf';
import SingleNote from './SingleNote';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';

interface Note {
    id: string;
    title: string;
    text: string;
}

// interface NotesProps {
//     notes: Array<Note>;
// }

const Notes = () => {

    const [notes,setNotes] = useState([]);

    const dummyNote = {
        title: "",
        text: "",
        id: "",
    }

    const [activeTitle, setActiveTitle] = useState("");
    const [activeText, setActiveText] = useState("");
    const [activeNote, setActiveNote] = useState(dummyNote);

    const newNoteHandler = () => {
        setActiveNote(dummyNote);
    }

    useEffect(() => {
        const fetchNotes = async() => {
            try {
                const tempNotes: any = [];
                const q = query(collection(db,'notes'), where("userId",'==',auth.currentUser?.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.docs.forEach((doc) => {
                    const res = doc.data();
                    const currentNote = {
                        ...res,
                        id: doc.id
                    }
                    tempNotes.push(currentNote);
                });
                setNotes(tempNotes);


            } catch (err) {
                console.error('Error fetching notes: ', err);
            }

        }
        fetchNotes();
    },[])

    useEffect(() => {
        setActiveTitle(activeNote.title);
        setActiveText(activeNote.text);
    }, [activeNote]);

    const _renderHeader = () => {
        return (
            <div className="fa-2x font-weight-bolder ml-3 text-orange">
                Notes
            </div>
        );
    }

    const _renderNewNoteButton = () => {
        return (
            <Row className="m-0 cursor-pointer" onClick={newNoteHandler}>
                <Col className="pl-1">

                    <Form onSubmit={(e) => {e.preventDefault()}}>
                        <InputGroup className="d-flex align-items-center">
                            <InputGroupText addonType="prepend">
                                <i className="ri-add-line todo-plus-symbol m-auto" />
                            </InputGroupText>

                            <span className="text-gray font-weight-bold fa-lg ml-3">
                                Add New Note
                            </span>

                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        )
    }
    return (
        <div className="h-94 w-100 bg-off-white">
            {_renderHeader()}
            {_renderNewNoteButton()}

            <div className="mx-3 h-100 note-container-div">
                <div className="h-75 note-container-list d-flex flex-column">
                    {
                        notes.map((_current: Note) => {
                            return <SingleNote 
                                        key={_current.id}
                                        info={_current}
                                        setActiveNote={setActiveNote}
                                    />
                        })
                    }
                </div>

                <NotesRightHalf
                    activeNote={activeNote}
                    activeText={activeText}
                    setActiveText={setActiveText}
                    activeTitle={activeTitle}
                    setActiveTitle={setActiveTitle}
                    setActiveNote={setActiveNote}
                    notes={notes}
                    setNotes={setNotes}
                />
            </div>
        </div>
    );
}

export default Notes