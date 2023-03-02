import { useFormikContext } from 'formik';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ name }: any) => {
    const [files, setFiles] = useState<any>([]);

    const { errors, setFieldValue, values }: any = useFormikContext();

    const onDrop = useCallback((acceptedFiles: any) => {
        setFieldValue(name, acceptedFiles[0]);
        setFiles(
            acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        );
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ accept: {
        'application/pdf': ['.pdf'],
    }, onDrop });

    return (
        <div>
            <div {...getRootProps({className: 'dropzone'})}>
                <input className="dropzone-file" {...getInputProps} />
                    Clique ou arraste o currículo para esta área para fazer o envio
                {files.length > 0 && (values.cv && true) && !errors.cv ? <div className="dropzone-preview">
                    <i className="fa-solid fa-file-invoice"></i>
                    <span>{files[0].path}</span>
                 </div> : null}
                {!(files.length > 0) && (values.cv && true) ? <div className="dropzone-preview">
                    <i className="fa-solid fa-file-invoice"></i>
                    <span>{values.cv.filename ? values.cv.filename : values.cv.name}</span>
                </div> : null}
            </div>
        </div>
    );
}


export default FileDropzone;
