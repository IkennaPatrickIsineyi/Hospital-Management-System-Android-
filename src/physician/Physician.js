import { Container, Button, Row, Table } from "react-bootstrap";
import CancelAppointment from "../cancelAppointment/CancelAppointment";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { sharedVariables } from "../sharedVariables";
import { getPatientRecord } from "./physicianController";
import { alertBanner, BlockingSpinner } from "../inputWidgets/inputWidgets";

function Physician() {
    const [cancel, setCancel] = useState();
    const [listChanged, setListChanged] = useState(false);
    const [newAppointmentList, setNewAppointmentList] = useState([]);
    const [showBanner, setBanner] = useState(0);
    const [blockView, setBlockView] = useState(false);

    const locations = useLocation();
    const navigate = useNavigate();
    console.log('physician', locations.state);

    const staffId = locations.state.requiredData.staffId;
    const appointmentList = locations.state.requiredData.appointments;

    let appointments = (listChanged) ? newAppointmentList : appointmentList;

    const url = sharedVariables.url;
    console.log(appointments);


    const tableBuilder = () => {
        let count = 1;
        return appointments.map((item) => {
            return (cancel === appointments.indexOf(item)) ?
                (<tr className="text-center">
                    <td colSpan={5} >
                        <CancelAppointment fullName={`${item.firstName} ${item.lastName}`}
                            patientId={item.patientId} listController={setNewAppointmentList}
                            appointmentList={[...appointments]} index={cancel} setCancel={setCancel}
                            listChanged={setListChanged}
                        />
                    </td>
                </tr >) :
                (<tr>
                    <td >
                        {count++}
                    </td>
                    <td>
                        {item.firstName}
                    </td>
                    <td >
                        {item.lastName}
                    </td>
                    <td >
                        <Button variant='dark' onClick={() => {
                            getPatientRecord(url, navigate, setBanner, item.patientId,
                                item.appointmentId, setBlockView);
                        }}>
                            View Record
                        </Button>
                    </td>
                    <td >
                        <Button variant='dark' onClick={() => {
                            setCancel(appointments.indexOf(item));
                        }}>
                            Cancel
                        </Button>
                    </td>
                </tr>
                )
        });
    }

    const DefaultView = (
        <Container className="p-4  " style={{
            'background-color': 'purple'
        }}>

            <Container>
                <Row className="p-2 bg-dark text-light">
                    Today's Appointments
                </Row>
            </Container>

            {alertBanner(showBanner)}

            <Table bordered responsive className="text-center text-white">
                <thead>
                    <tr>
                        <th>
                            S/N
                        </th>
                        <th>
                            first Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Records
                        </th>
                        <th>
                            Cancel
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableBuilder()}
                    {(appointments.length === 0) ?
                        (<tr>
                            <td colSpan={5}>
                                No appointments
                            </td>
                        </tr>) :
                        null}
                </tbody>
            </Table>
            {BlockingSpinner({ show: blockView, content: "Processing..." })}
        </Container>
    );

    const Views = [DefaultView];

    return Views[0];
}

export default Physician;