import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { sharedVariables } from '../sharedVariables';
import { alertBanner, BlockingSpinner, TextBoxFormGroup } from '../inputWidgets/inputWidgets';
import { formProcessor } from './createStockController';

function CreateStock() {
    const [states, setStates] = useState({
        stockName: '', description: '',
        price: '', showBanner: 0, blockView: false
    })

    const url = sharedVariables.url;

    const updateState = (newValues) => {
        setStates((prevValue) => { return { ...prevValue, ...newValues } })
    }

    return (
        <Container className='text-light pb-3' style={{
            'background-color': 'purple'
        }}>
            <Container className='p-3 bg-dark text-light'>
                <h3>
                    Create New Stock
                </h3>
            </Container>

            {alertBanner(states.showBanner)}

            <Form onSubmit={(event) => { formProcessor(event, url, states, updateState) }} >

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter Product Name",
                    onChange: (event) => {
                        updateState({ showBanner: 0, stockName: event.target.value })
                    }, value: states.stockName,
                    label: 'Item Name', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter price",
                    onChange: (event) => {
                        if (Number(event.target.value))
                            updateState({ showBanner: 0, price: event.target.value })
                        else updateState({ showBanner: 0, price: '' });
                    }, value: states.price,
                    label: 'Product Price', className: 'mb-3'
                })}

                {TextBoxFormGroup({
                    type: 'text', placeholder: "Enter description",
                    onChange: (event) => {
                        updateState({ showBanner: 0, description: event.target.value })
                    }, value: states.description,
                    label: 'Item Description', className: 'mb-3'
                })}

                <Button variant='dark' type='submit' >
                    Submit
                </Button>
            </Form>
            {BlockingSpinner({ show: states.blockView, content: "Processing..." })}
        </Container>
    );
}

export default CreateStock;