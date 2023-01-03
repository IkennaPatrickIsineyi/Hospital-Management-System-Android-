import Cookie from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import { loggedIn } from "../reload/reloadController";
import { sharedVariables } from "../sharedVariables";
import { UserContext } from "../userContext";
import { callEntry } from "./entryController";


function Entry() {
    const [payLoad, setPayLoad] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDesignation = (location.state == null) ? null : location.state.selectedDesignation;
    const url = sharedVariables.url;
    const designation = Cookie.get('designation');
    const users = ['/receptionist', '/administrator', '/physician', '/storeKeeper'];

    const updateState = (newValues) => {
        setPayLoad((prevValue) => { return newValues })
    }

    const { appState, setAppState } = useContext(UserContext);

    useEffect(() => {
        callEntry(updateState, designation, selectedDesignation, url, setAppState, navigate);
    }, []);


    return (
        /* o ... nno reply yet 
        1... not logged in
        2... logged in*/
        <>
            <Container>{(Object.values(payLoad).length === 0) ?
                <Spinner animation="border" /> :
                (payLoad.respCode === 2) ?
                    <Login selectedDesignation={selectedDesignation} /> :
                    loggedIn(payLoad, navigate, setAppState, users)
                //loaded.user is a number index of user type.
            }
            </Container>
        </>
    );
}

export default Entry;