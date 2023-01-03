import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";


function SupplierRecord() {
    const locations = useLocation();
    const supplierRecord = locations.state.requiredData;

    const tableBuilder = () => {
        return [...supplierRecord].map((item) => {
            return (<Container>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Supplier ID
                    </Col>
                    <Col>
                        {item.supplierId}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Supplier's Name
                    </Col>
                    <Col className="border">
                        {item.fullName}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Address
                    </Col>
                    <Col className="border">
                        {item.address}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Phone
                    </Col>
                    <Col className="border">
                        {item.phone}
                    </Col>
                </Row>

                <Row className="p-2 bg-light text-dark">
                    <Col>
                        Email
                    </Col>
                    <Col className="border">
                        {item.email}
                    </Col>
                </Row>

                <Row className="p-2 bg-dark text-light text-center">
                    <Col>
                        Stocks Sold By Supplier
                    </Col>
                </Row>

                {(item.stocksSupplied.length) ?
                    (item.stocksSupplied.map((prod) => {
                        return <Row className="p-2 bg-light text-dark text-center">
                            <Col className="border">
                                {prod.name}
                            </Col>
                        </Row>
                    })) :
                    <Row className="p-2 bg-light text-dark text-center">
                        <Col className="border">
                            Supplier does not supplier any product
                        </Col>
                    </Row>
                }

            </Container>
            )

        });
    }

    return (
        <Container className="p-4 " style={{
            'background-color': 'purple'
        }}>
            <Row className="p-2 bg-dark text-light text-center">
                <Col>
                    <h1>  Supplier's Record </h1>
                </Col>
            </Row>
            {tableBuilder()}
        </Container>
    );
}

export default SupplierRecord;