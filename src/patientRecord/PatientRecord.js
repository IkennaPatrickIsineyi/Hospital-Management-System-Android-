import { Col, Container, Button, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { computeAge } from "./patientRecordController";


function PatientRecord() {
    const locations = useLocation();
    const navigate = useNavigate();
    console.log('physician', locations.state);

    console.log('patientRecords', locations.state);

    const bioData = locations.state.requiredData.bioData[0];
    const record = locations.state.requiredData.medicalRecord;
    const appointmentId = locations.state.requiredData.appointmentId;
    const medicalRecord = record.medicalReport;
    const prescription = record.prescription;


    console.log('bioData', bioData.firstName);
    console.log('record', record);
    console.log('medicalRecord', medicalRecord);
    console.log('prescription', prescription);

    const tableBuilder = () => {
        let count = 0;
        return medicalRecord.map((item) => {
            console.log(item);
            return (<tr >
                <td>
                    {count++}
                </td>
                <td className="border">
                    {item.appointmentDate.slice(0, 10)}
                </td>
                <td className="border">
                    {item.staffId}
                </td>
                <td className="border">
                    <Button variant='dark' style={{
                        'background-color': 'purple'
                    }} onClick={(event) => {
                        event.preventDefault();
                        navigate('/viewmedicalrecord', {
                            state: {
                                'appointmentId': item.appointmentId,
                                'prescription': prescription[Number(item.appointmentId)],
                                'report': JSON.parse(item.diagnosis)
                            }
                        });

                        console.log('appoint', item.appointmentId);

                    }}>
                        View Report
                    </Button>
                </td>
            </tr>

            )

        });
    }

    const DefaultView = (
        <Container className="p-4 " style={{
            'background-color': 'purple'
        }}>
            <Row className="mb-2">
                <Col>
                    <Button variant='dark' onClick={() => {
                        navigate('/reportform', {
                            state: {
                                'appointmentId': appointmentId
                            }
                        });
                    }}>
                        Make Report
                    </Button>
                </Col>
            </Row>
            <Container>
                <Row className="p-2 bg-dark text-light">
                    Patient's Biodata
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        First Name:
                    </Col>
                    <Col>
                        {bioData.firstName}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Last Name:
                    </Col>
                    <Col>
                        {bioData.lastName}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Gender
                    </Col>
                    <Col>
                        {(bioData.gender === 'm') ? 'Male' :
                            (bioData.gender === 'f') ? 'Female' : ''}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Occupation
                    </Col>
                    <Col>
                        {bioData.occupation}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Religion
                    </Col>
                    <Col>
                        {bioData.religion}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Marital Status
                    </Col>
                    <Col>
                        {bioData.married}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Age
                    </Col>
                    <Col>
                        {computeAge(bioData.birthday.slice(0, 4))}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Email
                    </Col>
                    <Col>
                        {bioData.email}
                    </Col>
                </Row>
                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Phone number
                    </Col>
                    <Col>
                        {bioData.phone}
                    </Col>
                </Row>
            </Container>

            <Container className="p-4 bg-dark text-light">
                <Row className="p-2 bg-dark ">
                    Patient's Medical History
                </Row>
                <Table bordered size='sm' responsive className="text-center text-white">
                    <thead>
                        <tr>
                            <th>
                                S/N
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Doctor
                            </th>
                            <th>
                                Findings
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {(medicalRecord.length) ?
                            tableBuilder() :
                            <tr>
                                <td colSpan={6}>
                                    No medical records
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>

            </Container >


        </Container >
    );

    return DefaultView;
}

export default PatientRecord;