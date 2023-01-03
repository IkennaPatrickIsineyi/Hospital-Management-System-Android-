export const removeData = (index, treatment, setTreatment) => {
    let newArr = [...treatment];
    newArr.splice(index, 1);
    setTreatment(newArr);

}

export const clearBoxes = (setName, setQty, setNote, setStockName) => {
    setName('');
    setQty('');
    setNote('');
    setStockName('');
}


export const find = (nameStr, url, setStockList, setBanner) => {
    if (nameStr)
        fetch(url + `/findStock/?name=${nameStr}`,
            { method: 'get', credentials: 'include' }).then(
                (response) => {
                    response.json().then((body) => {
                        if (response.status !== 200) {
                            return;
                        }
                        else if (body.respCode === 1) {
                            //match found

                            setStockList(body.data);
                        }
                        else if (body.respCode === 0) {
                            //error
                            return
                        }
                        else {
                            //no match found

                            setStockList(body.data);
                        }
                    })
                }, (err) => {
                    setBanner(4);
                });
}


export const formProcessor = (event, url, appointmentId, allValues,
    treatment, setBlockView, setBanner, setShowModal, setPrescriptionEmpty) => {
    event.preventDefault();
    //if (treatment.length) {
    setBlockView(true);
    const formData = new FormData();
    const content = {
        'appointmentId': appointmentId,
        'diagnosis': JSON.stringify(allValues),
        'treatment': JSON.stringify(treatment)
    };
    console.log(content);
    for (let item in content) {
        console.log(item, content[item]);
        formData.append(item, content[item]);
    }
    console.log(formData);

    fetch(url + '/makeReport', {
        method: 'POST',
        credentials: 'include',
        body: formData
    }).then((response) => {
        response.json().then((body) => {
            if (response.status !== 200) {
                //failed
                setBlockView(false);
                setBanner(2);
            }
            else if (body.respCode === 1) {
                // successful
                console.log(body);
                setBlockView(false);
                setShowModal(true);
            }
            else {
                //failed
                setBlockView(false);
                setBanner(2);

                return
            }
        });

    }, (err) => {
        setBanner(4);
        setBlockView(false);
    });
    /*   }
    else {
           setPrescriptionEmpty(true);
       } */
}
