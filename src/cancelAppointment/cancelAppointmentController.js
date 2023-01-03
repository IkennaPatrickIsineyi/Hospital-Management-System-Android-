
export const cancelAppointment = (appointmentId, appointmentList, index,
    listChanged, url, listController, setCancel, setStates) => {
    console.log(appointmentId);
    if (appointmentId) {
        setStates({ blockView: true })
        const formData = new FormData();
        const content = {
            'appointmentId': appointmentId
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/cancelAppointment', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setStates({ showBanner: 2 })
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);

                    appointmentList.splice(index, 1);
                    listChanged(true);
                    listController(appointmentList);
                    setCancel();
                    setStates({ showModal: true })
                }
                else {
                    //failed
                    setStates({ showBanner: 2 })
                    return
                }
            });

        }, (err) => {
            setStates({ showBanner: 4, blockView: false });
        });
    }
    else {
        setStates({ showBanner: 5 })
        return
    }
}