import { useState } from "react";
import { Card, Container, Button, Row, Table, Modal, ModalBody, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { sharedVariables } from "../sharedVariables";
import { addIssuedItem, issueItems, removeIssuedItem } from "./reqItemsController";


function ReqItems(props) {
    const [issuedItems, setIssuedItems] = useState([]);
    const [showBanner, setBanner] = useState(0);

    const locations = useLocation();
    const navigate = useNavigate();


    const [showModal, setShowModal] = useState(false);
    const [blockView, setBlockView] = useState(false);


    const url = sharedVariables.url;
    // const data = props.reqItems;

    const data = locations.state.reqItems;



    const tableBuilder = () => {
        let count = 0;
        return data.map((item) => {
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
                    {item.dateUsed.substring(0, 10)}
                </td>
                <td >{(issuedItems.includes(item.reqId)) ?
                    <Button variant='dark' onClick={() => {
                        removeIssuedItem(item.reqId, issuedItems, setIssuedItems);
                    }}>
                        Remove
                    </Button> :
                    <Button variant='dark' onClick={() => {
                        addIssuedItem(item.reqId, issuedItems, setIssuedItems);
                    }}>
                        Issue
                    </Button>
                }
                </td>
            </tr>
            )

        });
    }

    return (
        <Container className="p-4  text-center" style={{
            'background-color': 'purple'
        }}>
            <Row className="p-2 bg-dark text-light">
                <h4> Prescribed Items</h4>
            </Row>
            <Table bordered responsive className="text-white text-center">
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
                            Date
                        </th>
                        <th>
                            Issue
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(data.length) ?

                        tableBuilder() :
                        <tr>
                            <td colSpan={6}>
                                No unissued prescribed items
                            </td>
                        </tr>


                    }
                </tbody>
            </Table>{
                (issuedItems.length) ?
                    <Button variant='dark' onClick={() => {
                        issueItems(url, issuedItems, setBlockView, setBanner, setShowModal)
                    }}>
                        Submit Transaction
                    </Button> :
                    null
            }

            <Modal show={showModal} centered size="sm" className="text-center">
                <ModalBody>
                    <Card>
                        Prescriptions Issued
                        <Button variant='dark' onClick={() => {
                            setShowModal(false);
                            navigate('/home', { replace: true })
                        }}>
                            Dismiss
                        </Button>
                    </Card>
                </ModalBody>
            </Modal>

            <Modal show={blockView} centered size="sm" className="text-center">
                <ModalBody>
                    <Container >
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                    </Container>
                    Processing...
                </ModalBody>
            </Modal>


        </Container>
    );
}

export default ReqItems;