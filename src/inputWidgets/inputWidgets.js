import { Form, Container, Spinner, Modal, ModalBody, Alert } from 'react-bootstrap';

export const TextBoxFormGroup = (param = {
    type: '', placeholder: '',
    onChange: () => { }, onMouseOut: () => { }, onMouseEnter: () => { },
    value: '', label: '', className: '', controlId: ''
}) => {
    return <Form.Group className={param.className} controlId={param.controlId}>
        {(param.label.length) ? <Form.Label >
            {param.label}
        </Form.Label>
            :
            null
        }

        <Form.Control type={param.type} placeholder={param.placeholder} onFocus={param.onMouseOut}
            onChange={param.onChange} value={param.value} required={true} />

    </Form.Group>
}

export const FileFormGroup = (param = {
    type: '', onChange: () => { }, label: '', className: '', controlId: '', name: '', title: ''
}) => {
    return <Form.Group className={param.className} controlId={param.controlId}>
        {(param.label.length) ? <Form.Label>
            {param.label}
        </Form.Label>
            :
            null
        }

        <Form.Control type={param.type} title={param.title}
            onChange={param.onChange} required={true} />

    </Form.Group>
}

export const DropDownFormGroup = () => {

}

export const BlockingSpinner = (param = { show: null, content: null }) => {
    return <Modal show={param.show} centered size="sm" className="text-center">
        <ModalBody>
            <Container >
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
            </Container>
            {param.content}
        </ModalBody>
    </Modal>
}


export const bannerText = ["", "Success", "Something went wrong...try again",
    "You are not logged in... Login", "Check your network", 'Missing data: Input required data',
    "Already logged in... as a different user"];
export const alertColors = ["danger", "success", "warning", "secondary"];

export const alertBanner = (showBanner) => {
    return <Alert show={showBanner} variant={alertColors[(showBanner === 1) ? 1 : 0]}>
        {bannerText[showBanner]}</Alert>
}