import { Col, Container, Row, Image } from "react-bootstrap";

import adminImg from '../static/icons8-administrator-64.png';
import consultantImg from '../static/icons8-doctor-male-48.png';
import pharmaImg from '../static/icons8-pharmacy-64.png';
import receptionistImg from '../static/icons8-receptionist-66.png';
import backgroundImg from '../static/optoPic.png';

import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();

    return (
        <Container className="p-4 " style={{
            'background-color': 'purple'
        }}>
            <Row className="p-2 text-center">
                <Container className='text-center rounded bg-black mb-2'>
                    <Image src={backgroundImg} fluid />
                </Container>
                <Col className="p-5 bg-dark text-light rounded mx-1 text-center "
                    onClick={() => {
                        navigate('/reload',
                            { state: { selectedDesignation: 'administrator' } });
                    }}>
                    <Image src={adminImg} fluid />
                    <h3>
                        Administrator
                    </h3>
                </Col>
                <Col className="p-5 bg-dark text-light rounded mx-1 text-center "
                    onClick={() => {
                        navigate('/reload',
                            { state: { selectedDesignation: 'consultant' } });
                    }}>
                    <Image src={consultantImg} fluid />
                    <h3>
                        Consultant
                    </h3>
                </Col>

            </Row>

            <Row className="p-2 text-center ">
                <Col className="p-5 bg-dark text-light rounded mx-1 text-light text-center "
                    onClick={() => {
                        navigate('/reload',
                            { state: { selectedDesignation: 'pharmacist' } });
                    }}>
                    <Image src={pharmaImg} fluid />
                    <h3>
                        pharmacist
                    </h3>
                </Col>
                <Col className="p-5 bg-white text-dark rounded mx-1 text-center "
                    onClick={() => {
                        navigate('/reload',
                            { state: { selectedDesignation: 'receptionist' } });
                    }}>
                    <Image src={receptionistImg} fluid />
                    <h3>
                        Receptionist
                    </h3>
                </Col>

            </Row>

        </Container>);

}

export default LandingPage;