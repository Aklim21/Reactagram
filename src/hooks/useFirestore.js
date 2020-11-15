import {useState, useEffect} from 'react';
import { projectFirestore } from '../firebase/config'

const useFirestore = (collection) =>{
    //set state for docs to hold all existing image data & id.
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = projectFirestore.collection(collection)
            .orderBy('createdAt', 'desc')
            //setting the collection as a trigger, we get an updated snapshot returned everytime we load the webpage and eachtime the collection is updated.
            .onSnapshot((snap) => {
                //for each item within docs, append both its data & id to an empty local array.
                let documents = [];
                snap.forEach( doc=> {
                    documents.push({...doc.data(),id: doc.id})
                });
                setDocs(documents);
            });
            //cleanup function to stop updating collection 
            return () => unsub();
    }, [collection])

    return {docs};
}

export default useFirestore;