import React, { useEffect, useState } from 'react';
import FolderSeq from './FolderSeq';
import ExplorerSidebar from './ExplorerSidebar';
import { Col, Container, Row } from 'reactstrap';
import SingleFile from './SingleFile';
import RenameModal from './RenameModal';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';

interface File {
    id: string;
    name: string;
    url: string;
    size: number;
    type: number;
    parentId: string;
}

interface folderSeqParams {
    id?: string;
    name: string;
    url?: string;
    size?: number;
    type?: number;
    parentId?: string;
}

interface UpdateFileParams {
    id: string; //file id
    parentId?: string;
    name?: string;
}

interface ExplorerProps {
    files: Array<File>;
    fetchFiles: (id: string) => void;
    updateFile: (body: UpdateFileParams) => void;
}

const fetchFiles = async (folderId : string) => {
    try {
        const q = query(collection(db,'files'), where("userId",'==',auth.currentUser?.uid), where("folderId", "==", folderId));
        const querySnapshot = await getDocs(q);
        const tempFiles: any = [];
        querySnapshot.docs.forEach((doc) => {
            const res = doc.data();
            const currentFile = {
                ...res,
                id: doc.id
            }
            tempFiles.push(currentFile);
        });
        console.log('tempfiles',tempFiles);
        return tempFiles;
    } catch(err) {
        console.error('Error fetching files: ',err);
        return [];
    }
}

const updateFile = async () => {

}

const Explorer = () => {

    const [files, setFiles] = useState([]);

    console.log(files)

    const [folderSeq, setFolderSeq] = useState<Array<folderSeqParams>>([{id: auth.currentUser?.uid, name: "Home"}]);

    console.log(folderSeq)

    const [selectedFolder, setSelectedFoler] = useState<File | null>(null);
    // const [renameModalOpen, setRenameModalOpen] = useState(false);

    // const toggleRenameModal = () => setRenameModalOpen(!renameModalOpen);

    useEffect(() => {
        fetchFiles(folderSeq[folderSeq.length-1]?.id ?? "")
            .then((tempFiles) => {
                setFiles(tempFiles);
            })
        
    }, [folderSeq, fetchFiles]);

    const _renderHeader = () => {
        return (
            <div className="fa-2x font-weight-bolder ml-3 text-orange">
                File Explorer
            </div>
        );
    }

    const getCols: any = () => {
        let w = window.innerWidth;
        if(w < 400) {
            return 2;
        }
        else if(w < 768) {
            return 4;
        } 
        else if(w < 1024) {
            return 6;
        }
        return 10;
    }

    return (
        <div className="h-94 w-100 bg-off-white">
            {_renderHeader()}
            <FolderSeq 
                sequence={folderSeq} 
                setSequence={setFolderSeq} 
            />

            <div className="explorer-container">
                <ExplorerSidebar 
                    activeFolder={folderSeq[folderSeq.length-1]}
                    selectedFolder={selectedFolder}
                    setFiles={setFiles}
                />

                <Container>
                    <Row xs={getCols()}>
                        {
                            files.map((file: File) => {
                                return (
                                    <Col lg={1} key={file.id}>
                                        <SingleFile 
                                            info={file} 
                                            setSequence={setFolderSeq}    
                                            selectedFolder={selectedFolder}
                                            setSelectedFolder={setSelectedFoler} 
                                            // toggleModal={toggleRenameModal}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>

            {/* <RenameModal 
                info={selectedFolder}
                isOpen={renameModalOpen}
                toggle={toggleRenameModal}
                updateFile={updateFile}
            /> */}
        </div>
    )
}

export default Explorer;
