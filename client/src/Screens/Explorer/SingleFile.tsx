import classnames from 'classnames';
import { getDownloadURL, ref } from 'firebase/storage';
import React from 'react'
import { toast } from 'react-toastify';
import { storage } from '../../firebase';
// import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';

interface File {
    id: string;
    name: string;
    url: string;
    size: number;
    type: number;
    parentId: string;
}

interface folderSeqParams {
    id: string;
    name: string;
    url?: string;
    size?: number;
    type?: number;
    parentId?: string;
}

interface SingleFileProps {
    info: File;
    setSequence: React.Dispatch<React.SetStateAction<Array<folderSeqParams>>>;
    selectedFolder: File | null;
    setSelectedFolder: React.Dispatch<React.SetStateAction<File | null>>;
    deleteFile: (id: string) => void;
    toggleModal: () => void;
}

// async function downloadFile(url: string, filename: string) {
//     console.log('Downloading file',url,filename);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);

//   }

async function downloadFile(url: string, filename: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Cleanup the object URL
        window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
}

  

const SingleFile = (props: any) => {

    const { info, setSequence, selectedFolder, setSelectedFolder, deleteFile, toggleModal } = props;

    const getFileIcon = () => {
        if(info.type === 1) {
            return "ri-folder-2-line";
        }

        const idx = info.name.lastIndexOf('.');
        const extension = info.name.substr(idx+1);

        switch(extension) {
            case "pdf":
                return "ri-file-pdf-line";

            case "txt":
                return "ri-file-text-line";

            case "docx":
            case "doc":
            case "odt":
                return "ri-file-word-2-line";

            case "xlsx":
                return "ri-file-excel-2-line";

            case "ppt":
                return "ri-file-ppt-2-line";

            default: 
                return "ri-file-line";
        }
    }

    const fileSingleClickHandler = () => {
        // if(selectedFolder === info) {
        //     return setSelectedFolder(null);
        // }

        return setSelectedFolder(info);
    }

    const fileDoubleClickHandler = async () => {
        if(info.type === 1) {
            return setSequence((prev: Array<folderSeqParams>) => {
                let updatedSequence = [...prev, info];
                return updatedSequence;
            });
        }
        try{
            toast.success("Your file download has started!");
            // const signedUrl = await getPreSignedUrl(info.url);
            const fileRef = ref(storage, info.url);
            getDownloadURL(fileRef)
                .then(((url: string) => {
                    downloadFile(url,info.name);
                }))
                .catch((error) => {
                    switch (error.code) {
                        case 'storage/object-not-found':
                          toast.error(`File doesn't exit`);
                          break;
                        case 'storage/unauthorized':
                          toast.error(`Access denied`);
                          break;
                        case 'storage/canceled':
                          toast.error('User cancelled the upload');
                          break;
                  
                        // ...
                  
                        case 'storage/unknown':
                          toast.error(`Unknown error occured`);
                          break;
                      }
                  
                })

        } catch(err) {
            toast.error('File download failed');
            console.log('File download failed : ',err);
        }
    }

    const deleteFileHandler = () => {
        toast.error(<span><strong>{info.name}</strong> deleted successfully!</span>);
        return deleteFile(info.id);
    }

    // const _renderContextMenu = () => {

    //     return (
    //         <ContextMenu id={info.id} className="bg-white fa-sm context-menu" style={{zIndex: 10}}>
                
    //             {
    //                 info.type === 1 ?
    //                     <>
    //                         <MenuItem 
    //                             className="d-flex align-items-center flex-row cursor-pointer" 
    //                             onClick={toggleModal}
    //                         >
    //                             <i className="ri-edit-2-line mr-1" />
    //                             Rename
    //                         </MenuItem>
    //                     </>
    //                     :
    //                     <>
    //                         <MenuItem 
    //                             className="d-flex align-items-center flex-row cursor-pointer" 
    //                             onClick={fileDoubleClickHandler}
    //                         >
    //                             <i className="ri-file-download-line mr-1" />
    //                             Download
    //                         </MenuItem>

    //                         <MenuItem 
    //                             className="d-flex flex-row align-items-center text-danger cursor-pointer"
    //                             onClick={deleteFileHandler}
    //                         >
    //                             <i className="ri-delete-bin-2-line mr-1" />
    //                             Delete
    //                         </MenuItem>
    //                     </>
    //             }
                
    //         </ContextMenu>
    //     )
    // }

    const contextMenuClickHandler = () => {
        return setSelectedFolder(info);
    }

    return (
        // <ContextMenuTrigger id={info.id}>
            <div 
                className={classnames("d-flex flex-column h-100 py-1 pb-1 cursor-pointer align-items-center justify-content-center", { "active-file": info === selectedFolder } )}
                onClick={fileSingleClickHandler}
                onDoubleClick={fileDoubleClickHandler}
                onContextMenu={contextMenuClickHandler}
            >
                <i className={`${getFileIcon()} fa-3x text-orange `} />
                
                <span className="file-name-span ">
                    {info.name}
                </span>
                <a target="_blank" href="_#"  id={info.id} style={{display: "none"}} >""</a>
            </div>

        //     {_renderContextMenu()}
        // </ContextMenuTrigger>
    )
}

export default SingleFile;