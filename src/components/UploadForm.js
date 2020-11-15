//upload form component to allow users to add their own images to the website.
import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar'

const UploadForm = () => {

    //Set file state
    const [file, setFile] = useState(null); 
    //Set error state
    const [error, setError] = useState(null);

    //Set valid image types
    const types = ['image/png', 'image/jpeg']
    
    //handler function on image submit 
    const changeHandler = (event) => {
    //set variable to store the uploaded file
    let selected = event.target.files[0]; 

    //Input validation, only update state if file selected & correct type.
    if (selected && types.includes(selected.type)){
        setFile(selected);
        setError('');
      //Set failure path
    } else {
        setFile(null);
        setError('Please submit a valid image (png/jpeg)')
        }
    }
        return (
            <form>
                <label>
                    <input type="file" onChange={changeHandler} />
                    <span>+</span>
                </label>
                <div className = "output">
                    {error && <div className= "error"> {error} </div>}
                    {file && <div>{file.name}</div>}
                    {file && <ProgressBar file={file} setFile={setFile}/>}
                </div>
            </form>
        );
    
}

export default UploadForm;
