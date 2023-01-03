import { Col, Container, Row, Image } from "react-bootstrap";
import addStaffImg from '../static/icons8-add-user-55.png';
import addSupplierImg from '../static/icons8-supplier-100.png';
import addStockImg from '../static/icons8-add-new-100.png';
import setSupplierImg from '../static/icons8-signing-a-document-50.png';
import findStaffImg from '../static/icons8-find-user-male-50.png';
import findSupplierImg from '../static/icons8-file-100.png';
import createStockImg from '../static/icons8-document-64.png';

import { useNavigate } from "react-router-dom";

function Administrator() {

    const navigate = useNavigate();


    return (<Container className="p-4 " style={{
        'background-color': 'purple'
    }}>
        <Row className="p-2 ">
            <Col className="p-5 bg-dark text-center text-light rounded mx-1"
                onClick={() => { navigate('/addStaff'); }}>
                <Image src={addStaffImg} fluid width="100px" />
                <h3>
                    Add Staff
                </h3>
            </Col>

            <Col className="p-5 bg-dark text-center text-light rounded mx-1"
                onClick={() => { navigate('/addSupplier'); }}>
                <Image src={addSupplierImg} fluid width="100px" />
                <h3>
                    Add Supplier
                </h3>
            </Col>

            <Col className="p-5 bg-dark text-center text-light rounded mx-1"
                onClick={() => { navigate('/addStock'); }}>
                <Image src={addStockImg} fluid width="100px" />
                <h3>
                    Add Stock
                </h3>
            </Col>

            <Col className="p-5 bg-dark text-center text-light rounded mx-1"
                onClick={() => { navigate('/SetSupplier'); }}>
                <Image src={setSupplierImg} fluid width="100px" />
                <h3>
                    Set Supplier
                </h3>
            </Col>

        </Row>

        <Row className="p-2 ">
            <Col className="p-5 bg-light text-dark text-center rounded mx-1"
                onClick={() => { navigate('/findStaff'); }}>
                <Image src={findStaffImg} fluid width="100px" />
                <h3>
                    Find Staff
                </h3>
            </Col>

            <Col className="p-5 bg-light text-dark text-center rounded mx-1"
                onClick={() => { navigate('/findSupplier'); }}>
                <Image src={findSupplierImg} fluid width="100px" />
                <h3>
                    Find Supplier
                </h3>
            </Col>

            <Col Col className="p-5 bg-dark text-center text-light rounded mx-1"
                onClick={() => { navigate('/createStock'); }}>
                <Image src={createStockImg} fluid width="100px" />
                <h3>
                    Create Stock
                </h3>
            </Col>

        </Row>

    </Container>);
}

export default Administrator;