import { Card, Col, Container, Row, Button, Modal, ModalBody } from "react-bootstrap";
import { useState } from 'react';
import { sharedVariables } from "../sharedVariables";
import { cancelAppointment } from "./cancelAppointmentController";
import { BlockingSpinner } from "../inputWidgets/inputWidgets";

function CancelAppointment(props) {
    const [states, setStates] = useState({
        currentView: 0, showBanner: 0, showModal: false, blockView: false
    });

    const fullName = props.fullName;

    const listController = props.listController;
    const setCancel = props.setCancel;
    const index = props.index;
    const appointmentList = props.appointmentList;
    const listChanged = props.listChanged;
    const appointmentId = appointmentList[index].appointmentId;

    const url = sharedVariables.url;

    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }

    const DefaultView = (
        <Container className=' text-light pb-3 ' style={{
            'background-color': 'purple'
        }}>
            <Card className='p-1 bg-dark text-light text-center'>
                <Card.Header>
                    Confirmation
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Cancel {fullName}'s Appointment
                    </Card.Title>
                    <Card.Text>
                        Are you sure that you want to cancel
                        {fullName}'s appointment today?
                        You can change still change your mind now.
                        <Row>
                            <Col>
                                <Button variant='dark'
                                    onClick={() => {
                                        cancelAppointment(appointmentId, appointmentList, index, listChanged,
                                            url, listController, setCancel, updateState)
                                    }}>
                                    Yes
                                </Button>
                            </Col>
                            <Col>
                                <Button variant='dark' onClick={() => { setCancel(); }}>
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={states.showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Appointment Canceled
                        <Button variant='dark' onClick={() => {
                            updateState({ showModal: false })
                        }}>
                            Dismiss
                        </Button>
                    </Card>
                </ModalBody>
            </Modal>

            {BlockingSpinner({ show: states.blockView, content: "Processing..." })}
        </Container>
    );

    const Views = [DefaultView];
    return Views[states.currentView];
}

export default CancelAppointment;