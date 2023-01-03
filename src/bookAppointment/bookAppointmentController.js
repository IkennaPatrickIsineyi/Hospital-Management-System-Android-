
export const formProcessor = (event, url, states, setStates) => {
    event.preventDefault();
    if (states.patientId && states.appointmentDate) {
        setStates({ blockView: true })
        const formData = new FormData();
        const content = {
            'patientId': states.patientId,
            'appointmentDate': states.appointmentDate
        };
        console.log(content);
        for (let item in content) {
            console.log(item, content[item]);
            formData.append(item, content[item]);
        }
        console.log(formData);

        fetch(url + '/createAppointment', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                if (response.status !== 200) {
                    //failed
                    setStates({ blockView: false, showBanner: 2 })
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    setStates({ blockView: false, showBanner: 1, showModal: true })
                }
                else {
                    //failed
                    setStates({ blockView: false, showBanner: 2 })
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