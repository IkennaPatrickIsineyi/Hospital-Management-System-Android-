export const issueItems = (url, issuedItems, setBlockView, setBanner, setShowModal) => {
    if (issuedItems.length) {
        setBlockView(true);
        const formData = new FormData();
        const content = {
            'issuedItems': JSON.stringify(issuedItems)
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/issueItems', {
            method: 'POST',
            credentials: 'include',
            body: formData
            /*  headers: {
                 'Content-Type': 'application/json'
             } */
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
                    /* setData(body.data);
                    setCurrentView(1); */
                    // <Entry />
                }
                else {
                    //failed
                    setBlockView(false);
                    setBanner(2);
                    return
                }
            });

        }, (err) => {
            setBlockView(false);
            setBanner(4);
        });
    }
    else {
        setBanner(5);
        return
    }
}

export const addIssuedItem = (reqId, issuedItems, setIssuedItems) => {
    setIssuedItems([...issuedItems, reqId]);
}


export const removeIssuedItem = (reqId, issuedItems, setIssuedItems) => {
    let newArr = [...issuedItems];
    const index = issuedItems.indexOf(reqId);
    newArr.splice(index, 1);
    setIssuedItems(newArr);


}
