import { Form, Button, Container, Dropdown, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';
import { findUser, formProcessor, replaceImg } from './findStaffController';

import defaultImg from '../static/icons8-add-user-55.png';

function FindStaff() {
    const [states, setStates] = useState({
        staffName: '', showBanner: 0, staffList: [], searching: false,
        chosenStaff: {}, showModal: false, blockView: false, errorMsg: ''
    })

    const navigate = useNavigate();

    const url = sharedVariables.url;
    //const defaultImg = 'icons8-add-user-55.png';

    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }

    const buildList = (list) => {
        console.log(list);
        if (states.searching) {
            console.log('searching...');
            return <Dropdown.Item disabled className='text-dark'>
                <Container>
                    Searching
                </Container>
            </Dropdown.Item>
        }
        else if (list.length) {
            console.log('Found something...');

            return list.map((item) => {
                return <Dropdown.Item>
                    <Container onClick={() => {
                        updateState({
                            chosenStaff: item,
                            staffName: `${item.firstName} ${item.lastName}`
                        })
                    }}>
                        <Row>
                            <Col>
                                <img src={url + '/staffFiles/?filename=' + item.image}
                                    alt={item.firstName} width="100px"
                                    onError={(error) => { replaceImg(error, defaultImg) }} />
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <b>Name:</b><br />
                                        {item.firstName} {item.lastName}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <b>Phone number:</b><br />{item.phone}

                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Container>
                </Dropdown.Item>
            });
        }
        else {
            console.log('Found nothing...');
            return <Dropdown.Item disabled className='text-dark'>
                <Container>
                    {states.errorMsg}
                </Container>
            </Dropdown.Item>
        }
    }

    return (
        <Container className='text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Find Staff
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, url, states, updateState, navigate) }} >

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter staff's name",
                    onChange: (event) => {
                        findUser(event.target.value, url, updateState);
                        updateState({
                            staffName: event.target.value,
                            chosenStaff: {}, showBanner: 0,
                            searching: true
                        });

                    }, value: states.staffName,
                    label: "Staff's Name", className: 'mb-1'
                })}

                <Dropdown show={states.staffName.length &&
                    !Object.keys(states.chosenStaff).length} >
                    <Dropdown.Menu >
                        {buildList(states.staffList)}
                    </Dropdown.Menu>
                </Dropdown>

                {(Object.keys(states.chosenStaff).length) ?
                    <Button variant='dark' type='submit' >
                        Submit
                    </Button> :
                    null}

            </Form>
            {BlockingSpinner({ show: states.blockView, content: "Processing..." })}
        </Container>

    );
}

export default FindStaff;