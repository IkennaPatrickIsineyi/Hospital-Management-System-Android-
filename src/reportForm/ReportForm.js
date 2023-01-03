import { Form, Button, Container, Spinner, Modal, ModalBody, Card, Row, Col, Table, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { clearBoxes, find, formProcessor, removeData } from './reportFormController';
import { alertBanner, BlockingSpinner } from '../inputWidgets/inputWidgets';

function ReportForm() {
    const [allValues, setAllValues] = useState({});
    const [chosenStock, setChosenStock] = useState({});
    const [stockList, setStockList] = useState([]);
    const [stockName, setStockName] = useState('');


    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [qty, setQty] = useState('');

    const [treatment, setTreatment] = useState([]);

    const [showBanner, setBanner] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);
    const [prescriptionEmpty, setPrescriptionEmpty] = useState(false);

    const navigate = useNavigate();
    const locations = useLocation();


    const url = sharedVariables.url;

    const appointmentId = locations.state.appointmentId;

    if (!Object.values(allValues).length) {
        console.log('empty', Object.values(allValues).length);

        const valueObj = Object.assign({}, [...Array(257).keys()].map(item => null));
        console.log('empty', valueObj);
        setAllValues({ ...valueObj });
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



    const textBox = (placeholder, value, valueCallback) => {
        return (<Form.Control type='text' placeholder={placeholder}
            onChange={(event) => {
                setBanner(0);
                valueCallback(event.target.value)
            }} value={value} />);
    };

    let data = { 'stockId': name, 'qty': qty, 'note': note, 'name': stockName };


    const buildList = (list) => {
        console.log(list);

        return list.map((item) => {
            return <Dropdown.Item>
                <Container onClick={() => {
                    setChosenStock(item);
                    setName(item.stockId);
                    setStockName(item.name);
                }}>
                    <Row>
                        <Col>
                            <b>Name:</b><br />
                            {item.name}
                        </Col>
                        <Col>
                            <b>{'Description'}</b><br />
                            {item.description}
                        </Col>
                    </Row>

                </Container>
            </Dropdown.Item>
        });

    }


    const tableBuilder = () => {
        // console.log('called...', dataFields.length);
        let count = 0;
        return [...treatment].map((item) => {
            console.log(item);
            return (<tr>
                <td >
                    {count++}
                </td>
                <td>
                    {item.name}
                </td>
                <td >
                    {item.qty}
                </td>
                <td >
                    {item.note}
                </td>
                <td >


                    <Button variant='dark' onClick={(event) => {
                        console.log(treatment.indexOf(item));
                        removeData(treatment.indexOf(item), treatment, setTreatment);
                    }}>
                        Remove
                    </Button>

                </td>
            </tr>
            )
        });
    }


    return (
        //  <>
        <Container className='text-light p-3' style={{
            'background-color': 'purple'
        }}>
            {alertBanner(showBanner)}
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
                            <td><Form.Control type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [item]: event.target.value }) }} value={allValues[item]} /></td>
                        )}
                    </tr>
                    <tr>
                        <td>OS</td>
                        {[...Array(14).keys()].map(item =>
                            <td><Form.Control type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [item + 14]: event.target.value }) }}
                                value={allValues[item + 14]} /></td>
                        )}
                    </tr>
                    <tr>
                        <td>OU</td>
                        {[...Array(14).keys()].map(item =>
                            <td><Form.Control type='text' placeholder=''
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
                            <tr><td><Form.Control type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [14 + 14 + 14]: event.target.value }) }}
                                value={allValues[14 + 14 + 14]} /></td></tr>
                            <tr><td><Form.Control type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 14 + 14 + 14]} /></td></tr>
                        </td>
                        <td >
                            <tr><td>A</td></tr>
                            <tr><td>VA</td></tr>
                        </td>
                        <td colSpan={2}>
                            <tr><td><Form.Control type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 14 + 14 + 14]} /></td></tr>
                            <tr><td><Form.Control type='text' placeholder=''
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 1 + 14 + 14 + 14]} /></td></tr>
                        </td>
                        <td colSpan={7} >
                            <tr><td><Form.Control type='text' placeholder='Lens Type'
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td></tr>
                            <tr><td><Form.Control type='text' placeholder='Segment Shape/Width'
                                onChange={(event) => { setAllValues({ ...allValues, [1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value }) }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td></tr>
                        </td>
                        {/* <tr><td>OD</td></tr>
                        <tr><td>OS</td></tr> */}
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
                                    <td ><Form.Check reverse label={testsPerformed[item]}
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
                                        <Form.Control type='text' placeholder={testResults1[item]}
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [item + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[item + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td>

                                </tr>
                            )}
                            <tr>
                                <td> OD</td>
                                <td> OS</td>
                            </tr>
                            {[...Array(16).keys()].map(item =>
                                <tr>
                                    <td> <Form.Control type='text' placeholder={testResults2[item]}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    <td> <Form.Control type='text' placeholder={testResults2[item]}
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
                    <Form.Control type='text' placeholder='Still lamp'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='Gonioscopy'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='Dilated SLE'
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

                    <Form.Control type='text' placeholder=''
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
                                            <Form.Control type='text' placeholder=''
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
                                            <Form.Control type='text' placeholder=''
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
                                            <Form.Control type='text' placeholder='Time'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </Col>
                                        <Col>
                                            <Form.Control type='text' placeholder='Anaesthetic'
                                                onChange={(event) => {
                                                    setAllValues(
                                                        { ...allValues, [1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                                }}
                                                value={allValues[1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                        </Col>
                                        <Col>
                                            <Form.Control type='text' placeholder='Stain'
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
                    <Form.Control type='text' placeholder='Monoc Direct'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='Indirect'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='Bincioc Indirect'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='SLE/Goldmann Lens'
                        onChange={(event) => {
                            setAllValues(
                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                        }}
                        value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                </Col>
                <Col>
                    <Form.Control type='text' placeholder='Rhuby Lens'
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
                                        <Form.Control type='text' placeholder={directOpha1[item]}
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [item + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[item + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td>
                                    <td>
                                        <Form.Control type='text' placeholder={directOpha1[item]}
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
                                    <td> <Form.Control type='text' placeholder={directOpha2[item]}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    <td> <Form.Control type='text' placeholder={directOpha2[item]}
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
                                    <td> <Form.Control type='text' placeholder={directOpha3[item]}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    <td> <Form.Control type='text' placeholder={directOpha3[item]}
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
                            <Form.Control type='text' placeholder='OD'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                        </Col>

                    </Row>
                    <Row className='mb-5'>
                        <Col>
                            <Form.Control type='text' placeholder='OD'
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
                                    <Form.Control type='text' placeholder='Test'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                </Col>

                            </Row>
                            <Row className='mb-2'>
                                <Col>
                                    <Form.Control type='text' placeholder='OD'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                </Col>

                            </Row>
                            <Row className='mb-2'>
                                <Col>
                                    <Form.Control type='text' placeholder='OS'
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
                    <Table>
                        <tbody>
                            {[...Array(2).keys()].map(item =>
                                <tr>
                                    <td> <Form.Control type='text' placeholder={(item === 0) ? 'OD' : 'OS'}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td> <td> <Form.Control type='text' placeholder='VA'
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
                    <Table>
                        <tbody>
                            {[...Array(2).keys()].map(item =>
                                <tr>
                                    <td> <Form.Control type='text' placeholder={(item === 0) ? 'OD' : 'OS'}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td> <td> <Form.Control type='text' placeholder='VA'
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
                    <Table>
                        <tbody>
                            {[...Array(3).keys()].map(item =>
                                <tr>
                                    <td> <Form.Control type='text' placeholder={(item === 0) ?
                                        'OD' : (item === 1) ? 'OS' : 'OU'}
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [item + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[item + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                                    </td> <td> <Form.Control type='text' placeholder='VA'
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
                    <Row>
                        <Col>
                            @6M
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder='Method'
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
                                <Form.Control type='text' placeholder='Phoria'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='+ vv (BD/OD)'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='- vv (BU/OD)'
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
                                <Form.Control type='text' placeholder='Phoria'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BI'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BO'
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
                                        <td> <Form.Control type='text' placeholder=''
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control type='text' placeholder=''
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control type='text' placeholder=''
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                    </tr>
                                    <tr>
                                        <td>OS</td>
                                        <td> <Form.Control type='text' placeholder=''
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control type='text' placeholder=''
                                            onChange={(event) => {
                                                setAllValues(
                                                    { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                            }}
                                            value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} /></td>
                                        <td> <Form.Control type='text' placeholder=''
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
                                    <td><Form.Control type='text' placeholder=''
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
                                    <td><Form.Control type='text' placeholder=''
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
                                    <td><Form.Control type='text' placeholder={(item < 3) ? 'Method' : ''}
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
                            <Form.Control type='text' placeholder='OD'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            <Form.Control type='text' placeholder='OS'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />
                            <Form.Control type='text' placeholder='PD'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            <Form.Control type='text' placeholder='Lens Type'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            <Row>
                                <Col>
                                    <Form.Control type='text' placeholder='Segment: Shape'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                                </Col>
                                <Col>
                                    <Form.Control type='text' placeholder='With'
                                        onChange={(event) => {
                                            setAllValues(
                                                { ...allValues, [1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                        }}
                                        value={allValues[1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                                </Col>
                            </Row>


                            <Form.Control type='text' placeholder='Other Specification'
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            <Form.Control type='text' placeholder="Student's Name"
                                onChange={(event) => {
                                    setAllValues(
                                        { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                }}
                                value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                        </Col>
                        <Col>
                            <h4>  Notes/Supervisor's Final SPx</h4>
                            <Form.Control type='text' placeholder=''
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
                        <Form.Control type='text' placeholder=''
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
                            <Form.Control type='text' placeholder='Method'
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
                                <Form.Control type='text' placeholder='Phoria'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BI'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BO'
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
                                <Form.Control type='text' placeholder='With + 1.00DS'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BI'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BO'
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
                                <Form.Control type='text' placeholder='With - 1.00DS'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BI'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='BO'
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
                                <Form.Control type='text' placeholder='Phoria'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='+ vv (BD/OD)'
                                    onChange={(event) => {
                                        setAllValues(
                                            { ...allValues, [1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]: event.target.value })
                                    }}
                                    value={allValues[1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 6 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 7 + 7 + 6 + 6 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 6 + 6 + 1 + 1 + 1 + 1 + 16 + 16 + 9 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 14 + 14 + 14]} />

                            </Col>

                        </Row>
                        <Row>

                            <Col>
                                <Form.Control type='text' placeholder='- vv (BU/OD)'
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
            <Form onSubmit={(event) => {
                formProcessor(event, url, appointmentId, allValues, treatment,
                    setBlockView, setBanner, setShowModal, setPrescriptionEmpty)
            }}>
                <Row className='mb-5'>

                    <Col>
                        <h6> Px</h6>
                        <h4> Drug Prescription</h4>
                        <Container className="p-2">

                            <Row className="pb-2">
                                <Col>
                                    <Form.Group className='mb-1' >
                                        <Form.Control type='text' placeholder="Enter item name"
                                            onChange={(event) => {
                                                find(event.target.value, url, setStockList, setBanner);
                                                setStockName(event.target.value);
                                                setName('');
                                                setChosenStock({});
                                            }}
                                            value={stockName} />
                                    </Form.Group>
                                    <Dropdown show={stockName.length && !Object.keys(chosenStock).length} >
                                        <Dropdown.Menu>
                                            {buildList(stockList)}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </Col>
                            </Row>
                            <Row className="pb-2">

                                <Col>
                                    {textBox('Enter quantity', qty, setQty)}
                                </Col>
                            </Row>
                            <Row className="pb-2">

                                <Col>
                                    {textBox('Extra information', note, setNote)}
                                </Col>
                            </Row>
                            <Row>

                                <Col className="text-center">
                                    {
                                        (note && qty && name) ?
                                            (<Button variant='dark' onClick={(event) => {
                                                // dataFields = [...dataFields, { 'name': name, 'qty': qty, 'note': note }];
                                                if (note && qty && name) {
                                                    setTreatment((treatment.length) ? [data, ...treatment] : [data]);
                                                    clearBoxes(setName, setQty, setNote, setStockName);
                                                }
                                            }}>
                                                Add Item
                                            </Button>) : null

                                    }
                                </Col>
                            </Row>

                        </Container>
                        {(treatment.length) ?
                            (<Table bordered responsive className="text-center text-white">
                                <thead>
                                    <tr>
                                        <th>
                                            S/N
                                        </th>
                                        <th>
                                            Item name
                                        </th>
                                        <th>
                                            Quantity
                                        </th>
                                        <th>
                                            Note
                                        </th>
                                        <th>
                                            Remove
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBuilder()}
                                </tbody>
                            </Table>)
                            : (<Container></Container>)}
                    </Col>
                    <Col>

                    </Col>

                </Row>


                <Button variant='dark' type='submit'>
                    Submit Report
                </Button>
            </Form>
            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        <h1>
                            {(showModal) ? "Medical report saved" : "Pres"}
                        </h1>
                        <Button variant='dark' onClick={() => {
                            setShowModal(false); navigate('/home', { replace: true })
                        }}>
                            Dismiss
                        </Button>
                    </Card>
                </ModalBody>
            </Modal>

            {BlockingSpinner({ show: blockView, content: "Processing..." })}
        </Container >
        //  </>

    );
}

export default ReportForm;