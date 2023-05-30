import { BlobProvider } from '@react-pdf/renderer';
import { Fragment, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import CV from './CV';
import SkeletonCV from './SkeletonCV';

const DocumentCV = ({ profile, width }: any) => {
    const [loadSuccessCV, setLoadSuccessCV] = useState<boolean>(false);
    const [loadProgressCV, setLoadProgressCV] = useState<boolean>(false);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc=`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    })

    const handleLoadSuccessCV = () => {
        setLoadSuccessCV(true)
    };

    const handleLoadProgressCV = () => {
        setLoadProgressCV(true)
    };

    return (
       <Fragment>
             <BlobProvider document={<CV profile={profile}/>}>
                {({ blob, url, loading }: any): any => {
                return ( loading ? <SkeletonCV /> :
                    <Fragment>
                        {!loadProgressCV && <SkeletonCV />}
                        <div className="react-pdf__Header text-end me-4" hidden={!loadSuccessCV}>
                            <a href={url} className="btn btn-light btn-light-alt" rel="noreferrer" target="_blank"><i className="fa-solid fa-file-arrow-down"></i> Baixar Currículo</a>
                        </div>
                        <Document file={url} onLoadSuccess={() => {handleLoadSuccessCV()}} onLoadProgress={() => {handleLoadProgressCV()}}>
                            <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} width={width}/>
                        </Document>
                    </Fragment>
                )}}
            </BlobProvider>
       </Fragment>
    );
}

export default DocumentCV;
