import { Form, Container, Row, Col, Table } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


function ViewMedicalRecords() {
    const [allValues, setAllValues] = useState({});
    const locations = useLocation();

    //const appointmentId = locations.state.appointmentId;
    const medicalRecord = locations.state.report;
    const prescription = locations.state.prescription;

    if (!Object.values(allValues).length) {
        console.log('empty', medicalRecord);

        setAllValues({ ...medicalRecord });
    }
    else {
        console.log('filled', allValues);
    }

    const testsPerformed = ["Pencil' push-up", "RAF Rule", "Push-up amp", "Blur amp", "Cover test",
        "Von Graffe", "Maddox Wing", "Maddox rod", "Worth -4-dot", "Red lens", "Stereo acuity",
        "Pen light", "Inspection", "Transillumination", "Shadow Test", "Pupillary reflex test", "Keratoscopy",
        "Munson sign", "Ocular palpation", "Confrontation fields", "Blood Sugar", "BP", "Urine Sugar",
        "Others"];
    const testResults1 = ["NPC", "Vergence", "Amp of Accom", "OD", "OS",
        "Phoria/Tropia", "Fusion/Suppression", "Preferred Eye", "Versions"];
    const testResults2 = ["General appearance", "Lids and margins", "Bulba margins", "Bulba Conj", "Palpebral Conj",
        "Limbus", "Cornea", "Iris", "AC angle", "Pupil shape", "Pupil size", "Direct", "Consensual",
        "Near", "Ocular Tension", "Confrontation fields"];

    const directOpha1 = ["Lens", "Vitreous"];

    const directOpha2 = ["Elsc Type", "C/d Ratio", "Depth of Cup", "Colour", "Lamina", "Margin"]

    const directOpha3 = ["Calibre Ratio", "Course", "A-V Crossings", "Spon. Ven. Pulse",
        "Mascular Area", "Fovea Reflex", "Periphery"]


    const showPrescription = (prescript) => {
        console.log('appPresc', prescript);
        console.log('appPresc111');
        return (
            <Table bordered size='sm' responsive className="text-center text-light">
                <thead>
                    <tr>

                        <th>
                            Name
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            exta info
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {prescript.map((item) => {
                        return (<tr>

                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.qty}
                            </td>
                            <td>
                                {item.note}
                            </td>
                        </tr>)
                    })
                    }

                </tbody>
            </Table>
        )
    }

    return (
        <Container className=' text-light p-3' style={{
            'background-color': 'purple'
        }}>
            <h4>Visual Acuity</h4>
            <Table bordered className='bg-dark text-light text-center'>
                <thead>
                    <tr>
                        <th colSpan={2}>Unaided</th><th></th><th colSpan={3}>Supplementary</th><th colSpan={9}>With spectacular description</th>
                    </tr>
                    <tr>
                        <th>  </th> <th>@ 6M  </th><th>@0.4M </th><th>PH </th> <th>SD </th><th> IL</th> <th>IL </th> <th>Sphere </th> <th>Cylinder</th>
                        <th>Axis </th> <th> VA @ 6M  </th> <th>ADD </th> <th>VA @ 0.4M </th> <th> Base</th> <th> F1/C.T</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>OD</td>
                        {[...Array(14).keys()].map(item =>
                            <td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [item]: event.target.value }) }} value={allValues[item]} /></td>
                        )}
                    </tr>
                    <tr>
                        <td>OS</td>
                        {[...Array(14).keys()].map(item =>
                            <td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [item + 14]: event.target.value }) }}
                                value={allValues[item + 14]} /></td>
                        )}
                    </tr>
                    <tr>
                        <td>OU</td>
                        {[...Array(14).keys()].map(item =>
                            <td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [item + 14 + 14]: event.target.value }) }}
                                value={allValues[item + 14 + 14]} /></td>
                        )}
                    </tr>
                    <tr>
                        <td >Contact Lens</td>
                        <td >
                            <tr><td>OD</td></tr>
                            <tr><td>OS</td></tr>
                        </td>
                        <td colSpan={3}>
                            <tr><td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [14 + 14 + 14]: event.target.value }) }}
                                value={allValues[14 + 14 + 14]} /></td></tr>
                            <tr><td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 14 + 14 + 14]} /></td></tr>
                        </td>
                        <td >
                            <tr><td>A</td></tr>
                            <tr><td>VA</td></tr>
                        </td>
                        <td colSpan={2}>
                            <tr><td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 14 + 14 + 14]} /></td></tr>
                            <tr><td><Form.Control className='text-light' plaintext disabled type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 1 + 14 + 14 + 14]} /></td></tr>
                        </td>
                        <td colSpan={7} >
                            <tr><td>Lens Type</td><td><Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td></tr>
                            <tr><td>Segment Shape/Width</td><td><Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td></tr>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col>
                    <h4>Preliminary External Tests</h4>
                    <Table bordered className='bg-dark text-light text-center'>
                        <thead>
                            <tr>
                                <th>Tests Performed (tick) </th>
                            </tr>
                        </thead>
                        <tbody>

                            {[...Array(24).keys()].map(item =>
                                <tr className='text-center'>
                                    <td ><Form.Check disabled reverse label={testsPerformed[item]}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: !allValues[item + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14] })
                                        }}
                                        checked={allValues[item + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>

                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h4>Results of Preliminary External Tests </h4>
                    <Table bordered className='bg-dark text-light'>
                        <thead>
                            <tr>
                                <th>Results </th>
                            </tr>
                        </thead>
                        <tbody>

                            {[...Array(9).keys()].map(item =>
                                <tr>
                                    <td colSpan={2}>
                                        <Row>
                                            <Col>
                                                {testResults1[item]}
                                            </Col>
                                            <Col>
                                                <Form.Control className='text-light' plaintext disabled type='text'
                                                    onChange={(event) => {
                                                        setAllValues(
                                                            { ...allValues, [item + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                    }}
                                                    value={allValues[item + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                            </Col>
                                        </Row>

                                    </td>

                                </tr>
                            )}
                            <tr>
                                <td> OD</td>
                                <td> OS</td>
                            </tr>
                            {[...Array(16).keys()].map(item =>
                                <tr>
                                    <td>{testResults2[item]}: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    <td>{testResults2[item]}: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                </tr>
                            )}


                        </tbody>
                    </Table>

                </Col>
            </Row>


            <Row className='mb-5'>
                <Col>
                    <h4>External Examination</h4>
                </Col>
                <Col>
                    Still lamp: <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    Gonioscopy: <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    Dilated SLE: <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <h4>Carotid Artery Ausculation:</h4>
                    </Row>

                    <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />


                </Col>
                <Col>
                    <Row>
                        <h4>Tonometery</h4>
                    </Row>
                    <Row>
                        <Table bordered className='bg-dark text-light'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th colSpan={3}>Schoitz (Indentation)</th>
                                    <th colSpan={2}>Goldmann (Application)</th>
                                </tr>
                                <tr>
                                    <th></th> <th>5.5g</th>  <th>7.5g</th>  <th>10g</th>
                                    <th>SLB Mounted</th>  <th>Perkins HH</th>  <th>NCT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>OD</td>
                                    {[...Array(6).keys()].map(item =>
                                        <td>
                                            <Form.Control className='text-light' plaintext disabled type='text'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [item + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[item + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <td>OS</td>
                                    {[...Array(6).keys()].map(item =>
                                        <td>
                                            <Form.Control className='text-light' plaintext disabled type='text'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [item + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[item + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </td>
                                    )}
                                </tr>
                                <tr>


                                    <td colSpan={6}> <Row>
                                        <Col>
                                            Time: <Form.Control className='text-light' plaintext disabled type='text'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </Col>
                                        <Col>
                                            Anaesthetic: <Form.Control className='text-light' plaintext disabled type='text'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </Col>
                                        <Col>
                                            Stain: <Form.Control className='text-light' plaintext disabled type='text'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </Col>
                                    </Row>   </td>
                                </tr>
                            </tbody>
                        </Table>

                    </Row>
                </Col>

            </Row>
            <h4>Internal Examination</h4>
            <Row className='mb-5'>
                <Col>
                    Monoc Direct:  <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    Indirect:  <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    Bincioc Indirect: <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    SLE/Goldmann Lens:  <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    Rhuby Lens: <Form.Control className='text-light' plaintext disabled type='text'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>

                </Col>

            </Row>
            <Row>
                <Col>
                    <h4>Direct Ophthalmoscopy</h4>
                    <Table bordered className='bg-dark text-light'>
                        <thead>
                            <tr>
                                <th></th> <th>OD</th> <th>OS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(2).keys()].map(item =>
                                <tr>
                                    <td></td>
                                    <td>
                                        {directOpha1[item]}: <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [item + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[item + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td>
                                    <td>
                                        {directOpha1[item]}: <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [item + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[item + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>

                                </tr>
                            )}
                            <tr>
                                <td colSpan={3}>Disc</td>

                            </tr>
                            {[...Array(6).keys()].map(item =>
                                <tr>
                                    <td></td>
                                    <td> {directOpha2[item]}:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    <td>{directOpha2[item]}: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>

                                </tr>
                            )}
                            <tr>
                                <td colSpan={3}>Retinal Vessels</td>

                            </tr>
                            {[...Array(7).keys()].map(item =>
                                <tr>
                                    <td></td>
                                    <td> {directOpha3[item]}:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    <td> {directOpha3[item]}:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>

                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>

                <Col>
                    <h4>Visual Fields</h4>
                    <Row className='mb-2'>
                        <Col>
                            OS <Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                        </Col>

                    </Row>
                    <Row className='mb-5'>
                        <Col>
                            OD: <Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <h4>Colour Vision</h4>
                            <Row className='mb-2'>
                                <Col>
                                    Test:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                </Col>

                            </Row>
                            <Row className='mb-2'>
                                <Col>
                                    OD:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                </Col>

                            </Row>
                            <Row className='mb-2'>
                                <Col>
                                    OS: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Refractive Procedure</h4>
                    <h5>Retinoscopy</h5>
                    <Table bordered className='bg-dark text-light'>
                        <tbody>
                            {[...Array(2).keys()].map(item =>
                                <tr>
                                    <td>{(item === 0) ? 'OD' : 'OS'}: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td> <td>VA: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <h5>Monocular Subjective</h5>
                    <Table bordered className='bg-dark text-light'>
                        <tbody>
                            {[...Array(2).keys()].map(item =>
                                <tr>
                                    <td> {(item === 0) ? 'OD' : 'OS'}:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td> <td> VA:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <h5>Binocular Balance</h5>
                    <Table bordered className='bg-dark text-light'>
                        <tbody>
                            {[...Array(3).keys()].map(item =>
                                <tr>
                                    <td> {(item === 0) ?
                                        'OD' : (item === 1) ? 'OS' : 'OU'}:<Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [item + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[item + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td> <td>VA: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h4>Refractive Procedure</h4>
                    <h5>Binocular Balance</h5>
                    <Row >
                        <Col>
                            @6M
                        </Col>
                        <Col>
                            Method:<Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Vertical</h5>

                        </Col>
                        <Col>

                        </Col>
                        <Row>

                            <Col>
                                Phoria: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                + vv (BD/OD):<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                - vv (BU/OD): <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Horizontal</h5>

                        </Col>
                        <Col>

                        </Col>
                        <Row>

                            <Col>
                                Phoria: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BI:<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BO: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                    </Row>
                </Col>
                <Col>
                    <h4>Keratometry</h4>
                    <Row>
                        <Col>
                            <Table bordered className='bg-dark text-light'>
                                <thead>
                                    <tr>
                                        <th></th>  <th>Lower Power</th>  <th>High Power</th>  <th>Corneal Cylinder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>OD</td>
                                        <td> <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    </tr>
                                    <tr>
                                        <td>OS</td>
                                        <td> <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control className='text-light' plaintext disabled type='text'
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mb-5'>
                <h4>Near Refraction</h4>
                <Col>
                    <Table bordered className='bg-dark text-light'>
                        <thead>
                            <tr>
                                <th></th>  <th>Amp of Accom</th> <th>Calo/Tenative ADD</th>
                                <th>Refined ADD</th>  <th>Working Dist</th>  <th>Range</th>  <th>Final ADD</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>OD</td>
                                {[...Array(6).keys()].map(item =>
                                    <td><Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                )}
                            </tr>
                            <tr>
                                <td>OS</td>
                                {[...Array(6).keys()].map(item =>
                                    <td><Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                )}
                            </tr>
                            <tr>
                                <td></td>
                                {[...Array(6).keys()].map(item =>
                                    <td>{(item < 3) ? 'Method' : ''}:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                )}
                            </tr>
                        </tbody>
                    </Table>
                    <Row className='mb-5'>
                        <Col>
                            <h4> Student's Final spectacule Prescription</h4>
                            OD: <Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            OS:<Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            PD: <Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            Lens Type: <Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            <Row>
                                <Col>
                                    Segment: Shape:<Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                                </Col>
                                <Col>
                                    With: <Form.Control className='text-light' plaintext disabled type='text'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                                </Col>
                            </Row>


                            Other Specification:<Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            Student's Name:<Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                        </Col>
                        <Col>
                            <h4>  Notes/Supervisor's Final SPx</h4>
                            <Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                        </Col>
                    </Row>
                    <Row>
                        <h4>  Diagnosis:</h4>
                        <h4>  Problem - Plan list</h4>
                        <Form.Control className='text-light' plaintext disabled type='text'
                            onChange={(event) => {
                                setAllValues(
                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                            }}
                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                    </Row>
                </Col>
                <Col>
                    <h4>Binocularity</h4>
                    <Row>
                        <Col>
                            @ 0.4M
                        </Col>
                        <Col>
                            Method:<Form.Control className='text-light' plaintext disabled type='text'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <h5> Horizontal</h5>
                        </Col>
                        <Col>

                        </Col>
                        <Row>

                            <Col>
                                Phoria:<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BI: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BO: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            Phoria

                        </Col>
                        <Col>

                        </Col>
                        <Row>

                            <Col>
                                With + 1.00DS: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BI: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BO:<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                    </Row>
                    <Row>
                        <Col>

                            <h5>Phoria</h5>
                        </Col>
                        <Col>

                        </Col>
                        <Row>

                            <Col>
                                With - 1.00DS:<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BI:<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                BO:<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Vertical</h5>

                        </Col>
                        <Col>

                        </Col>
                        <Row>

                            <Col>
                                Phoria: <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                + vv (BD/OD):<Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                - vv (BU/OD): <Form.Control className='text-light' plaintext disabled type='text'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                    </Row>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col>
                    <h6> Px</h6>
                    <h4> Drug Prescription</h4>
                    <Container className="p-2 text-light">
                        {showPrescription(prescription)}
                    </Container>
                </Col>
                <Col>

                </Col>
            </Row>

        </Container >

    );
}

export default ViewMedicalRecords;