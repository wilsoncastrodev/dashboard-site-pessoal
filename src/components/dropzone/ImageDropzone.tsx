import { useFormikContext } from 'formik'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropzone = ({ name }: any) => {
    const [files, setFiles] = useState<any>([]);

    const { errors, setFieldValue, values }: any = useFormikContext();

    const onDrop = useCallback((acceptedFiles: any) => {
        setFieldValue(name, acceptedFiles[0]);
        setFiles(
            acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        );
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ accept: {
        'image/jpeg': ['.jpeg', '.png', '.svg'],
    }, onDrop });

    console.log(errors);

    return (
        <div>
            <div {...getRootProps({className: 'dropzone'})}>
                <input className="dropzone-file" {...getInputProps} />
                Clique ou arraste uma imagem para esta área para fazer o envio
                {files.length > 0 && (values.image && true) && !errors.image ? <img src={files[0].preview} alt="" /> : null}
                {!(files.length > 0) && (values.image && true) ? <img src={values.image.url} alt="" /> : null}
            </div>
            <div className="invalid">
                {(files.length > 0) && errors.image ? errors.image : ''}
            </div>
        </div>
    );
}


export default ImageDropzone;
