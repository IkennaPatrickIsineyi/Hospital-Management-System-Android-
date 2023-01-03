import { Form, Button, Container, Dropdown, Row, Col, Table, Modal, ModalBody, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedVariables } from '../sharedVariables';
import { clearBoxes, find, formProcessor, removeItem, selectStock, selectSupplier } from './addStockController';
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';

function AddStock() {
    const [states, setStates] = useState({
        stockName: '', supplierName: '', chosenStock: {}, chosenSupplier: {},
        stockList: [], supplierList: [], qty: 0, dateAdded: 0, dataList: [],
        showBanner: 0, showModal: false, blockView: false, searching: false,
        showStocks: false, showSuppliers: false, errorMsg: ''
    })

    const navigate = useNavigate();

    const url = sharedVariables.url;

    const updateState = (newValues) => {
        setStates(previousState => { return { ...previousState, ...newValues } })
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
        if (states.dataList) {
            return (<Table bordered responsive className='text-white text-center mt-4'>
                <thead>
                    <tr className='text-white'>
                        <th>Stock name</th>
                        <th>Supplier's name</th>
                        <th>Quantity</th>
                        <th>Date Added</th>
                        <th>Remove Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {[...states.dataList].map((item) => {
                        console.log(item);
                        return (
                            <tr >
                                <td>{item.name}</td>
                                <td>{item.supplierName}</td>
                                <td>{item.qty}</td>
                                <td>{item.dateAdded}</td>
                                <td>
                                    <Button variant='dark' onClick={() => {
                                        removeItem(item, states.dataList, updateState);
                                    }}>
                                        Remove
                                    </Button>
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


    const dataForm = (<Form  >
        {TextBoxFormGroup({
            type: 'text', placeholder: "Enter stock name",
            onChange: (event) => {
                console.log('stock changed');
                if (event.target.value) {
                    updateState({
                        stockName: event.target.value,
                        chosenStock: {}, searching: true,
                        showStocks: true, showSuppliers: false,
                    })

                    find(event.target.value, false, 'stockList', url, updateState);
                }
                else {
                    updateState({
                        stockName: event.target.value,
                        chosenStock: {}
                    });
                }
            }, value: states.stockName, label: "Stock Name", className: 'mb-1'
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
                console.log('supplier changed');
                if (event.target.value) {
                    updateState({
                        supplierName: event.target.value,
                        chosenSupplier: {}, searching: true,
                        showStocks: false, showSuppliers: true
                    });
                    find(event.target.value, true, 'supplierList', url, updateState);
                }
                else {
                    updateState({
                        supplierName: event.target.value,
                        chosenSupplier: {}
                    });
                }
            }, value: states.supplierName, label: "Supplier's name", className: 'mb-1'
        })}

        <Dropdown show={states.showSuppliers && states.supplierName.length
            && !Object.keys(states.chosenSupplier).length} >
            <Dropdown.Menu>
                {buildList(states.supplierList, true)}
            </Dropdown.Menu>
        </Dropdown>

        {TextBoxFormGroup({
            type: 'number', placeholder: "Enter number added",
            onChange: (event) => {
                updateState({ showBanner: 0, qty: event.target.value })
            }, value: states.qty, label: "Quantity", className: 'mb-3'
        })}

        {TextBoxFormGroup({
            type: 'date', placeholder: "Enter Date added",
            onChange: (event) => {
                updateState({ showBanner: 0, dateAdded: event.target.value })
            }, value: states.dateAdded, label: "Date added", className: 'mb-3'
        })}

        <Row>
            <Col>
                {(states.chosenStock.name && states.chosenSupplier.fullName && states.qty && states.dateAdded) ?

                    <Button variant='dark' onClick={() => {

                        updateState({
                            dataList: [...states.dataList, {
                                'name': states.chosenStock.name,
                                'supplierName': states.chosenSupplier.fullName,
                                'qty': states.qty,
                                'dateAdded': states.dateAdded,
                                'stockId': states.chosenStock.stockId,
                                'supplierId': states.chosenSupplier.supplierId
                            }]
                        });

                        clearBoxes(states, updateState);
                    }}>

                        Add
                    </Button> : null}
            </Col>
            <Col>
                {(states.dataList.length) ?
                    <Button variant='dark' type='submit'
                        onClick={() => { formProcessor(url, states, updateState) }}>
                        Finish & Submit
                    </Button> :
                    null}

            </Col>
        </Row>
    </Form>
    );

    return (
        <Container className=' text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Add New Stock
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            {dataForm}

            {(states.dataList.length) ? (buildDataList()) : null}

            <Modal show={states.showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Stocks added
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

export default AddStock;