import { Container, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sharedVariables } from "../sharedVariables";
import { formProcessor } from "./storeKeeperController";
import { BlockingSpinner } from "../inputWidgets/inputWidgets";

function StoreKeeper() {
    const [states, setState] = useState({
        patientId: '', showBanner: 0, showModal: false
    });

    const bannerText = ["", "Successful", "Something went wrong...try again",
        "You are not logged in... Login", "Check your network"];
    const alertColors = ["danger", "success", "warning", "secondary"];


    const url = sharedVariables.url;
    const navigate = useNavigate();

    const updateState = (newValue) => {
        setState((prevValue) => { return { ...prevValue, ...newValue } });
    }

    return (
        <Container className=' text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Find Patient
                </h3>
            </Container>

            <Alert show={states.showBanner} variant={alertColors[(states.showBanner === 1) ? 1 : 0]}>
                {bannerText[states.showBanner]}
            </Alert>

            <Form onSubmit={(event) => {
                formProcessor(event, url, states.patientId, updateState, navigate)
            }}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Patient ID
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Patient Id'
                        onChange={(event) => {
                            updateState({
                                showBanner: 0,
                                patientId: event.target.value
                            });
                        }} value={states.patientId} />
                </Form.Group>
                <Button variant='dark' type='submit' >
                    Go
                </Button>
            </Form>
            {BlockingSpinner({ show: states.showModal, content: "Processing..." })}
        </Container>
    );
}

export default StoreKeeper;