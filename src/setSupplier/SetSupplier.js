import { Form, Button, Container, Alert, Dropdown, Row, Col, Table, Modal, ModalBody, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';
import { clearBoxes, find, formProcessor, removeItem, selectStock, selectSupplier } from './setSupplierController';


function SetSupplier() {
    const [states, setState] = useState({
        stockName: '', supplierName: '', chosenStock: {},
        chosenSupplier: {}, stockList: [], supplierList: [],
        dataList: [], showBanner: 0, showModal: false, blockView: false,
        showStocks: false, showSuppliers: false, searching: false, errorMsg: ''
    });

    const bannerText = ["", "Success...", "Something went wrong",
        "Failed to send request"];

    const url = sharedVariables.url;
    const navigate = useNavigate();

    const updateState = (newValues) => {
        setState((prevValue) => { return { ...prevValue, ...newValues } })
    }


    const buildList = (list, forSupplier) => {
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
                        console.log('clicked...');
                        (forSupplier) ? selectSupplier(item, updateState) :
                            selectStock(item, updateState);
                    }}>
                        <Row>
                            <Col>
                                <b>Name:</b><br />
                                {(forSupplier) ? (item.fullName) : (item.name)}
                            </Col>
                            <Col>
                                <b>{(forSupplier) ? ('Phone number') : ('Description')}</b><br />
                                {(forSupplier) ? (item.phone) : (item.description)}
                            </Col>
                        </Row>

                    </Container>
                </Dropdown.Item>
            });
        }
        else {
            console.log('Found nothing...', 'forSupplier', forSupplier);
            return <Dropdown.Item disabled className='text-dark'>
                <Container>
                    {states.errorMsg}
                </Container>
            </Dropdown.Item>
        }

    }

    const buildDataList = () => {
        if (states.dataList.length) {
            return (<Table bordered responsive hover className='text-white text-center'>
                <thead>
                    <tr>
                        <th>Stock name</th>
                        <th>Supplier's name</th>
                        <th>Remove name</th>
                    </tr>
                </thead>
                <tbody>
                    {[...states.dataList].map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.supplierName}</td>
                                <td>
                                    <button variant='dark' onClick={() => {
                                        removeItem(item, states, updateState);
                                    }}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </Table>
            );
        }
    };

    const dataForm = (<Form >
        {TextBoxFormGroup({
            type: 'text', placeholder: "Enter stock name",
            onChange: (event) => {
                updateState({
                    stockName: event.target.value,
                    searching: true, chosenStock: {},
                    showStocks: true, showSuppliers: false
                });
                find(event.target.value, false, 'stockList',
                    url, updateState);
            }, value: states.stockName, label: 'Stock Name', className: 'mb-1'
        })}

        <Dropdown show={states.showStocks && states.stockName.length
            && !Object.keys(states.chosenStock).length} >
            <Dropdown.Menu>
                {buildList(states.stockList, false)}
            </Dropdown.Menu>
        </Dropdown>

        {TextBoxFormGroup({
            type: 'text', placeholder: "Enter supplier's name",
            onChange: (event) => {
                updateState({
                    supplierName: event.target.value,
                    searching: true, chosenSupplier: {},
                    showStocks: false, showSuppliers: true
                });
                find(event.target.value, true, 'supplierList',
                    url, updateState);
            }, value: states.supplierName, label: "supplier's Name", className: 'mb-1'
        })}

        <Dropdown show={states.showSuppliers && states.supplierName.length
            && !Object.keys(states.chosenSupplier).length} >
            <Dropdown.Menu>
                {buildList(states.supplierList, true)}
            </Dropdown.Menu>
        </Dropdown>

        <Row>
            <Col>

                {(states.chosenStock.name && states.chosenSupplier.fullName
                    && states.chosenStock.stockId && states.chosenSupplier.supplierId) ?
                    <Button variant='dark' onClick={() => {
                        if (states.chosenStock.name && states.chosenSupplier.fullName
                            && states.chosenStock.stockId && states.chosenSupplier.supplierId) {

                            updateState({
                                dataList: [...states.dataList, {
                                    'name': states.chosenStock.name,
                                    'supplierName': states.chosenSupplier.fullName,
                                    'stockId': states.chosenStock.stockId,
                                    'supplierId': states.chosenSupplier.supplierId
                                }]
                            });

                            clearBoxes(updateState);
                        }
                    }}>
                        Add
                    </Button> : null}
            </Col>
            <Col>
                {(states.dataList.length) ? <Button variant='dark' type='submit'
                    onClick={(event) => {
                        formProcessor(event, url, states, updateState)
                    }}>
                    Finish & Submit
                </Button> : null}
            </Col>
        </Row>
    </Form>);

    return (
        <Container className=' text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Link Supplier to Stock
                </h3>
            </Container>

            <Alert show={states.showBanner} variant={(states.showBanner === 1) ?
                'success' : 'danger'}>
                {bannerText[states.showBanner]}
            </Alert>

            {dataForm}
            {(states.dataList.length) ? (buildDataList()) : null}

            <Modal show={states.showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Supplier linked
                        <Button variant='dark' onClick={() => {
                            updateState({ showModal: false })
                            navigate('/home', { replace: true })
                        }}>
                            Dismiss
                        </Button>
                    </Card>
                </ModalBody>
            </Modal>

            {BlockingSpinner({ show: states.blockView, content: 'Processing...' })}
        </Container>
    );
}

export default SetSupplier;