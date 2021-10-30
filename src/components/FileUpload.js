import React, { useState } from 'react'

export default function FileUpload() {

    const [fileState, setFileState] = useState({
        fileName: "",
        fileDesc: ""
    })

    // const [dataArray, setDataArray] = useState([])


    function handleFileUpload(e) {
        // console.log(e);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            // const bstr = e.target.result;
            setFileState({ fileName: file.name, fileDesc: reader.result });

            // setDataArray(...fileState.fileDesc)
        }
        // console.log(reader);
        reader.onerror = () => {
            console.log('file error', reader.error);
        }
    }
    return (
        <div>
            <h1>file upload to read it</h1>
            <input type="file" accept=".txt,.csv,.xlsx,.xls" onChange={handleFileUpload} />
            <p>{fileState.fileName}</p>
            <p>{fileState.fileDesc}</p>
            {/* {.map((e) => (
                <>
                    <table>

                    </table>
                </>
            ))} */}
        </div>
    )
}
