import { Skeleton } from 'primereact/skeleton';
import { Col, Row } from 'react-bootstrap';

const SkeletonCV = () => (
    <div className="skeleton-cv p-5">
        <div className="p-4">
            <Skeleton width="70%" height="3rem" className="mb-4"></Skeleton>
            <Skeleton width="50%" height="1.5rem" className="mb-4"></Skeleton>
            <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
            <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
            <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
            <Row className="pt-3">
                <Col>
                    <Skeleton width="70%" height="2.6rem" className="mt-4 mb-4"></Skeleton>
                    <Skeleton width="90%" height="3.6rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-5"></Skeleton>
                    <Skeleton width="90%" height="3.6rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-3"></Skeleton>
                </Col>
                <Col className="ms-5">
                    <Skeleton width="70%" height="2.6rem" className="mt-4 mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-5"></Skeleton>
                    <Skeleton width="70%" height="2.6rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                    <Skeleton width="100%" height="1.2rem" className="mb-4"></Skeleton>
                </Col>
            </Row>
        </div>
    </div>
);

export default SkeletonCV;
