import { Form, Button, Container, Modal, ModalBody, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';
import { formProcessor } from './addSupplierController';

function AddSupplier() {
    const [states, setStates] = useState({
        fullName: '', email: '', phone: '', address: '',
        showBanner: 0, showModal: false, blockView: false
    })

    const url = sharedVariables.url;
    const navigate = useNavigate();

    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }

    return (
        <Container className=' text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Supplier
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, url, states, updateState) }} >
                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter supplier's name",
                    onChange: (event) => {
                        updateState({ showBanner: 0, fullName: event.target.value });
                    }, value: states.fullName,
                    label: "Supplier's Name", className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'email', placeholder: "Enter supplier's email",
                    onChange: (event) => {
                        updateState({ showBanner: 0, email: event.target.value });
                    }, value: states.email,
                    label: "Email", className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter Phone Number",
                    onChange: (event) => {
                        updateState({ showBanner: 0, phone: event.target.value });
                    }, value: states.phone,
                    label: "Supplier's Phone Number", className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter business address",
                    onChange: (event) => {
                        updateState({ showBanner: 0, address: event.target.value });
                    }, value: states.address,
                    label: "Business address", className: 'mb-3'
                })}


                <Modal show={states.showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <h5> New supplier added</h5>
                            <Button variant='dark' onClick={() => {
                                updateState({ showModal: false });
                                navigate('/home', { replace: true })
                            }}>
                                Dismiss
                            </Button>
                        </Card>
                    </ModalBody>
                </Modal>

                {BlockingSpinner({ show: states.blockView, content: "Processing..." })}

                <Button variant='dark' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddSupplier;