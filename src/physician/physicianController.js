
export const getPatientRecord = (url, navigate, setBanner,
    patientId, appointmentId, setBlockView) => {
    if (patientId) {
        setBlockView(true)
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

        fetch(url + '/getPatientRecord', {
            method: 'POST',
            credentials: 'include',
            body: formData
        }).then((response) => {
            response.json().then((body) => {
                setBlockView(false);
                if (response.status !== 200) {
                    //failed
                    setBanner(2);
                }
                else if (body.respCode === 1) {
                    // successful
                    console.log(body);
                    navigate('/patientRecord', {
                        state: { requiredData: { ...body.data, 'appointmentId': appointmentId } }
                    });
                }
                else {
                    //failed
                    setBanner(2);
                    return
                }
            });

        }, (err) => {
            setBanner(4);
            setBlockView(false);
        });
    }
    else {
        setBanner(2);
        return
    }
};
