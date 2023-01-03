import { Card, Container, Form, Button, Modal, ModalBody } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sharedVariables } from "../sharedVariables";
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from "../inputWidgets/inputWidgets";
import { formProcessor } from "./bookAppointmentController";


function BookAppointment() {
    const [states, setStates] = useState({
        patientId: '', appointmentDate: '', showBanner: 0,
        showModal: false, blockView: false
    })

    const navigate = useNavigate();

    const url = sharedVariables.url;

    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }

    return (
        <Container className=' text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Book Appointment For Patient
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, url, states, updateState) }} >

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter Patient's Id",
                    onChange: (event) => {
                        updateState({
                            showBanner: 0,
                            patientId: event.target.value
                        })
                    }, value: states.patientId,
                    label: "Patient ID", className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'date', placeholder: "Select Date",
                    onChange: (event) => {
                        updateState({
                            showBanner: 0,
                            appointmentDate: event.target.value
                        })
                    }, value: states.appointmentDate,
                    label: "Appointment Date", className: 'mb-3'
                })}

                <Modal show={states.showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <h1>
                                Appointment Created
                            </h1>
                            <Button variant='dark' onClick={() => {
                                updateState({ showModal: false })
                                navigate('/home', { replace: true })
                            }}>
                                Dismiss
                            </Button>
                        </Card>
                    </ModalBody>
                </Modal>

                {BlockingSpinner({ show: states.blockView, content: "Processing..." })}

                <Button variant='dark' type='submit' >
                    Book Appointment
                </Button>
            </Form>
        </Container>
    );
}

export default BookAppointment;