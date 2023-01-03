

export const removeItem = (item, dataList, setStates) => {
    let newArr = [...dataList];
    newArr.splice(dataList.indexOf(item), 1);
    setStates({ dataList: newArr })
}

export const selectSupplier = (item, setStates) => {
    setStates({ chosenSupplier: item, supplierName: item.fullName })
}

export const selectStock = (item, setStates) => {
    setStates({ chosenStock: item, stockName: item.name })
}

export const clearBoxes = (states, setStates) => {
    setStates({ supplierName: '', qty: 0, dateAdded: '', stockName: '' })
}

export const find = (nameStr, forSupplier, list, url, stateSetter) => {
    //if (nameStr) {
    //setStates({ searching: true });
    fetch((forSupplier) ?
        (url + `/findSupplier/?fullName=${nameStr}`) :
        (url + `/findStock/?name=${nameStr}`),
        { method: 'get', credentials: 'include' }).then(
            (response) => {
                response.json().then((body) => {
                    if (response.status !== 200) {
                        stateSetter({ searching: false });
                        return;
                    }
                    else if (body.respCode === 1) {
                        //match found
                        stateSetter({ [list]: body.data, searching: false });
                    }
                    else if (body.respCode === 0) {
                        //error
                        stateSetter({ searching: false, errorMsg: 'Not found' });
                        return
                    }
                    else {
                        //no match found
                        console.log('else hit');
                        stateSetter({ [list]: body.data, searching: false, errorMsg: 'Not found' });
                    }
                })
            }, (err) => {
                stateSetter({ searching: false, errorMsg: 'Network error' });
            }
        );

}

export const formProcessor = (url, states, setStates) => {
    // event.preventDefault();
    if (states.dataList.length) {
        setStates({ blockView: true })
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

        fetch(url + '/restock', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setStates({ blockView: false, showBanner: 2 });
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    setStates({ blockView: false, showModal: true });
                    // <Entry />
                }
                else {
                    //failed
                    setStates({ blockView: false, showBanner: 2 });
                    return
                }
            });

        }, (err) => {
            setStates({ showBanner: 4, blockView: false });
        });
    }
    else {
        setStates({ showBanner: 5 });
        return
    }
}
