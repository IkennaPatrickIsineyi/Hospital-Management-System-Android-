
export const findUser = (nameStr, url, setStates) => {
    if (nameStr) {
        fetch(url + `/findSupplier/?fullName=${nameStr}`,
            { method: 'get', credentials: 'include' }).then(
                (response) => {
                    response.json().then((body) => {
                        if (response.status !== 200) {
                            setStates({
                                searching: false
                            });
                            return;
                        }
                        else if (body.respCode === 1) {
                            //match found
                            setStates({
                                supplierList: body.data,
                                supplierName: nameStr,
                                chosenSupplier: {},
                                searching: false
                            });
                        }
                        else if (body.respCode === 0) {
                            //error
                            setStates({
                                searching: false, errorMsg: 'Not Found'
                            });
                            return
                        }
                        else {
                            //no match found
                            setStates({
                                supplierName: nameStr, searching: false,
                                supplierList: body.data,
                                chosenSupplier: {}, errorMsg: 'Not Found'
                            });
                        }
                    })
                }, (err) => {
                    setStates({ showBanner: 4, searching: false, errorMsg: 'Network error' });
                });
    }
    else {
        console.log('empty string sent');
        setStates({ showBanner: 5, searching: false, errorMsg: 'Not Found' });
    }
}

export const formProcessor = (event, url, states, setStates, navigate) => {
    event.preventDefault();
    if (states.chosenSupplier) {
        setStates({ blockView: true })
        const formData = new FormData();
        const content = {
            'supplierId': states.chosenSupplier.supplierId
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/getSupplierRecord', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setStates({ showBanner: 2, blockView: false });
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    setStates({ showBanner: 1, blockView: false });
                    navigate('/supplierRecord', { state: { requiredData: body.data } })
                }
                else {
                    //failed
                    setStates({ showBanner: 2, blockView: false });
                    return
                }
            });
        }, (err) => {
            setStates({ showBanner: 4, blockView: false });
        });
    }
    else {
        setStates({ showBanner: 5, blockView: false });
        return
    }
}
