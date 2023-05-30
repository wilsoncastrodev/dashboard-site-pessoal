import { FC, useEffect, useRef, useState } from "react";
import DocumentCV from "../../../components/cv/DocumentCV";
import { useOutletContext } from 'react-router-dom';

const CVGeneratePage: FC = () => {
    const [width, setWidth] = useState<number>(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const {profileCV}:any = useOutletContext();

    useEffect(() => {
        if(elementRef.current) {
            setWidth(elementRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="cv w-100 position-relative" ref={elementRef}>
            <DocumentCV profile={profileCV} width={width} />
        </div>
    )
};

export default CVGeneratePage;
