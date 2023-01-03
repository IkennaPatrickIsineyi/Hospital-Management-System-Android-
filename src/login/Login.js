import { Form, Button, Container, Image } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';

import backgroundImg from '../static/optoPic.png';
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';
import { formProcessor } from './loginController';
import { UserContext } from '../userContext';

function Login(props) {
    const [states, setStates] = useState({
        username: '', password: '', blockView: false, showBanner: 0
    });

    const { appState, setAppState } = useContext(UserContext)

    const navigate = useNavigate();
    const users = ['/receptionist', '/administrator', '/physician', '/storeKeeper'];
    const url = sharedVariables.url;
    const selectedDesignation = props.selectedDesignation;
    console.log('login', selectedDesignation);


    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }

    const defaultView = (
        <Container className=''>
            <Container className='text-center bg-black '>
                <Image src={backgroundImg} fluid />
            </Container>
            <h1 className='text-center'>Login</h1>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => {
                formProcessor(event, url, states, updateState,
                    navigate, selectedDesignation, users, setAppState)
            }} >
                {TextBoxFormGroup({
                    type: 'username', placeholder: 'Enter username',
                    onChange: (event) => {
                        updateState({ showBanner: 0, username: event.target.value })
                    },
                    value: states.username, label: "Username", className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'password', placeholder: 'Enter Password',
                    onChange: (event) => {
                        updateState({ showBanner: 0, password: event.target.value })
                    },
                    value: states.password, label: "Password", className: 'mb-3'
                })}

                <Button variant='dark' type='submit'>
                    Submit
                </Button>
            </Form>

            {BlockingSpinner({ show: states.blockView, content: "Processing..." })}

        </Container>
    );

    const Views = [defaultView];
    return Views[0]
}

export default Login;