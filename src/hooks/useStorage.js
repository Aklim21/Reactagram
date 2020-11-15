//custom hook to handle our file upload functionality
//Once this hook is initated, it will attempt to upload the file to our firestore DB.
//As soon as this starts, the hook will return the three values exported out directly back to the function where it was called.

import {useState, useEffect} from 'react';
import {projectStorage, projectFirestore, timestamp} from '../firebase/config';

const useStorage = (file) => {

    //Set states
    const [progress, setProgress] = useState(0); //upload progress monitor
    const [error,setError] = useState(null);
    const [url,setUrl ] = useState(null); //download url that we can use as key ref to provide the correct image URL when we define images to be displayed

    useEffect(() => {
        //references
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');


        //adding the file reference to the firestore db
        //We add a number of statechange monitors to confirm the upload progress and any failures. 
        storageRef.put(file).on('state_changed', 
        (snap) =>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, 
        (err) => {
            setError(err);
        },
        //takes storage ref and provides download URL
        //includes timestamp functionality to record creation time on firstore db
        async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt});
            setUrl(url);
        }
        )
    }, [file]);

    return {progress, error, url};

}
export default useStorage;
