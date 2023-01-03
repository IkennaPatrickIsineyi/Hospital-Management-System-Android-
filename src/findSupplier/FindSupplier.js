import { Form, Button, Container, Dropdown, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';
import { findUser, formProcessor } from './findSupplierController';

function FindSupplier() {
    const [states, setStates] = useState({
        supplierName: '', showBanner: 0, errorMsg: '', blockView: false,
        searching: false, supplierList: [], chosenSupplier: {}
    });

    const navigate = useNavigate();

    const url = sharedVariables.url;

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
                            chosenSupplier: item,
                            supplierName: item.fullName
                        });
                    }}>
                        <Row>
                            <Col>
                                <b>Name:</b><br />
                                {item.fullName}
                            </Col>
                            <Col>
                                <b>Phone number:</b><br />
                                {item.phone}
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
        <Container className=' text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Find Supplier
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, url, states, updateState, navigate) }}>

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter supplier's name",
                    onChange: (event) => {
                        findUser(event.target.value, url, updateState);
                        updateState({
                            supplierName: event.target.value,
                            chosenSupplier: {}, showBanner: 0,
                            searching: true
                        });
                    }, value: states.supplierName,
                    label: "Full name", className: 'mb-1'
                })}

                <Dropdown show={states.supplierName.length &&
                    !Object.keys(states.chosenSupplier).length} >
                    <Dropdown.Menu>
                        {buildList(states.supplierList)}
                    </Dropdown.Menu>
                </Dropdown>

                {(Object.keys(states.chosenSupplier).length) ?
                    <Button variant='dark' type='submit' >
                        Submit
                    </Button> :
                    null}

            </Form>

            {BlockingSpinner({ show: states.blockView, content: "Processing..." })}
        </Container>

    );
}
export default FindSupplier;