import { Form, Button, Container, Image, Modal, ModalBody, Card, DropdownButton } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { formProcessor, genIdCard } from './addStaffController';
import { alertBanner, BlockingSpinner, FileFormGroup, TextBoxFormGroup } from '../inputWidgets/inputWidgets';

function AddStaff() {
    const [states, setStates] = useState({
        firstName: '', lastName: '', designation: '', showDesignation: false,
        phone: '', email: '', employmentDate: '', birthday: '', address: '',
        picture: null, feedBack: {}, showBanner: 0, showModal: false, blockView: false
    })

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
                    Add New Staff
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, states, updateState, url); }} >

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter First Name',
                    onChange: (event) => { updateState({ showBanner: 0, firstName: event.target.value }) },
                    value: states.firstName, label: 'First Name', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Last Name',
                    onChange: (event) => { updateState({ showBanner: 0, lastName: event.target.value }) },
                    value: states.lastName, label: 'Last Name', className: 'mb-3'
                })}

                <Form.Group className='mb-3'>
                    <Button variant='dark' onClick={() => { updateState({ showDesignation: !states.showDesignation }) }} >
                        <Container>

                            <DropdownButton variant='dark' show={false}
                                title={"Select staff's designation => " + states.designation}
                                onClick={() => { updateState({ showDesignation: !states.showDesignation }) }} />

                        </Container>
                    </Button>
                </Form.Group>

                <Modal show={states.showDesignation} centered size="sm" className="text-center" >
                    <ModalBody>
                        <Card>
                            <Button variant='dark' onClick={() => {
                                updateState({ showDesignation: false, designation: 'receptionist' });
                            }}>
                                Receptionist
                            </Button>
                        </Card>
                        <Card>
                            <Button variant='dark' onClick={() => {
                                updateState({ showDesignation: false, designation: 'consultant' });
                            }}>
                                Consultant
                            </Button>
                        </Card>
                        <Card>
                            <Button variant='dark' onClick={() => {
                                updateState({ showDesignation: false, designation: 'pharmacist' });
                            }}>
                                Pharmacist
                            </Button>
                        </Card>
                        <Card>
                            <Button variant='dark' onClick={() => {
                                updateState({ showDesignation: false, designation: 'administrator' });
                            }}>
                                Administrator
                            </Button>
                        </Card>

                        <Button variant='dark' onClick={() => { updateState({ showDesignation: false }); }}>
                            Dismiss
                        </Button>


                    </ModalBody>
                </Modal>

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Email',
                    onChange: (event) => { updateState({ showBanner: 0, email: event.target.value }) },
                    value: states.email, label: 'Email', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Phone Number',
                    onChange: (event) => { updateState({ showBanner: 0, phone: event.target.value }) },
                    value: states.phone, label: 'Phone Number', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'date', placeholder: 'Enter employment date',
                    onChange: (event) => { updateState({ showBanner: 0, employmentDate: event.target.value }) },
                    value: states.employmentDate, label: 'Employment date', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'date', placeholder: 'Enter Date of Birth',
                    onChange: (event) => { updateState({ showBanner: 0, birthday: event.target.value }) },
                    value: states.birthday, label: 'Date of Birth', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: 'Enter Home Address',
                    onChange: (event) => { updateState({ showBanner: 0, address: event.target.value }) },
                    value: states.address, label: 'Home Address', className: 'mb-3'
                })}

                {FileFormGroup({
                    type: 'file', title: 'Picture',
                    onChange: (event) => { updateState({ showBanner: 0, picture: event.target.files[0] }) },
                    label: "Staff's Picture", className: 'mb-3'
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
                                    <Image src={url + '/staffFiles/?filename=' + states.feedBack.pic}
                                        fluid roundedCircle width={'50%'} />
                                </Container>
                                <Container className='text-dark text-center text-muted'>
                                    <h4> {states.feedBack.fullName}</h4>
                                </Container>
                                <Container className='text-dark text-center mb-3 pb-5'>
                                    ID: {states.feedBack.staffId}
                                </Container>

                            </Card.Body>
                            <Card.Footer className='text-center'>
                                <Button variant='dark' onClick={() => {
                                    genIdCard(idCardRef, setStates, navigate);
                                }}>
                                    Download
                                </Button>
                            </Card.Footer>

                        </Card>


                    </ModalBody>
                </Modal>

                {BlockingSpinner({ show: states.blockView, content: 'Processing...' })}

                <Button variant='dark' type='submit' >
                    Submit
                </Button>
            </Form>
        </Container >
    );
}

export default AddStaff;