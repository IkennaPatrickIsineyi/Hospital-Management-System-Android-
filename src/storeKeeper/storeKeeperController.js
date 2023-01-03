
export const formProcessor = (event, url, patientId, updateState, navigate) => {
    event.preventDefault();
    if (patientId) {
        updateState({ showModal: true });
        const formData = new FormData();
        const content = {
            'patientId': patientId
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/getReqItems', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    updateState({ showBanner: 2, showModal: false });
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    updateState({ showModal: false });
                    navigate('/reqItems', { state: { reqItems: body.data } });
                }
                else {
                    //failed
                    updateState({ showBanner: 2, showModal: false });
                    return
                }
            });

        }, (err) => {
            console.log('connection error');
            updateState({ showBanner: 4, showModal: false });
        });
    }
    else {
        updateState({ showBanner: 2, showModal: false });
        return
    }
}
