import { useContext, useState } from "react";
import { Button, Card, Col, Container, Modal, ModalBody, Nav, Navbar, Row } from "react-bootstrap";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { sharedVariables } from "../sharedVariables";
//import Cookies from 'js-cookie';
import { logOut } from "./layoutController";
import { BlockingSpinner } from "../inputWidgets/inputWidgets";
import { UserContext } from "../userContext";


function Layout() {
    const navigate = useNavigate();
    const location = useLocation()

    console.log(location.pathname);
    console.log(location.state);
    const url = sharedVariables.url;

    const [states, setStates] = useState({
        showModal: false, blockView: false
    });

    const { appState, setAppState } = useContext(UserContext);

    const staffId = (appState.username === '' && location.state?.requiredData) ?
        location.state.requiredData.staffId :
        appState.username;

    const loggedIn = (appState.username === '' && location.state?.requiredData) ?
        location.state.requiredData.user :
        appState.loggedIn;

    const pathname = location.pathname;

    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }


    return (
        <>
            <Navbar className="text-center mb-2" bg="dark" variant="dark" expand="lg" >
                <Container className="text-center">
                    <Row >
                        <Col>

                            {(pathname === '/landing' || pathname === '/home'
                                || pathname === '/storeKeeper' || pathname === '/administrator'
                                || pathname === '/physician' || pathname === '/receptionist'
                                || pathname === '/') ? null :
                                <Button variant='dark' onClick={() => { navigate(-1); }}>
                                    Back
                                </Button>}
                        </Col>
                        <Col >
                            <Navbar.Brand>
                                UNIBEN Optomery Clinic
                            </Navbar.Brand>
                        </Col>
                        <Col >
                            <Nav>
                                <Nav.Link>
                                    {staffId}
                                </Nav.Link>

                            </Nav>
                        </Col>


                        {(loggedIn) ?
                            <Col>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav >
                                        <Button variant='dark'
                                            onClick={() => { logOut(url, updateState, navigate, setAppState) }}>
                                            LogOut</Button>
                                    </Nav>
                                </Navbar.Collapse>
                            </Col> :
                            null
                        }
                    </Row>
                </Container>
            </Navbar>


            <Outlet />
            <Modal show={states.showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Logged out
                        <Button variant='dark' onClick={() => { updateState({ showModal: false }) }}>
                            Dismiss
                        </Button>
                    </Card>
                </ModalBody>
            </Modal>

            {BlockingSpinner({ show: states.blockView, content: "Logging out..." })}
        </>
    );
}

export default Layout;