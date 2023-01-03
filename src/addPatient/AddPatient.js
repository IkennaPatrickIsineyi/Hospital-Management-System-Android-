import { Form, Button, Container, Image, Modal, ModalBody, Card, DropdownButton } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';

import { genIdCard, formProcessor } from './addPatientController'
import { alertBanner, BlockingSpinner, FileFormGroup, TextBoxFormGroup } from '../inputWidgets/inputWidgets'


function AddPatient() {
    const [states, setStates] = useState({
        firstName: '', lastName: '', email: '', phone: '', birthday: '',
        address: '', married: '', occupation: '', religion: '', gender: '',
        showGender: false, showMarried: false, picture: null, feedBack: {},
        showBanner: 0, showModal: false, blockView: false
    });

    const navigate = useNavigate();

    const idCardRef = useRef(null);

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
                    Add New Patient
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, states, updateState, url); }}>
                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter First Name',
                    onChange: (event) => {
                        updateState({ showBanner: 0, firstName: event.target.value })
                    },
                    value: states.firstName,
                    label: 'First Name', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Last Name',
                    onChange: (event) => {
                        updateState({ showBanner: 0, lastName: event.target.value })
                    },
                    value: states.lastName,
                    label: 'Last Name', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'email', placeholder: 'Enter Email',
                    onChange: (event) => {
                        updateState({ showBanner: 0, email: event.target.value })
                    },
                    value: states.email,
                    label: 'Email', className: 'mb-3', controlId: "formBasicEmail"
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Phone Number',
                    onChange: (event) => {
                        updateState({ showBanner: 0, phone: event.target.value })
                    },
                    value: states.phone,
                    label: 'Phone Number', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'date', placeholder: 'Enter Date of birth',
                    onChange: (event) => {
                        updateState({ showBanner: 0, birthday: event.target.value })
                    },
                    value: states.birthday,
                    label: 'Date of Birth', className: 'mb-3'
                })}

                <Form.Group className='mb-3'>
                    <Button variant='dark' className='mb-3'
                        onClick={() => {
                            console.log('states: ', states);
                            updateState({ showGender: !states.showGender })
                        }} >
                        <Container >

                            <DropdownButton variant='dark' show={false}
                                title={'Select Gender => ' + ((states.gender === 'm') ?
                                    'Male' :
                                    (states.gender === 'f') ?
                                        'Female' : '')
                                }
                                onClick={() => { updateState({ showGender: !states.showGender }) }} />

                        </Container>
                    </Button>
                </Form.Group>


                <Modal show={states.showGender} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <Button variant='dark' onClick={() => {
                                updateState({ gender: 'm', showGender: false });
                            }}>
                                Male
                            </Button>
                        </Card>
                        <Card>
                            <Button variant='dark' onClick={() => {
                                updateState({ gender: 'f', showGender: false });
                            }}>
                                Female
                            </Button>
                        </Card>
                        <Button variant='dark' onClick={() => { updateState({ showGender: false }); }}>
                            Dismiss
                        </Button>
                    </ModalBody>
                </Modal>

                <Form.Group className='mb-3'>
                    <Button variant='dark'
                        onClick={() => { updateState({ showMarried: !states.showMarried }) }} >
                        <Container>
                            <DropdownButton variant='dark' show={false}
                                title={'Select Marital Status =>  ' + states.married}
                                onClick={() => { updateState({ showMarried: !states.showMarried }) }} />

                        </Container>
                    </Button>
                </Form.Group>

                <Modal show={states.showMarried} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card>
                            <Button variant='dark'
                                onClick={() => {
                                    updateState({ married: 'Married', showMarried: false });
                                }}>
                                Married
                            </Button>
                        </Card>
                        <Card>
                            <Button variant='dark'
                                onClick={() => {
                                    updateState({ married: 'Single', showMarried: false });
                                }}>
                                Single
                            </Button>
                        </Card>
                        <Button variant='dark'
                            onClick={() => { updateState({ showMarried: false }); }}>
                            Dismiss
                        </Button>
                    </ModalBody>
                </Modal>

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Home Address',
                    onChange: (event) => {
                        updateState({ showBanner: 0, address: event.target.value });
                    },
                    value: states.address,
                    label: 'Home Address', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter occupation',
                    onChange: (event) => {
                        updateState({ showBanner: 0, occupation: event.target.value });
                    },
                    value: states.occupation,
                    label: 'Occupation', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Religion',
                    onChange: (event) => {
                        updateState({ showBanner: 0, religion: event.target.value })
                    },
                    value: states.religion,
                    label: 'Religion', className: 'mb-3'
                })}

                {FileFormGroup({
                    type: 'file', name: 'picture', title: 'Picture',
                    onChange: (event) => {
                        updateState({ showBanner: 0, picture: event.target.files[0] })
                    },
                    label: "Patient's Picture", className: 'mb-3'
                })}

                <Modal show={states.showModal} centered size="sm" className="text-center">
                    <ModalBody>
                        <Card style={{ width: '250px' }} >
                            {/*  Staff record created */}
                            <Card.Body ref={idCardRef} className='text-center bg-light'  >

                                <Container className='text-dark text-center mb-3 pt-3'>
                                    <h6> UNIBEN Optometry Clinic</h6>
                                </Container>
                                <Container className='text-dark text-center mb-3'>
                                    <Image src={url + '/patientFiles/?filename=' + states.feedBack.pic}
                                        fluid roundedCircle width={'50%'} />
                                </Container>
                                <Container className='text-dark text-center text-muted'>
                                    <h4> {states.feedBack.fullName}</h4>
                                </Container>
                                <Container className='text-dark text-center mb-3 pb-5'>
                                    ID: {states.feedBack.patientId}
                                </Container>


                            </Card.Body>
                            <Card.Footer className='text-center'>
                                <Button variant='dark' onClick={() => {
                                    genIdCard(idCardRef, updateState, navigate);
                                }}>
                                    Download
                                </Button>
                            </Card.Footer>

                        </Card>


                    </ModalBody>
                </Modal>

                {BlockingSpinner({ show: states.blockView, content: 'Processing...' })}

                <Button variant='dark' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container >
        //  </>

    );
}

export default AddPatient;