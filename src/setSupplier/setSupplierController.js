export const removeItem = (item, states, setState) => {
    let newArr = [...states.dataList];
    newArr.splice(states.dataList.indexOf(item), 1);
    setState({ dataList: newArr });
}

export const clearBoxes = (setState) => {
    setState({ supplierName: '', stockName: '', chosenSupplier: '', chosenStock: '' });
}

export const selectSupplier = (item, setState) => {
    setState({ chosenSupplier: item, supplierName: item.fullName });
}

export const selectStock = (item, setState) => {
    setState({ chosenStock: item, stockName: item.name });
}

export const find = (nameStr, forSupplier, list, url, setState) => {
    if (nameStr)
        fetch((forSupplier) ?
            (url + `/findSupplier/?fullName=${nameStr}`) :
            (url + `/findStock/?name=${nameStr}`),
            { method: 'get', credentials: 'include' }).then(
                (response) => {
                    response.json().then((body) => {
                        if (response.status !== 200) {
                            setState({ searching: false });
                            return;
                        }
                        else if (body.respCode === 1) {
                            //match found
                            setState({
                                [list]: body.data,
                                searching: false
                            });
                        }
                        else if (body.respCode === 0) {
                            //error
                            setState({ searching: false, errorMsg: 'Not found' });
                            return
                        }
                        else {
                            //no match found
                            setState({
                                [list]: body.data,
                                searching: false,
                                errorMsg: 'Not found'
                            });
                        }
                    })
                }, (err) => {
                    console.log('connection error', err);
                    setState({ searching: false, errorMsg: 'Network error' });
                });
}

export const formProcessor = (event, url, states, setState) => {
    event.preventDefault()
    if (states.dataList) {
        setState({ blockView: true });

        const formData = new FormData();
        const content = {
            'stockDataList': JSON.stringify(states.dataList)
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/setSupplier', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setState({ blockView: false, showBanner: 2 });
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    setState({ blockView: false, showModal: true });
                }
                else {
                    //failed
                    setState({ blockView: false, showBanner: 2 });
                    return
                }
            });

        }, (err) => {
            setState({ showBanner: 4, blockView: false });
        });
    }
    else {
        setState({ showBanner: 5 });
        return
    }
}
