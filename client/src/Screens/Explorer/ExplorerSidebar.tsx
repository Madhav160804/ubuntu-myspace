import React from 'react'
// import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Col, Progress } from 'reactstrap'
// import { AddFile } from '../../actions/FilesAction';
// import dash_api from '../../helpers/dash_api';
import { DateTime } from 'luxon';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// import { selectSpaceUsed } from '../../selectors/FileSelector';
const prettyBytes = require('pretty-bytes');

interface folderSeqParams {
    id: string;
    name: string;
    url?: string;
    size?: number;
    type?: number;
    parentId?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AddFileParams {
    name: string;
    size?: number;
    url: string;
    type: number;
    parentId: string;
}

interface ExplorerSidebarProps {
    activeFolder: folderSeqParams;
    addFile: (body: AddFileParams) => void;
    selectedFolder: folderSeqParams | null;
    spaceUsed: number;
}

const ExplorerSidebar = (props: any) => {

    const { activeFolder, selectedFolder, setFiles } = props;

    const hiddenFileInput: any = React.useRef(null);
    const handleUploadClick = (e: any) => hiddenFileInput?.current?.click();

    const uploadFileHandler = async(e: any) => {
        if(e.target.files.length) {
            const file = e.target.files[0];
            
            try{
                toast.info(<span><strong>{file.name}</strong> upload started!</span>)
                const uuid = uuidv4();
                const storageRef = ref(storage,uuid);

                const newFile = {
                    name: file.name,
                    size: file.size,
                    type: 0,
                    url: uuid,
                    userId: auth.currentUser?.uid,
                    folderId: activeFolder.id
                }
                const uploadingFile = await uploadBytes(storageRef, file);
                await addDoc(collection(db,'files'),newFile);
                setFiles((files: any) => {
                    return [...files,newFile];
                })
            } catch(err) {
                toast.error('File Upload failed!');
                console.error(err)
            }


        }
    }

    const createNewFolderHandler = async () => {
        const body = {
            name: "New Folder",
            url: "",
            type: 1,
            folderId: activeFolder.id,
            userId: auth.currentUser?.uid
        };
        try{
            await addDoc(collection(db,'files'),body);
            setFiles((files: any) => {
                return [...files,body];
            })
            toast.success(<span><strong>New Folder</strong> created successfully!</span>)

        } catch(err) {
            toast.error('Folder creation failed!');
        }

    }

    const _renderNewFileButton = () => {
        return (
            <div className="explorer-sidebar-button" onClick={handleUploadClick}>
                <span className="d-flex align-items-center">
                    <i className="ri-add-line fa-lg mr-2 ml--3" />
                    Upload New File
                </span>
            </div>
        )
    }

    const _renderNewFolderButton = () => {
        return (
            <div className="explorer-sidebar-button" onClick={createNewFolderHandler}>
                <span className="d-flex align-items-center">
                    <i className="ri-folder-line mr-2" />
                    Create New Folder
                </span>
            </div>
        )
    }

    const _renderSpaceUsed = () => {
        return (
            <div className="mt-3 d-flex flex-column">
                {/* <Progress 
                    value={spaceUsed}
                    max={5e7}
                    className="space-used-progress"
                /> */}
                {/* <span className="fa-xs d-flex flex-row align-items-center">
                    <strong className="mr-1">{prettyBytes(spaceUsed)}</strong>
                    used of 
                    <strong className="ml-1">{prettyBytes(5e7)}</strong>
                </span> */}
            </div>
        )
    }

    const _renderFileInfo = () => {
        if(!selectedFolder || selectedFolder?.type === 1) {
            return null;
        }

        var creationDate = DateTime.fromISO(selectedFolder?.createdAt || "")
                           .toFormat('MMM dd, yyyy');
        var updationDate = DateTime.fromISO(selectedFolder?.updatedAt || "")
                           .toFormat('MMM dd, yyyy');

        return (
            <div className="mt-3 about-file">
                <span className="font-weight-bold">
                    About File:
                </span>

                <span className="fa-xs mt-2">
                    <strong>Name:</strong> {selectedFolder?.name}
                </span>

                <span className="fa-xs mt-2">
                    <strong>Size: </strong> {prettyBytes(selectedFolder?.size)}
                </span>

                <span className="fa-xs mt-2">
                    <strong>Created on: </strong> {creationDate}
                </span>

                <span className="fa-xs mt-2">
                    <strong>Last Updated on:</strong> {updationDate}
                </span>
            </div>
        )
    }

    return (
        <Col md={3} lg={2} className="">
            {_renderNewFileButton()}
            {_renderNewFolderButton()}
            {_renderSpaceUsed()}
            {_renderFileInfo()}

            <input
                ref={hiddenFileInput}
                style={{display: "none"}}
                onChange={uploadFileHandler}
                type="file"
            />
        </Col>
    )
}

export default ExplorerSidebar;
