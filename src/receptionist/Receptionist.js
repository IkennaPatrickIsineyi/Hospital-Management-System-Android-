import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CancelAppointment from "../cancelAppointment/CancelAppointment";

import addAppointmentImg from '../static/icons8-appointment-64.png';
import addPatientImg from '../static/icons8-add-user-55.png';


function Receptionist() {
    const [cancel, setCancel] = useState();
    const [listChanged, setListChanged] = useState(false);
    const [newAppointmentList, setNewAppointmentList] = useState([]);

    const locations = useLocation();
    console.log('locations:', locations);
    const navigate = useNavigate();
    console.log('physician', locations.state);

    let data = (listChanged) ? newAppointmentList : locations.state.requiredData.appointments;

    const tableBuilder = () => {
        let count = 1;
        return [...data].map((item) => {
            return (cancel === data.indexOf(item)) ?
                (<tr className="text-center">
                    <td colSpan={4} >
                        <CancelAppointment fullName={`${item.firstName} ${item.lastName}`}
                            patientId={item.patientId} listController={setNewAppointmentList}
                            appointmentList={[...data]} index={cancel} setCancel={setCancel}
                            listChanged={setListChanged}
                        />
                    </td>
                </tr>) :
                (<tr>
                    <td>
                        {count++}
                    </td>
                    <td >
                        {item.firstName}
                    </td>
                    <td >
                        {item.lastName}
                    </td>
                    <td >
                        {item.staffId}
                    </td>
                    <td >
                        <Button variant='dark' onClick={() => { setCancel(data.indexOf(item)); }}>
                            Cancel Appointment
                        </Button>
                    </td>
                </tr>
                )
        });
    }

    const DefaultView = <Container className="p-4 " id="boss" style={{
        'background-color': 'purple'
    }}>
        <Container >
            <Row className="p-2 ">
                <Col className="p-5 bg-dark rounded mx-1 text-light text-center"
                    onClick={() => { navigate('/addPatient'); }}>
                    <img src={addPatientImg} width="100px"
                        alt='logo' className="rounded-circle" />
                    <h3>
                        Register Patient
                    </h3>
                </Col>
                <Col className="p-5 bg-dark rounded mx-1 text-light text-center"
                    onClick={() => { navigate('/bookAppointment'); }}>
                    <img src={addAppointmentImg} width="100px"
                        alt='logo' className="rounded-circle" />
                    <h3>
                        Create Appointment
                    </h3>
                </Col>
            </Row>
        </Container>

        <Container>
            <Row className='bg-dark text-light'>
                <h5>Today's Appointments</h5>
            </Row>
        </Container>
        <Container>
            <Table bordered responsive className="text-center text-white">
                <thead>
                    <tr >
                        <th>
                            S/N
                        </th>
                        <th>
                            firstName
                        </th>
                        <th>
                            LastName
                        </th>
                        <th>
                            consultant
                        </th>

                        <th>
                            Cancel
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {tableBuilder()}
                    {(data.length === 0) ?
                        (<tr><td colSpan={4} className='text-white'>
                            <h4>No appointments</h4></td></tr>) :
                        null}
                </tbody>
            </Table>
        </Container>

    </Container >


    return DefaultView;
}

export default Receptionist;