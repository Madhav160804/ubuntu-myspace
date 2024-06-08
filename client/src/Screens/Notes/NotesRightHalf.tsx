import React from 'react'
// import {connect} from 'react-redux';
import { Button, Input } from 'reactstrap';
// import { AddNote, DeleteNote, UpdateNote } from '../../actions/NotesAction';
import QuillEditor from '../../components/QuillEditor';
// import { getUserAccessId } from '../../helpers/authentication';
import { toast } from 'react-toastify';
import { auth,db } from "../../firebase"
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"; 

const NotesRightHalf = (props: any) => {

    const {activeTitle, activeText, activeNote, setActiveNote, setActiveText, setActiveTitle, notes, setNotes} = props;
    const createNote = async(body : any) => {
        try {
            const docRef = await addDoc(collection(db, "notes"),body);
            console.log(docRef.id)
            setActiveNote({
                title: activeTitle,
                text: activeText,
                id: docRef.id,
            });
            setNotes([...notes,{
                title: activeTitle,
                text: activeText,
                id: docRef.id,
                userId: auth.currentUser?.uid
            }])
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    } 

    const updateNote = async(body : any) => {
        try {
            const docRef = doc(db, 'notes', body.id);
            await updateDoc(docRef, body);
            toast.success('Updated successfully')
            setActiveNote({
                title: activeTitle,
                text: activeText,
                id: docRef.id,
            });
            setNotes(notes.map((note:any) => {
                if(note.id!==activeNote.id)
                    return note;
                return {
                    title: activeTitle,
                    text: activeText,
                    id: docRef.id,
                    userId: auth.currentUser?.uid
                }
            }))

        } catch (e) {
            console.error('Error updating document: ', e);
        }
    }

    const saveNoteHandler = () => {

        if(activeTitle === "") {
            toast.warning("Title cannot be empty!");
            return ;
        }

        const body = {
            title: activeTitle,
            text: activeText,
            userId: auth.currentUser?.uid,
        }

        // check if this is an existing note. If the id of the current passed note is present, it is an existing note,
        // else a new note is being created.
        if(activeNote.id === "") {
            toast.success(<span><strong>{activeTitle}</strong> created successfully!</span>)
            return createNote(body);
        }

        const newBody = {
            title: activeTitle,
            text: activeText,
            id: activeNote.id,
        }

        return updateNote(newBody);
    }


    const deleteNote = async (activeNoteId : any) => {
        try {
            const docRef = doc(db,"notes",activeNoteId);
            console.log(docRef);
            setNotes(notes.filter((note:any) => note.id!==activeNoteId))
            await deleteDoc(docRef)
        } catch (err) {
            console.error('Error deleting document', err);
        }

    };
    const deleteNoteHandler = () => {
        if(activeNote.id === "")
            return ;
        
        deleteNote(activeNote.id); 
        toast.error(<span><strong>{activeTitle}</strong> deleted successfully!</span>);
        return setActiveNote({
                    title: "",
                    text: "",
                    id: "",
                });
    }

    return (
        <div className="note-container d-flex flex-column">
            <div className="d-flex flex-row align-items-center w-100 justify-content-between">
                <Input 
                    value={activeTitle}
                    onChange={e => setActiveTitle(e.target.value)}
                    placeholder="Enter note title"
                    className="w-50 bg-transparent font-weight-bold todo-border-bottom"
                />

                <div className="d-flex flex-row align-items-center">
                    <Button onClick={saveNoteHandler} type="submit" className="todo-add-task d-flex align-items-center">
                        <i className="mr-1 ri-save-line" />
                        Save Changes
                    </Button>    

                    <i 
                        className="text-danger ri-delete-bin-line ml-2 cursor-pointer" 
                        onClick={deleteNoteHandler}    
                    />
                </div>      
            </div>

            <QuillEditor 
                placeholder="Note content goes here..."
                value={activeText}
                onChange={setActiveText}
                className="notes-quill mt-2"
            />
            
        </div>
    )
}

export default NotesRightHalf;
// const mapDispatchToProps = (dispatch: any) => ({
//     updateNote: (body: Note) => dispatch(UpdateNote.request(body)),
//     createNote: (body: CreateNoteParams) => dispatch(AddNote.request(body)),
//     deleteNote: (id: string) => dispatch(DeleteNote.request(id)),
// });

// export default connect(null, mapDispatchToProps)(NotesRightHalf)
